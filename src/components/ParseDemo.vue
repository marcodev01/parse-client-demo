<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <InputText type="text" v-model="value" />
    <Button label="Submit"  @click="addPlayer()" />
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import { onMounted, ref  } from "vue";

const props = defineProps({
  msg: String
})

const value = ref("")

const Parse = require("parse");

Parse.initialize("mOYkwNZq5afeNePzifsH");
Parse.serverURL = "http://localhost:1337/parse/";

const Player = Parse.Object.extend("player");

// new Parse.Object("player", { text: "testing" })
//   .save()
//   .then(function (obj) {
//     console.log("Success", obj);
//   })
//   .catch(function (e) {
//     alert("Error saving test object!" + e.message);
//   });

function getPlayer() {
  const query = new Parse.Query(Player);
  return query.find();
}

function addPlayer() {
  const player = new Player();
  player.set("Name", value);

  player.save()
    .then((player) => {
      // Execute any logic that should take place after the object is saved.
      console.log("saved", player)
    }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      console.log("error", error.message)
    });
}

onMounted(() => {
    getPlayer().then((result) => {
    console.log(result);
  });
})

// export default {
//   name: "ParseDemo",
//   components: {
//     InputText,
//     Button
//   },
//   props: {
//     msg: String,
//   },
//   created() {
//      this.getPlayer().then((result) => {
//     console.log(result);
//      });
//    },
//    methods: {
//      getPlayer() {
//        const player = Parse.Object.extend("player");
//        const query = new Parse.Query(player);
//        return query.find();
//      },
//      addPlayer(name) {
//       const Player = Parse.Object.extend("Player");
//       const player = new Player();

//       player.set(name);
//      }
//   },
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
