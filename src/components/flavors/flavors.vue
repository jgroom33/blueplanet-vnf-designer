<template>
  <div class="list">
    <flavoritem
      :key="flavor.uuid"
      v-for="flavor in model.current.flavors"
      v-bind:model="model"
      v-bind:view="view"
      v-bind:flavor="flavor"
    ></flavoritem>
  </div>
</template>
<script>
import flavoritem from "./flavoritem";

export default {
  props: ["model", "view"],
  components: {
    flavoritem
  }
};
</script>
