<template>
  <div>
    <b-navbar type="is-white" fixed-top shadow>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="../img/logo.png" alt="FADU Inc" />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-dropdown label="Menu" hoverable boxed>
          <b-navbar-item href="/mpflow">MP Flow</b-navbar-item>
          <b-navbar-item href="http://10.11.11.146:3000/fadu/mp_cm_data">File Repository</b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item href="/logout">Logout</b-navbar-item>
      </template>
    </b-navbar>
    <br />
    <title>FADU PB portal</title>
    <!-- menu bar-->

    <div class="container is-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {},
};
</script>


