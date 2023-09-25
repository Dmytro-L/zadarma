<template>
  <div class="scenarios">
    <zadarma-logo />
    <p v-if="!scenarios.length" class="scenarios__empty">{{ emptyText }}</p>
    <div class="scenarios__items">
      <single-scenario
        v-for="(item, index) in scenarios"
        :key="item.id"
        :data="item"
        :id="index + 1"
      />
    </div>
    <main-button
      button-width="300px"
      @apply="createScenario"
      button-text="Создать сценарий"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MainButton from "./MainButton.vue";
import SingleScenario from "./SingleScenario.vue";
import ZadarmaLogo from "./ZadarmaLogo.vue";
export default {
  components: { ZadarmaLogo, MainButton, SingleScenario },
  props: {
    emptyText: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["scenarios"]),
  },
  methods: {
    ...mapActions(["addScenario"]),
    createScenario() {
      this.$emit("create-scenario");
    },
    loadScenariosFromLocalStorage() {
      const storedScenarios = localStorage.getItem("scenarios");
      if (storedScenarios) {
        const parsedScenarios = JSON.parse(storedScenarios);
        parsedScenarios.forEach((scenario) => {
          this.addScenario(scenario);
        });
      }
    },
  },
  created() {
    this.loadScenariosFromLocalStorage();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins-&-variables.scss";
.scenarios {
  margin: 128px auto auto;
  padding: 48px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08),
    0px 1px 2px 0px rgba(0, 0, 0, 0.05);

  &__empty {
    text-align: center;
    @include fs-14($gray-gray-800, 400);
    margin: 35px 0;
  }

  &__items {
    transition: all 2s;
    margin: 35px 0;

    .scenario + .scenario {
      margin-top: 15px;
    }
  }
}
</style>
