<template>
  <div id="appdetail">
    <flavorform
      v-if="view.detail === 'Flavor'"
      v-bind:model="model"
      v-bind:view="view"
      v-bind:flavor="view.entity"
    ></flavorform>
    <imageform
      v-if="view.detail === 'Image'"
      v-bind:model="model"
      v-bind:view="view"
      v-bind:image="view.entity"
    ></imageform>
    <networkform
      v-if="view.detail === 'Network'"
      v-bind:model="model"
      v-bind:view="view"
      v-bind:network="view.entity"
    ></networkform>
    <componentform
      v-if="view.detail === 'Component'"
      v-bind:model="model"
      v-bind:component="view.entity"
    ></componentform>
    <exportform
      v-if="view.detail === 'Export'"
      v-bind:model="model"
      v-bind:view="view"
      v-bind:templates="templates"
    ></exportform>
    <importform
      v-if="view.detail === 'Import'"
      v-bind:model="model"
      v-bind:view="view"
    ></importform>
    <tenant
      v-if="view.detail === 'Tenant'"
      v-bind:model="model"
      v-bind:view="view"
    ></tenant>
  </div>
</template>
<script>
import tenant from "./tenant/tenant";
import flavorform from "./flavors/flavorform";
import imageform from "./image/imageform";
import networkform from "./network/networkform";
import componentform from "./component/componentform";
import exportform from "./export/exportform";
import importform from "./import/importform";

export default {
  name: "appdetail",
  props: ["model", "current", "target", "view", "templates"],
  components: {
    flavorform,
    imageform,
    networkform,
    componentform,
    tenant,
    exportform,
    importform
  }
};
</script>
