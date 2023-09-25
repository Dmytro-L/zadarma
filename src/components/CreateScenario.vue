<template>
  <div class="create-scenario" :class="{ active: isActive }">
    <div class="create-scenario__form">
      <div class="create-scenario__close" @click="closeCreateBlock">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M8 8L16 16M24 24L16 16M16 16L24 8L8 24"
            stroke="#A1A1A1"
            stroke-width="2"
          />
        </svg>
      </div>
      <h2 class="create-scenario__title">Создать сценарий</h2>
      <drop-down :has-selected="hasSelected" :data="data" />
      <div class="create-scenario__info">
        <p class="start">0 сек</p>
        <p class="end">120 сек</p>
      </div>
      <div class="create-scenario__selected selected-items">
        <div v-if="!hasSelected.length" class="selected-items__empty">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 3C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3H5ZM5 5H19V7H5V5ZM5 9H19V19H5V9ZM7 11V13H9V11H7ZM11 11V13H17V11H11ZM7 15V17H9V15H7ZM11 15V17H17V15H11Z"
              fill="#808080"
            />
          </svg>
          <p class="selected-items__empty-text">
            Внутренних номеров не добавлено
          </p>
          <p class="selected-items__select-trigger">Выбрать</p>
        </div>
        <div class="ranges-block">
          <ul class="range-list">
            <li class="range-item" v-for="item of data" :key="item.id">
              <single-range :data="item" v-if="item.active" />
            </li>
          </ul>
        </div>
      </div>
      <div class="create-scenario__apply-block apply-block">
        <main-button
          @apply="applyButton(true)"
          button-text="Coздать"
          :type="hasSelected.length > 0 ? 'primary' : 'blocked'"
        />
        <main-button
          @apply="applyButton(false)"
          button-text="Отменить"
          type="cancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DropDown from "./DropDown.vue";
import MainButton from "./MainButton.vue";
import SingleRange from "./SingleRange.vue";

const arr = [
  {
    id: 1,
    name: "Сергей",
    number: 100,
    time: 0,
    active: false,
  },
  {
    id: 2,
    name: "Extension 101",
    number: 101,
    time: 0,
    active: false,
  },
  {
    id: 3,
    name: "Extension 102",
    number: 102,
    time: 0,
    active: false,
  },
  {
    id: 4,
    name: "Extension 103",
    number: 103,
    time: 0,
    active: false,
  },
  {
    id: 5,
    name: "Extension 104",
    number: 104,
    time: 0,
    active: false,
  },
];
export default {
  components: { DropDown, MainButton, SingleRange },
  props: {
    isActive: {
      type: Boolean,
    },
  },
  data() {
    return {
      data: arr,
    };
  },
  computed: {
    hasSelected() {
      return this.data.filter((item) => item.active);
    },
  },
  methods: {
    ...mapActions(["addScenario"]),
    closeCreateBlock() {
      this.$emit("close");
    },
    applyButton(val) {
      if (val) {
        this.addScenario(this.data);
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins-&-variables.scss";

.create-scenario {
  width: 500px;
  height: 100vh;
  background-color: $background-000;
  box-shadow: $shadow-100;
  position: absolute;
  right: -100%;
  opacity: 0.7;
  transition: all 1.5s;

  &.active {
    transition: all 0.5s;
    right: 0;
    opacity: 1;
  }

  &__form {
    position: relative;
    padding: 32px 24px;
    height: 100%;
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    transition: $main-transition;
    &:hover {
      cursor: pointer;
      path {
        transition: $main-transition;
        stroke: $semantic-error;
      }
    }
  }

  &__title {
    margin-bottom: 24px;
    @include fs-20($black-gray-custom, 400);
  }

  &__info {
    margin-top: 32px;
    padding: 10px 12px 8px 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid $brown-brown-400;
    background-color: $yellow-yellow-300;

    p {
      @include fs-14($gray-gray-700, 500);
    }
  }

  .selected-items {
    &__empty {
      text-align: center;
      margin-top: 58px;
    }
    &__empty-text {
      margin-top: 8px;
      @include fs-14($gray-gray-800, 400);
    }

    &__select-trigger {
      cursor: not-allowed;
      margin-top: 8px;
      text-decoration: underline dotted;
      @include fs-14($red-red-900, 500);
    }
  }

  .apply-block {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    gap: 6px;
    padding: 20px 24px;
    fill: #fff;
    filter: drop-shadow(0px -1px 3px rgba(0, 0, 0, 0.16));
  }
}

.ranges-block {
  .range-list {
    list-style: none;
  }
}
</style>
