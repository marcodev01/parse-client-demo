<template>
  <Toast />

  <div class="text-center mb-6">
    <h1>{{ msg }}</h1>
  </div>

<div class="flex align-content-center justify-content-center" >
  <Message class="w-7" v-for="msg of messages" :severity="msg.severity" :key="msg.content">{{msg.content}}</Message>
  </div>

  <div class="card lg:px-8 md:px-4 sm:px-8">
    <h3 class="text-center">Add some ratings to Parse Server</h3>
    <div class="grid">
      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <InputText id="name" class="w-full" type="text" v-model="name" />
          <label for="name">Name</label>
        </span>
      </div>
      <div class="col-12 md:col-4">
        <span class="p-float-label">
          <InputText id="type" class="w-full" type="text" v-model="type" />
          <label for="type">Type (Movie, Music...)</label>
        </span>
      </div>
      <div class="field col-12 md:col-2 flex align-content-center justify-content-center flex-wrap no-wrap">
        <Rating v-model="rating" :cancel="false" name="cancel" />
      </div>
      <div class="field col-12 md:col-2 flex align-content-center justify-content-center flex-wrap">
        <Button label="Save" @click="addRatingEntry()"></Button>
      </div>
    </div>
  </div>

    <div class="m-6">
      <h3 class="text-center">Your ratings</h3>
      <DataTable :value="ratingEntries" stripedRows :scrollable="true" :loading="loading">
        <Column field="name" header="Name" style="width: 180px"></Column>
        <Column field="type" header="Type" style="width: 180px"></Column>
        <Column field="rating" header="Rating" style="width: 200px">
          <template #body="slotProps">
            <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
          </template>
        </Column>
      </DataTable>
    </div>
    <h4 class="text-center font-italic" v-if="!loading && !ratingEntries">No entries found..</h4>
</template>

<script>
import Parse from 'parse/dist/parse.js'; // TODO min
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: String
  },
  data() {
    return {
      name: null,
      type: null,
      rating: null,
      loading: false,
      RatingEntryObject: Parse.Object.extend("ratingEntry"),
      ratingEntries: null,
      messages: []
    }
  },
  methods: {
    loadRatingEntries() {
      const query = new Parse.Query(this.RatingEntryObject);
      return query.find();
    },

    addRatingEntry() {
      const ratingEntry = new this.RatingEntryObject();

      ratingEntry.set("name", this.name);
      ratingEntry.set("type", this.type);
      ratingEntry.set("rating", this.rating);

      ratingEntry.save()
        .then((result) => {
          this.$toast.add({severity:'success', summary: 'Rating sccessfully saved!', detail:`${JSON.stringify(this.mapToRatingEntrieObject(result), null, 2)}`, life: 5000}); // todo: add created at
          this.resetFormVaules();
        }, (error) => {
          this.messages.push({severity: 'error', content: `Cloud not save entry: ${error.message}`});
          console.error(error.message)
        });
    },

    resetFormVaules() {
      this.name = null;
      this.type = null;
      this.rating = null;
    },

    mapToRatingEntrieObject(entry) {
      return { name: entry.get("name"), type: entry.get("type"), rating: entry.get("rating") };
    }
  },
  created() {
    // remove if not used
  },
  beforeCreate() {
    this.loading = true;
  },
  mounted() {
    // Parse initialization
    Parse.initialize("mOYkwNZq5afeNePzifsH");
    Parse.serverURL = "http://localhost:1337/parse/";

    this.loadRatingEntries().then(results => {
      if (results && results.length > 0) {
        this.ratingEntries = results.map(entry => this.mapToRatingEntrieObject(entry));
      }
      this.loading = false;
    }, (error) => {
      this.messages.push({severity: 'error', content: `Cloud not load entries: ${error.message}`});
    });
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'primeflex/primeflex.scss';

.no-wrap {
  overflow: hidden;
  white-space: nowrap;
}
</style>
