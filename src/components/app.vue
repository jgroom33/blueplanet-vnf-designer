<template>
  <div>
    <appheader v-bind:model="model" v-bind:view="view" :misc="misc"></appheader>
    <appnavigation v-bind:model="model" v-bind:view="view"></appnavigation>
    <!-- v-bind:target="target" -->
    <appdetail
      v-bind:model="model"
      v-bind:current="current"
      v-bind:view="view"
      v-bind:templates="templates"
    ></appdetail>
    <modal v-if="view.modal !== ''" v-bind:view="view"></modal>
  </div>
</template>
<script>
import appheader from "@/components/appheader";
import appnavigation from "@/components/appnavigation";
import appdetail from "@/components/appdetail";
import modal from "@/components/modal";
// import axios from "axios";
import model from "@/model";
import view from "@/view";
import misc from "@/misc";
import templates from "@/templates";
import current from "@/model";

export default {
  name: "app",
  data() {
    return {
      model: model,
      view: view,
      misc: misc,
      templates: templates,
      current: current
    };
  },
  components: {
    appdetail,
    appheader,
    appnavigation,
    modal
  },
  created() {
    setInterval(function() {
      var t = new Date();
      view.now =
        t.getFullYear() +
        "-" +
        ("0" + t.getMonth()).substr(-2) +
        "-" +
        ("0" + t.getDate()).substr(-2) +
        " " +
        ("0" + t.getHours()).substr(-2) +
        ":" +
        ("0" + t.getMinutes()).substr(-2) +
        ":" +
        ("0" + t.getSeconds()).substr(-2);
    }, 1000);
  }
  // props: ["model", "current", "target", "view", "templates"],
};
</script>
<style>
@import "../styles/app.css";
@import "../styles/component.css";
@import "../styles/export.css";
@import "../styles/flavor.css";
@import "../styles/image.css";
@import "../styles/import.css";
@import "../styles/modal.css";
@import "../styles/network.css";
@import "../styles/tenant.css";
</style>
