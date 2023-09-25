<template>
  <button
    @click="applyButton"
    :style="{ width: buttonWidth }"
    :class="type"
    class="button"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    buttonWidth: {
      type: String,
      default: "none",
    },
    type: {
      type: String,
      default: "primary",
    },
  },
  methods: {
    applyButton() {
      this.$emit("apply");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins-&-variables.scss";
.button {
  border-radius: 3px;
  background: $yellow-yellow-700;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
  border: none;
  padding: 6px 16px;
  transition: all 2s;
  @include fs-14($gray-gray-900, 600);

  &:hover {
    cursor: pointer;
  }

  &.cancel {
    background: none;
    box-shadow: none;
    padding: 6px 14px;
    @include fs-14($red-red-900, 400);
  }
  &.primary {
    padding: 6px 14px;
    @include fs-14($gray-gray-900, 500);
  }

  &.blocked {
    background: $gray-gray-800;
    color: $gray-gray-900;
  }
}
</style>
