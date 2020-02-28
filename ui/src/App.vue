<template>
  <div
    v-bind:model="model"
    v-bind:current="current"
    v-bind:view="view"
    v-bind:templates="templates"
  ></div>
</template>

<script>
// import axios from "axios";
import model from "@/model";
import view from "@/view";
import templates from "@/templates";
import current from "@/model";

export default {
  name: "App",
  data() {
    return {
      model: model,
      view: view,
      templates: templates,
      current: current
    };
  },
  async created() {},
  methods: {}
};
</script>
