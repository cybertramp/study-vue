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
          <nav class="level" style="margin: 0px">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <strong>{{props.row.fileinfoList.length.toString()}}</strong> Files
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
              <p class="level-item">
                <b-button type="is-fail" @click="switchModify()">{{modifyKeyName}}</b-button>
              </p>
            </div>
          </nav>
          <b-table :data="props.row.fileinfoList">
            <template slot-scope="props2">
              <b-table-column v-if="modifyModeFileinfo" label="Description">
                <b-input
                  :value="props2.row.description"
                  @change="props2.row.description = event.target.value"
                ></b-input>
              </b-table-column>
              <b-table-column v-else label="Description">{{props2.row.description}}</b-table-column>

              <b-table-column v-if="modifyModeFileinfo" label="Version">
                <b-input :value="props2.row.version"></b-input>
              </b-table-column>
              <b-table-column
                v-else
                field="version"
                label="Version"
                v-model="inputData.version"
              >{{props2.row.version}}</b-table-column>

              <b-table-column v-if="modifyModeFileinfo" label="Remark">
                <b-input :value="props2.row.remark"></b-input>
              </b-table-column>
              <b-table-column
                v-else
                field="remark"
                label="Remark"
                v-model="inputData.remark"
              >{{props2.row.remark}}</b-table-column>

              <b-table-column field="filePath" label="Path">{{props2.row.filePath}}</b-table-column>

              <b-table-column field="sha1" label="Hash">{{props2.row.sha1}}</b-table-column>
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
      history_data: [],
      modifyModeFileinfo: false,
      modifyKeyName: "Modify",
      inputData: {
        description: "",
        version: "",
        remark: "",
        filePath: "",
        sha1: ""
      }
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
    },
    switchModify() {
      if (this.modifyModeFileinfo == false) {
        this.modifyModeFileinfo = true;
        this.modifyKeyName = "Apply";
      } else {
        // send
        this.modifyModeFileinfo = false;
        this.modifyKeyName = "Modify";
        // data 갱신

        axios.post("http://10.11.11.146:9000/Fileinfo/ModifyFileinfo").then(
          response => {
            this.history_data = response.data;
            console.log(this.history_data.data);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  },
  mounted: function() {
    this.getAllMpflow();
  }
};
</script>