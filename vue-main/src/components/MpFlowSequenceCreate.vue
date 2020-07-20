<template>
  <div>
    <!-- mini menu -->
    <section>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="title is-3">Create MP Flow</p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button type="is-link" tag="router-link" to="/mp-history">Back</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-success">Save</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-black">Delete</b-button>
          </p>
        </div>
      </nav>
      <!-- content -->
      <div class="columns">
        <div class="column">
          <b-field label="MP Flow name">
            <b-input name="subject" placeholder="unigen MP v1"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="File Data">
            <b-select placeholder="Select a branch">
              <option
                v-for="option in branches"
                :value="option.id"
                :key="option.id"
              >{{ option.name }}</option>
            </b-select>
          </b-field>
        </div>
        <div class="column"></div>
        <div class="column"></div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field label="Nand Type">
            <b-input placeholder="BiCS3 / B27A"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="CM Site">
            <b-input placeholder="exicon / unigen"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Update Date">
            <b-input placeholder="20200703"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Remark">
            <b-input placeholder="08VQ"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field label="Description">
            <b-input placeholder="Updated..." maxlength="3000" type="textarea"></b-input>
          </b-field>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data: function() {
    return {
      branches: [{ name: "exicon" }, { name: "exicon" }, { name: "unigen" }]
    };
  },
  methods: {
    getAllMpflow: function() {
      axios.get("http://10.11.11.146:9000/MPFlow/GetAllWithFilinfo").then(
        response => {
          this.history_data = response.data;
          console.log(this.history_data.data);
        },
        error => {
          console.log(error);
        }
      );
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    }
  },
  mounted: function() {
    this.getAllMpflow();
  }
};
</script>