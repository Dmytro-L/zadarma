<template>
  <div class="dropdown">
    <div class="label-trigger">Звонить</div>
    <div
      ref="trigger"
      class="trigger"
      :class="{ active: isActive }"
      @click="openDropdown"
    >
      <div class="trigger-text">
        <span v-if="!hasSelected.length">
          {{ defaultText }}
        </span>
        <p v-else>
          <span v-for="item in hasSelected" :key="item.id"
            >{{ item.name }},
          </span>
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="none"
        >
          <path d="M4.73684 5.5L0.473684 0.5H9L4.73684 5.5Z" fill="#666666" />
        </svg>
      </div>
    </div>
    <div class="body" ref="dropdownBody" v-if="isActive">
      <ul class="list">
        <li class="top-block">
          <p @click="updateAll(true)" class="check-all">Выбрать все</p>
          <p @click="updateAll(false)" class="clear-all">Очистить</p>
        </li>
        <li class="list-item" v-for="item in dataItems" :key="item.id">
          <input
            :checked="item.active"
            name="checkbox-item"
            type="checkbox"
            @input="input(item)"
          />
          <label class="checkbox-title" for="checkbox-item"
            >{{ item.name }}<span>({{ item.number }})</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasSelected: {
      type: Array,
    },
    data: {
      type: Array,
      required: true,
    },
    defaultText: {
      type: String,
      default: "Выберите внутренние номера",
    },
  },
  data() {
    return {
      isActive: false,
      dataItems: this.data,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  destroyed() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  methods: {
    updateAll(val) {
      for (let item in this.dataItems) {
        this.dataItems[item].active = val;
      }
    },
    input(item) {
      item.active = !item.active;
    },
    openDropdown() {
      this.isActive = !this.isActive;
    },
    handleDocumentClick(event) {
      if (
        this.$refs.trigger &&
        !this.$refs.trigger.contains(event.target) &&
        this.$refs.dropdownBody &&
        !this.$refs.dropdownBody.contains(event.target)
      ) {
        this.isActive = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins-&-variables.scss";
.check-all,
.clear-all {
  cursor: pointer;
}
.dropdown {
  position: relative;

  .trigger {
    cursor: pointer;
    border-radius: 4px;
    border: solid 2px transparent;

    &.active {
      border: solid 2px #fddd45;
    }
    .trigger-text p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .body {
    position: absolute;
    top: 100%;
    padding: 7px 0;
    border-radius: 4px;
    border: 1px solid $gray-gray-400;
    background: $background-000;
    box-shadow: 0px 1px 5px 0px rgba(24, 19, 11, 0.18);
    width: 100%;
    z-index: 5;
    .list {
      list-style: none;

      .checkbox-title {
        margin-left: 10px;
        @include fs-14($gray-gray-900, 400);

        span {
          margin-left: 6px;
          color: $gray-gray-700;
        }
      }

      .list-item {
        padding: 8px 16px;
        display: flex;
        align-items: center;
      }
    }

    .top-block {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px;

      p {
        @include fs-14($red-red-900, 400);
      }
    }
  }
}
.label-trigger {
  margin-bottom: 2px;
  @include fs-14($gray-gray-900, 600);
}

.trigger-text {
  display: flex;
  padding: 6px 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border: 1px solid $brown-brown-400;
  width: 100%;

  span {
    @include fs-14($brown-brown-700, 400);
  }
}
</style>
