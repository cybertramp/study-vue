<template>
  <div class="container">
    <section>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="title is-1">MP Flows</p>
          </div>
          <div class="level-item"></div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item"></p>
        </div>
      </nav>
    </section>
  </div>
</template>

<script>
//import axios from "axios";
import { EventBus } from "../EventBus";
export default {
  name: "app",
  data: function() {
    return {
      currentId: ""
    };
  },
  methods: {
    onCurrentFlowId() {
      console.log("on!");
      EventBus.$on("push-msg", payload => {
        //received data
        this.currentId = payload;
        console.log(this.currentId);
      });
    }
  },
  mounted: function() {
    this.onCurrentFlowId();
  },
  beforeDestroy: function() {
    EventBus.$off("push-msg");
  }
};
</script>