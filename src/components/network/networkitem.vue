<template>
  <div class="item">
    <div class="name" v-on:click="pick(network)">
      <i class="fas fa-cloud" />&nbsp;{{ network.name }}
    </div>
    <div class="button" v-on:click="del(network)">
      <i class="fas fa-minus" />
    </div>
  </div>
</template>
<script>
export default {
  name: "networkitem",
  props: ["model", "view", "network"],
  methods: {
    pick: function(entity) {
      this.view.detail = "Network";
      this.view.entity = entity;
    },
    del: function(entity) {
      this.model.deleteNetwork(entity);
      if (this.view.detail === "Network") {
        this.view.detail = "";
        this.view.entity = null;
      }
    }
  }
};
</script>
