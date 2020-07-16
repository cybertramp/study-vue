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
            <b-field>
              <b-input placeholder="Search..." type="search"></b-input>
            </b-field>
          </p>
          <p class="level-item">
            <b-button type="is-info">Search</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-link" href="/mp-hitory-add">Add</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-black">Delete</b-button>
          </p>
        </div>
      </nav>
    </section>
    <!-- table -->
    <section>
      <b-table
        v-bind:data="history_data.data"
        ref="table"
        default-sort="cmSite"
        paginated
        per-page="15"
        detailed
        detail-key="id"
        :show-detail-icon="false"
      >
        <template slot-scope="props">
          <b-table-column field="mpName" label="Name">
            <a @click="toggle(props.row)">{{ props.row.mpName }}</a>
          </b-table-column>
          <b-table-column field="cmSite" label="Site">{{props.row.cmSite}}</b-table-column>
          <b-table-column field="nandType" label="Type">{{props.row.nandType}}</b-table-column>
          <b-table-column field="date" label="Date">
            <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <p>
            <strong>{{props.row.fileinfoList.length.toString()}}</strong> Files
          </p>
          <b-table :data="props.row.fileinfoList">
            <template slot-scope="props2">
              <b-table-column field="filePath" label="Path">{{props2.row.filePath}}</b-table-column>
              <b-table-column field="version" label="Version">{{props2.row.version}}</b-table-column>
              <b-table-column field="sha1" label="Hash">{{props2.row.sha1}}</b-table-column>
              <b-table-column field="description" label="Description">{{props2.row.description}}</b-table-column>
              <b-table-column field="remark" label="Remark">{{props2.row.remark}}</b-table-column>
            </template>
          </b-table>
        </template>
      </b-table>
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