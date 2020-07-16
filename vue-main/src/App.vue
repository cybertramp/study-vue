<script>
import axios from "axios";
export default {
  name: "app",
  data: function() {
    return {
      history_heads: [
        "Target",
        "NandType",
        "CM-Site",
        "Update Date",
        "Version Hash",
        "Description",
        "Remark",
        "FilePath"
      ],
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

<template>
  <div>
    <!-- menu bar-->
    <md-tabs>
      <md-tab id="menu_home" md-label="Home"></md-tab>
      <md-tab id="menu_mpflow" md-label="MP Flow"></md-tab>
      <md-tab id="menu_cmfilehistory" md-label="CM File History"></md-tab>
    </md-tabs>

    <md-table>
      <md-table-toolbar>
        <h1 class="md-title">MP data history</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head v-for="(item, idx) in history_heads" :key="idx">{{item}}</md-table-head>
      </md-table-row>
      <md-table-row v-for="(item, idx) in history_data.data" :key="idx">
        <md-table-cell>Target</md-table-cell>
        <md-table-cell>NandType</md-table-cell>
        <md-table-cell>CM-Site</md-table-cell>
        <md-table-cell>{{item.versionDate}}</md-table-cell>
        <md-table-cell>{{item.sha1}}</md-table-cell>
        <md-table-cell>{{item.description}}</md-table-cell>
        <md-table-cell>{{item.remark}}</md-table-cell>
        <md-table-cell>{{item.filePath}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

