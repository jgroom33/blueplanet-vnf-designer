<template>
  <div>
    <appheader v-bind:model="model" v-bind:view="view"></appheader>
    <appnavigation v-bind:model="model" v-bind:view="view"></appnavigation>
    <appdetail
      v-bind:model="model"
      v-bind:current="current"
      v-bind:target="target"
      v-bind:view="view"
      v-bind:templates="templates"
    ></appdetail>
    <!-- <modal v-if="view.modal !== ''" v-bind:view="view"></modal> -->
  </div>
</template>
<script>
import appheader from "@/components/appheader";
import appnavigation from "@/components/appnavigation";
import appdetail from "@/components/appdetail";
import modal from "@/components/modal";

export default {
  name: 'app',
  props: ["model", "current", "target", "view", "templates"]
};
</script>
