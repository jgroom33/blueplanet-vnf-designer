<template>
  <div id="appheader" v-bind:class="view.mode">
    <div class="logo">
      <i class="fas fa-cloud" />&nbsp;VNF Designer
    </div>
    <div id="apptitle" class="label">{{title}}</div>
    <div id="appbuttons" class="buttons">
      <div v-on:click="context('Tenant')" title="Tenant overview">
        <i class="fas fa-map" />&nbsp;Overview
      </div>
      <div v-on:click="reset" title="Reset model">
        <i class="fas fa-certificate" />&nbsp;Reset
      </div>
      <div v-on:click="validate" title="Validate model">
        <i class="fas fa-check-circle" />&nbsp;Validate
      </div>
      <div v-on:click="context('Import')" title="Import model">
        <i class="fas fa-arrow-alt-circle-down" />&nbsp;Import
      </div>
      <div v-on:click="context('Export')" title="Export model">
        <i class="fas fa-arrow-alt-circle-up" />&nbsp;Export
      </div>
      <div v-on:click="context('Docs')" title="Documentation" v-if="window.location.hostname!=''">
        <i class="fas fa-book" />&nbsp;Docs
      </div>
    </div>
    <div id="apptabs" class="tabs">
      <template v-if="view.navigation === 'Tenant'">
        <div class="active">General</div>
        <div v-on:click="context('Flavor')">Flavors</div>
        <div v-on:click="context('Image')">Images</div>
        <div v-on:click="context('Network')">Networks</div>
        <div v-on:click="context('Component')">VNFd's</div>
      </template>
      <template v-if="view.navigation === 'Image'">
        <div v-on:click="context('Tenant')">General</div>
        <div v-on:click="context('Flavor')">Flavors</div>
        <div class="active">Images</div>
        <div v-on:click="context('Network')">Networks</div>
        <div v-on:click="context('Component')">VNFd's</div>
      </template>
      <template v-if="view.navigation === 'Flavor'">
        <div v-on:click="context('Tenant')">General</div>
        <div class="active">Flavors</div>
        <div v-on:click="context('Image')">Images</div>
        <div v-on:click="context('Network')">Networks</div>
        <div v-on:click="context('Component')">VNFd's</div>
      </template>
      <template v-if="view.navigation === 'Network'">
        <div v-on:click="context('Tenant')">General</div>
        <div v-on:click="context('Flavor')">Flavors</div>
        <div v-on:click="context('Image')">Images</div>
        <div class="active">Networks</div>
        <div v-on:click="context('Component')">VNFd's</div>
      </template>
      <template v-if="view.navigation === 'Component'">
        <div v-on:click="context('Tenant')">General</div>
        <div v-on:click="context('Flavor')">Flavors</div>
        <div v-on:click="context('Image')">Images</div>
        <div v-on:click="context('Network')">Networks</div>
        <div class="active">VNFd's</div>
      </template>
    </div>
  </div>
</template>

<script>
import setContext from "@/view.js"
import setModel from "@/view.js"
import view from "@/view.js"
import emptyModel from "@/misc.js"
import validate_xref from "@/validator.js"
import validate_schema from "@/validator.js"
import deleteComponent from "@/model.js"
import deleteNetwork from "@/model.js"
import deleteFlavor from "@/model.js"
import deleteImage from "@/model.js"
import addFlavor from "@/model.js"
import addImage from "@/model.js"
import addNetwork from "@/model.js"
import addComponent from "@/model.js"
import current from "@/model.js"
import msg from "@/model.js"
import model from "@/model.js"

export default {
  name: 'appheader',
  props: ["model", "view"],
  computed: {
    title: function() {
      return this.model.vnf + " (" + this.model.version + ")";
    }
  },
  methods: {
    context: function(ctxt) {
      setContext(ctxt);

      // resize appdetail to default values
      var detail = document.getElementById("appdetail");
      detail.style.left = null;
      var tabs = document.getElementById("apptabs");
      tabs.style.display = null;

      view.detail = "Tenant";

      switch (ctxt) {
        case "Import":
          view.detail = "Import";
          break;
        case "Export":
          view.detail = "Export";
          break;
        case "Docs":
          var win = window.open("/docs/index.html", "_blank");
          win.focus();
          break;
        default:
      }
    },
    add: function() {
      if (view.navigation === "Flavor") {
        addFlavor();
      }
      if (view.navigation === "Image") {
        addImage();
      }
      if (view.navigation === "Network") {
        addNetwork();
      }
      if (view.navigation === "Component") {
        addComponent();
      }
    },
    del: function() {
      if (view.navigation === "Flavor") {
        deleteFlavor();
      }
      if (view.navigation === "Image") {
        deleteImage();
      }
      if (view.navigation === "Network") {
        deleteNetwork();
      }
      if (view.navigation === "Component") {
        deleteComponent();
      }
    },
    validate: function() {
      var object = JSON.parse(JSON.stringify(model));

      // verify schema
      msg = validate_schema(object);
      if (msg != "") {
        view.modal = msg;
        return;
      }

      // verify xrefs
      msg = validate_xref(object);
      if (msg != "") {
        view.modal = msg;
        return;
      }

      // everything is fine
      view.modal = "No Validation Errors";
    },
    reset: function() {
      current = JSON.parse(JSON.stringify(emptyModel()));
      view.mode = "current";
      setModel(current);
      setContext("Tenant");
      // this.$forceUpdate();
    }
  }
};
</script>