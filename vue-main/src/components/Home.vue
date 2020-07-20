<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-warning">
              <p class="title">CMs</p>
              <p class="subtitle">2</p>
            </article>
            <article class="tile is-child notification is-success">
              <p class="title">branches</p>
              <p class="subtitle">5</p>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-danger">
            <p class="title">Total size</p>
            <p class="subtitle">32Mbyte</p>
            <div class="content">
              <!-- Content -->
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-white">
          <div class="content">
            <p class="title">Server Status</p>
            <p class="subtitle">Online</p>
            <div class="content">
              <!-- Content -->
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>


<script>
//import axios from "axios";
export default {
  name: "app",
  methods: {},
  mounted: {}
};
</script>