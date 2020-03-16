<template>
  <div class="list">
    <componentitem
      :key="component.uuid"
      v-for="component in model.current.components"
      v-bind:model="model"
      v-bind:view="view"
      v-bind:component="component"
    ></componentitem>
  </div>
</template>
<script>
import componentitem from "./componentitem";
export default {
  name: "components",
  props: ["model", "view"],
  components: {
    componentitem
  }
};
</script>
