<template>
  <div>
    <!-- menu bar-->
    <b-navbar type="is-white" fixed-top shadow>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="../img/logo.png" alt="FADU Inc" />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item href="/">Home</b-navbar-item>
        <b-navbar-dropdown label="CM Management">
          <b-navbar-item href="/mpflow">MP Flow</b-navbar-item>
          <b-navbar-item href="/cm-file-history">File History</b-navbar-item>
          <b-navbar-item href="/cm-repo">File Repository</b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  methods: {}
};
</script>
