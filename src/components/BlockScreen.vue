<template>
  <div :class="{ active: isActive }" class="block-screen"></div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.block-screen {
  position: absolute;
  transition: all 2s;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  animation-name: block-screen;
  animation-duration: 500ms;
  animation-fill-mode: forwards;

  @keyframes block-screen {
    0% {
      background-color: rgba(0, 0, 0, 0);
    }

    100% {
      background-color: rgba(0, 0, 0, 0.35);
    }
  }
}
</style>
