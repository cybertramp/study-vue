<template>
  <div>
    <!-- mini menu -->
    <section>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{history_data.data.length.toString()}}</strong> Flows
            </p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button type="is-link">Save</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-black">Delete</b-button>
          </p>
        </div>
      </nav>
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