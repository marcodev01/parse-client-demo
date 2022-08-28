<template>
  <Toast />

  <div class="text-center mb-6">
    <h1>{{ msg }}</h1>
  </div>

  <div class="flex align-content-center justify-content-center">
    <Message class="w-7" v-for="msg of messages" :severity="msg.severity" :key="msg.content">{{ msg.content }}</Message>
  </div>
  <div class="card px-4 lg:px-8 md:px-4 sm:px-8">
    <h3 class="text-center">Add some ratings to Parse Server</h3>
    <div class="grid">
      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <InputText id="name" class="w-full" :class="{ 'p-invalid': v$.name.$error }" type="text" v-model="name" />
          <label for="name">Name</label>
        </span>
      </div>
      <div class="col-12 md:col-4">
        <span class="p-float-label">
          <InputText id="type" class="w-full" :class="{ 'p-invalid': v$.type.$error }" type="text" v-model="type" />
          <label for="type">Type (Movie, Music...)</label>
        </span>
      </div>
      <div class="field col-12 md:col-2 flex align-content-center justify-content-center flex-wrap no-wrap">
        <Rating v-model="rating" :cancel="false" name="cancel" />
      </div>
      <div
        class="field col-12 md:col-2 flex align-content-center md:justify-content-start justify-content-center flex-wrap">
        <Button label="Save" @click="addRatingEntry()"></Button>
      </div>
    </div>
  </div>

  <div class="m-6">
    <div class="flex justify-content-between flex-wrap mb-1">
      <div class="text-xl flex align-items-center">Ratings Table</div>
      <div>
      </div>
      <div class="flex align-items-center">
        <span class="mr-2 text-lg">Websocket</span>
        <i class="pi pi-info-circle mr-3"
          v-tooltip.top="'Create, Update and Delete events of rating objects are updated asynchronously by websocket connection'"></i>
        <ToggleButton v-model="webSocketActive" onLabel="On" offLabel="Off" onIcon="pi pi-check"
          offIcon="pi pi-times" />
      </div>
    </div>

    <DataTable :value="ratingEntries" stripedRows :scrollable="true" :loading="loading">
      <Column field="objectId" header="Object ID" style="width: 100px"></Column>
      <Column field="name" header="Name" style="width: 180px"></Column>
      <Column field="type" header="Type" style="width: 180px"></Column>
      <Column field="rating" header="Rating" style="width: 200px">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
        </template>
      </Column>
    </DataTable>
    <h4 class="text-center font-italic" v-if="!loading && ratingEntries.length === 0">No entries found..</h4>
  </div>
</template>

<script>
import Parse from 'parse/dist/parse.js'; // TODO min
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  props: {
    msg: String,
    user: {
      type: Parse.User,
      required: true
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: null,
      type: null,
      rating: null,
      loading: false,
      RatingEntryObject: Parse.Object.extend("ratingEntry"),
      ratingEntries: [],
      webSocketActive: this.user.get("websocket"),
      messages: []
    }
  },
  validations() {
    return {
      name: { required },
      type: { required }
    }
  },
  watch: {
    webSocketActive(newWebSocketActive, oldWebSocketActive) {
      if (newWebSocketActive && !oldWebSocketActive) {
        this.subscribeEvents();
        this.setUserWebsocket(newWebSocketActive);
      }
      if (!newWebSocketActive && oldWebSocketActive) {
        Parse.LiveQuery.close();
        this.setUserWebsocket(newWebSocketActive);
      }
    }
  },
  methods: {
    loadRatingEntries() {
      const query = new Parse.Query(this.RatingEntryObject);
      return query.find();
    },

    async subscribeEvents() {
      let query = new Parse.Query('ratingEntry');
      let subscription = await query.subscribe();

      subscription.on('create', (object) => {
        this.ratingEntries.push(this.mapToRatingEntryObject(object));
      });

      subscription.on('update', (object) => {
        if (this.ratingEntries?.length > 0) {
          const entryIndex = this.ratingEntries.findIndex(entry => entry.objectId === object.id);
          if (entryIndex >= 0) {
            this.ratingEntries.splice(entryIndex, 1, this.mapToRatingEntryObject(object));
            this.$toast.add({ severity: 'info', summary: 'A rating entry was updated.', detail: `${JSON.stringify(this.mapToRatingEntryObject(object), null, 2)}`, life: 8000 });
          }
        }
      });
      subscription.on('delete', (object) => {
        if (this.ratingEntries?.length > 0) {
          const entryIndex = this.ratingEntries.findIndex(entry => entry.objectId === object.id);
          if (entryIndex >= 0) {
            this.ratingEntries.splice(entryIndex, 1);
          }
        }
      });
    },

    async addRatingEntry() {
      const isFormValid = await this.v$.$validate();
      if (isFormValid) {
        const ratingEntry = new this.RatingEntryObject();

        ratingEntry.set("name", this.name);
        ratingEntry.set("type", this.type);
        ratingEntry.set("rating", this.rating);

        ratingEntry.save()
          .then((result) => {
            this.$toast.add({ severity: 'success', summary: 'Rating entry sccessfully saved!', detail: `${JSON.stringify(this.mapToRatingEntryObject(result), null, 2)}`, life: 6000 });
            this.resetFormVaules();
            this.v$.$reset();
          }, (error) => {
            this.messages.push({ severity: 'error', content: `${error.code} - could not save entry: ${error.message}` });
            console.error(error.message)
          });
      }
    },

    resetFormVaules() {
      this.name = null;
      this.type = null;
      this.rating = null;
    },

    async setUserWebsocket(webSocketActive) {
      this.user.set("websocket", webSocketActive);
      await this.user.save().then((result) => {
        this.$toast.add({ severity: 'info', summary: 'Saved user setting for websocket', detail: `${JSON.stringify(result, null, 2)}`, life: 6000 });
      }, (error) => {
        this.messages.push({ severity: 'error', content: `${error.code} - could not save user setting for websocket: ${error.message}` });
        console.error(error.message)
      });
    },

    mapToRatingEntryObject(entry) {
      return { objectId: entry.id, name: entry.get("name"), type: entry.get("type"), rating: entry.get("rating") };
    }
  },
  beforeCreate() {
    this.loading = true;
  },
  mounted() {
    this.loadRatingEntries().then(results => {
      if (results?.length > 0) {
        this.ratingEntries = results.map(entry => this.mapToRatingEntryObject(entry));
      }
      this.loading = false;
    }, (error) => {
      this.messages.push({ severity: 'error', content: `${error.code} - could not load entries: ${error.message}` });
    });

    if (this.webSocketActive) {
      this.subscribeEvents();
    }
  }
}
</script>

<style scoped lang="scss">
@import 'primeflex/primeflex.scss';

.no-wrap {
  overflow: hidden;
  white-space: nowrap;
}
</style>
