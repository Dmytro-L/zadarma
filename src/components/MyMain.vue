<template>
  <div class="main">
    <scenarios-block
      @create-scenario="isActive = true"
      empty-text="Сценариев еще нет"
    />
    <block-screen v-if="isActive" />
    <create-scenario @close="isActive = false" :isActive="isActive" />
  </div>
</template>

<script>
import BlockScreen from "./BlockScreen.vue";
import CreateScenario from "./CreateScenario.vue";
import ScenariosBlock from "./ScenariosBlock.vue";
export default {
  components: { ScenariosBlock, CreateScenario, BlockScreen },
  data() {
    return {
      isActive: false,
    };
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
}
</style>
