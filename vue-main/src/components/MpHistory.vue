<template>
  <div>
    <section>
      <!-- Table navbar -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="title is-3">MP Flows</p>
          </div>
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{Object.keys(history_data.data).length.toString()}}</strong> Flows
            </p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button type="is-info">Test</b-button>
          </p>
        </div>
      </nav>
      <!-- table -->
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
          <b-table-column field="mpName" label="Name" searchable>{{ props.row.mpName }}</b-table-column>
          <b-table-column field="cmSite" label="Site" searchable>{{props.row.cmSite}}</b-table-column>
          <b-table-column field="nandType" label="Type">{{props.row.nandType}}</b-table-column>
          <b-table-column field="date" label="Date">
            <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
          </b-table-column>
          <b-table-column>
            <div class="buttons">
              <b-button type="is-danger" size="is-small" outlined rounded>Flow Sequence</b-button>
              <b-button
                type="is-primary"
                size="is-small"
                outlined
                rounded
                @click="toggle(props.row,props.row.id)"
              >File info</b-button>
            </div>
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <nav class="level" style="margin: 0px">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <strong>{{Object.keys(props.row.fileinfoList).length.toString()}}</strong> Files
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
              <p class="level-item">
                <b-button
                  type="is-fail"
                  @click="switchModify(history_data.data.indexOf(props.row))"
                >{{modifyKeyName}}</b-button>
              </p>
              <p class="level-item">
                <b-button type="is-black" @click="toggle(props.row,props.row.id)">Close</b-button>
              </p>
            </div>
          </nav>
          <!-- fileinfo table -->
          <b-table :data="props.row.fileinfoList">
            <template slot-scope="props2">
              <b-table-column v-if="modifyModeFileinfo" label="Description">
                <b-input v-model="props2.row.description"></b-input>
              </b-table-column>
              <b-table-column v-else label="Description">{{props2.row.description}}</b-table-column>

              <b-table-column v-if="modifyModeFileinfo" label="Version">
                <b-input v-model="props2.row.version"></b-input>
              </b-table-column>
              <b-table-column
                v-else
                field="version"
                label="Version"
                v-model="inputData.version"
              >{{props2.row.version}}</b-table-column>

              <b-table-column v-if="modifyModeFileinfo" label="Remark">
                <b-input v-model="props2.row.remark"></b-input>
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
      },
      now_index: 9999,
      send_data: { data: "" }
    };
  },
  methods: {
    getAllMpflow: function() {
      axios.get("http://10.11.11.146:9000/MPFlow/GetAllWithFilinfo").then(
        response => {
          this.history_data = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    toggle(row, idMpflow) {
      this.$refs.table.toggleDetails(row);
      this.nowIdMpflow = idMpflow;
    },
    switchModify(row) {
      if (this.modifyModeFileinfo == false) {
        this.modifyModeFileinfo = true;
        this.modifyKeyName = "Apply";
      } else {
        // send
        this.modifyModeFileinfo = false;
        this.modifyKeyName = "Modify";

        // data 갱신
        this.send_data["data"] = this.history_data.data[row].fileinfoList;

        axios
          .post(
            "http://10.11.11.146:9000/Fileinfo/ModifyFileinfoList",
            this.send_data
          )
          .then(
            response => {
              console.log("normal sended: " + response);
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