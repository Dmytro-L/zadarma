<template>
  <div class="scenario">
    <div class="scenario__number">{{ id }}</div>
    <div class="scenario__title">Сценарий {{ id }}</div>
    <div class="scenario__change-block">
      <svg
        class="scenario__edit"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M15.9503 10.5494L19.451 14.05L11.8495 21.6514L8.72847 21.9959C8.31065 22.0421 7.95764 21.6888 8.00413 21.271L8.3514 18.1478L15.9503 10.5494ZM21.6161 10.0282L19.9724 8.38453C19.4597 7.87182 18.6282 7.87182 18.1155 8.38453L16.5691 9.93084L20.0698 13.4314L21.6161 11.8851C22.1288 11.3722 22.1288 10.5409 21.6161 10.0282Z"
          fill="#808080"
        />
      </svg>
      <svg
        @click="handleRemoveScenario"
        class="scenario__remove"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
      >
        <path
          d="M9 10.2969V9.53125C9 9.16758 9.29258 8.875 9.65625 8.875H12.7188L12.9758 8.36367C13.0852 8.13945 13.3121 8 13.5609 8H16.6863C16.9352 8 17.1621 8.13945 17.2742 8.36367L17.5312 8.875H20.5938C20.9574 8.875 21.25 9.16758 21.25 9.53125V10.2969C21.25 10.4773 21.1023 10.625 20.9219 10.625H9.32812C9.14766 10.625 9 10.4773 9 10.2969ZM20.375 11.8281V20.6875C20.375 21.4121 19.7871 22 19.0625 22H11.1875C10.4629 22 9.875 21.4121 9.875 20.6875V11.8281C9.875 11.6477 10.0227 11.5 10.2031 11.5H20.0469C20.2273 11.5 20.375 11.6477 20.375 11.8281ZM12.9375 13.6875C12.9375 13.4469 12.7406 13.25 12.5 13.25C12.2594 13.25 12.0625 13.4469 12.0625 13.6875V19.8125C12.0625 20.0531 12.2594 20.25 12.5 20.25C12.7406 20.25 12.9375 20.0531 12.9375 19.8125V13.6875ZM15.5625 13.6875C15.5625 13.4469 15.3656 13.25 15.125 13.25C14.8844 13.25 14.6875 13.4469 14.6875 13.6875V19.8125C14.6875 20.0531 14.8844 20.25 15.125 20.25C15.3656 20.25 15.5625 20.0531 15.5625 19.8125V13.6875ZM18.1875 13.6875C18.1875 13.4469 17.9906 13.25 17.75 13.25C17.5094 13.25 17.3125 13.4469 17.3125 13.6875V19.8125C17.3125 20.0531 17.5094 20.25 17.75 20.25C17.9906 20.25 18.1875 20.0531 18.1875 19.8125V13.6875Z"
          fill="#808080"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    id: {
      type: Number,
    },
    data: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["removeScenario"]),
    handleRemoveScenario() {
      this.removeScenario(this.id - 1);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins-&-variables.scss";
.scenario {
  display: flex;
  align-items: center;
  padding: 9px 14px 9px 20px;
  background-color: $background-300;
  box-shadow: $shadow-main;
  border-radius: 4px;
  animation-name: scenario;
  animation-duration: 700ms;
  animation-fill-mode: forwards;

  @keyframes scenario {
    0% {
      transform: scaleY(0.8);
      opacity: 0.2;
    }

    100% {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  &__number {
    padding: 1px 6px;
    border-radius: 32px;
    border: 1.2px solid #3e3f3a;
    background: #ffe87c;
    @include fs-12($gray-gray-custom, 400);
  }

  &__title {
    padding-left: 12px;
    @include fs-16($gray-gray-800, 500);
  }

  &__change-block {
    display: flex;
    margin-left: auto;
  }

  &__edit {
    margin-right: 8px;
  }

  &__edit,
  &__remove {
    transition: $main-transition;
  }

  &__edit:hover,
  &__remove:hover {
    cursor: pointer;

    path {
      fill: $semantic-error;
      transition: $main-transition;
    }
  }
}
</style>
