<template>
  <div id="app">
    <my-main msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import MyMain from "./components/MyMain.vue";

export default {
  name: "App",
  components: {
    MyMain,
  },
};
</script>
