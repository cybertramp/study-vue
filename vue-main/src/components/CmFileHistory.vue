<template>
  <div>
    <!-- table -->
    <b-table :data="history_data.data" paginated per-page="15">
      <template slot-scope="props">
        <b-table-column field="description" label="Description">{{props.row.description}}</b-table-column>
        <b-table-column field="remark" label="Remark">{{props.row.remark}}</b-table-column>
        <b-table-column field="versionDate" label="Update Date" centered>
          <span class="tag is-success">{{new Date(props.row.versionDate).toLocaleDateString()}}</span>
        </b-table-column>
        <b-table-column field="version" label="Version" centered>
          <span class="tag is-failed">version</span>
        </b-table-column>
        <b-table-column field="sha1" label="Hash" centered>
          <span class="tag is-black">{{props.row.sha1}}</span>
        </b-table-column>
        <b-table-column field="filePath" label="Filepath">{{props.row.filePath}}</b-table-column>
      </template>
    </b-table>
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
    getAllHistory: function() {
      axios.get("http://10.11.11.146:9000/Fileinfo/GetAllList").then(
        response => {
          this.history_data = response.data;
          console.log(this.history_data.data);
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted: function() {
    this.getAllHistory();
  }
};
</script>