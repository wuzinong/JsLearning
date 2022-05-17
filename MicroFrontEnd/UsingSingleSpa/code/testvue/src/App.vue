<template>
  <div id="app">
    <Parcel :config="parcelConfig" :mountParcel="mountParcel" />
    <div class="example">
      <router-link to="/foo">foo</router-link>&nbsp;&nbsp;
      <router-link to="/bar">bar</router-link>
    </div>
    <router-view></router-view>
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script>
import Parcel from "single-spa-vue/parcel";
import { mountRootParcel } from "single-spa";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Parcel,
  },
  data() {
    return {
      parcelConfig: window.System.import("@study/navbar"),
      mountParcel: mountRootParcel,
    };
  },
  methods: {
    // These are the props passed into the parcel
    getParcelProps() {
      return {
        text: `Hello world`,
      };
    },
    // Parcels mount asynchronously, so this will be called once the parcel finishes mounting
    parcelMounted() {
      console.log("parcel mounted");
    },
    parcelUpdated() {
      console.log("parcel updated");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.example {
  font-size: 30px;
}
.example a {
  color: red;
}
</style>
