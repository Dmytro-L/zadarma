<template>
  <div class="single-range">
    <div class="range-wrapper">
      <div
        :title="value"
        @mousedown="startDragging"
        @mouseup="stopDragging"
        class="checkbox-trigger"
        ref="rangeTrigger"
        :style="{ left: positionLeft + 'px' }"
      >
        <div class="checkbox-trigger-wrapper">
          <svg
            class="left-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
          >
            <path
              d="M6 7H1M1 7L3 5M1 7L3 9"
              stroke="#A1A1A1"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 1C6 0.447716 6.44772 0 7 0C7.55228 0 8 0.447715 8 1V13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13V1Z"
              fill="#A1A1A1"
            />
          </svg>
          <p class="slider-text">Текст <span>(100)</span></p>
          <svg
            class="right-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
          >
            <path
              d="M2 7H7M7 7L5 5M7 7L5 9"
              stroke="#A1A1A1"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 1C2 0.447716 1.55228 0 1 0C0.447715 0 0 0.447715 0 1V13C0 13.5523 0.447715 14 1 14C1.55228 14 2 13.5523 2 13V1Z"
              fill="#A1A1A1"
            />
          </svg>
        </div>
      </div>
      <input
        type="range"
        id="slider"
        min="0"
        max="120"
        step="1"
        v-model="value"
        class="custom-range"
        ref="rangeInput"
      />
    </div>
    <div class="reset-range">
      <svg
        @click="resetRange"
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
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    max: {
      type: Number,
      default: 120,
    },
  },
  data() {
    return {
      value: 0,
      sliderValue: 0,
      positionLeft: 0,
      isDragging: false,
      mouseX: 0,
      currentMove: 0,
      startPosition: 0,
      trackWidth: 0,
      mouseMove: 0,
      step: 1,
      triggerCurrentPosition: 0,
      dataItem: this.data,
    };
  },
  methods: {
    resetRange() {
      this.dataItem.time = this.value = 0;
      this.handleMouseMove(0);
    },
    stopDragging() {
      this.isDragging = false;
      this.triggerCurrentPosition = this.positionLeft;
      document.removeEventListener("mousemove", this.handleMouseMove);
    },
    startDragging(event) {
      this.isDragging = true;
      this.mouseX = event.clientX;
      document.addEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseMove(event) {
      if (this.isDragging) {
        this.mouseMove = event.clientX - this.mouseX;
        let positionLeft =
          this.triggerCurrentPosition + event.clientX - this.mouseX;
        this.updateRangeVal(positionLeft);
      }
      this.dataItem.time = this.value;
    },
    updateRangeVal(positionLeft) {
      this.value = parseInt(this.positionLeft * this.stepRange);
      if (positionLeft <= 0) {
        this.positionLeft = 0;
      } else if (positionLeft >= this.trackWidth) {
        this.positionLeft = this.trackWidth;
      } else {
        this.positionLeft = positionLeft;
      }
    },
  },
  mounted() {
    this.trackWidth = this.$refs.rangeInput.getBoundingClientRect().width - 200;
  },
  computed: {
    stepRange() {
      return this.max / this.trackWidth;
    },
    minValue() {
      return this.startPosition + 100;
    },
    maxValue() {
      return this.startPosition + this.trackWidth - 100;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins-&-variables.scss";
.range-wrapper {
  width: inherit;
  display: flex;
}

.single-range {
  position: relative;
  padding: 20px 0;
  display: flex;
  width: 100%;
  align-items: center;
}
.checkbox-trigger {
  width: 200px;
  height: 30px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  // transform: translateX(100px);
  cursor: pointer;
  &:active .checkbox-trigger-wrapper {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18) inset;
  }
}
.checkbox-trigger-wrapper {
  position: relative;
  background: linear-gradient(180deg, #fff 0%, #eee 100%);
  border: 1px solid $gray-gray-400;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding: 0px 5px;
  align-items: center;
  height: 100%;

  .slider-text {
    @include fs-14($gray-gray-900, 500);
    span {
      @include fs-14($gray-gray-700, 400);
    }
  }
}
input[type="range"] {
  pointer-events: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: $gray-gray-300;
  border-radius: 3px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2) inset;
}

input[type="range"]::-webkit-slider-thumb {
  opacity: 0;
}
</style>
