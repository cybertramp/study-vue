<template>
  <div>
    <!-- mini menu -->
    <section>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">Add Flow</p>
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
      <b-field label="Flow branch" :label-position="labelPosition">
        <b-select placeholder="Select a branch">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </b-select>
      </b-field>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data: function() {
    return {
      history_data: []
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