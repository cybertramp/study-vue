<template>
  <div class="container">
    <section>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="title is-2">MP Flow - {{currentData.data.mpName}}</p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button type="is-link" tag="router-link" to="/mpflow">Back</b-button>
          </p>
        </div>
      </nav>
      <b-tabs animated destroy-on-hide>
        <b-tab-item label="Property">
          <b-field horizontal label="MP Flow name: ">{{currentData.data.mpName}}</b-field>
          <b-field horizontal label="File Branch name: ">{{currentData.data.branchName}}</b-field>
          <b-field horizontal label="Nand Type">{{currentData.data.nandType}}</b-field>
          <b-field horizontal label="CM Site: ">{{currentData.data.cmSite}}</b-field>
          <b-field horizontal label="Updated Date: ">{{currentData.data.date}}</b-field>
          <b-field horizontal label="Description: ">{{currentData.data.description}}</b-field>
        </b-tab-item>
        <b-tab-item label="MPFlows">
          <section>
            <b-table v-bind:data="testSteps">
              <template slot-scope="props">
                <b-table-column field="category1" label="Category1">{{ props.row.category1 }}</b-table-column>
                <b-table-column field="category2" label="Category2">{{ props.row.category2 }}</b-table-column>
                <b-table-column field="step" label="Step">{{ props.row.step }}</b-table-column>
                <b-table-column field="cmd" label="Commands">{{ props.row.cmd }}</b-table-column>
                <b-table-column field="tag" label="Tags">{{ props.row.tag }}</b-table-column>
              </template>
            </b-table>
          </section>
        </b-tab-item>

        <b-tab-item label="Files">
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <div class="level-item">
                  <p class="subtitle is-5">
                    <strong>{{Object.keys(currentData.data.fileinfoList).length.toString()}}</strong> Files
                  </p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
              <p class="level-item"></p>
            </div>
          </nav>
          <b-table v-bind:data="currentData.data.fileinfoList">
            <template slot-scope="props">
              <b-table-column field="filePath" label="File Path" sortable>{{ props.row.filePath }}</b-table-column>
              <b-table-column field="sha1" label="Sha1">{{ props.row.sha1 }}</b-table-column>
              <b-table-column field="version" label="Version">{{ props.row.version }}</b-table-column>
              <b-table-column
                field="description"
                label="Description"
                sortable
              >{{ props.row.description }}</b-table-column>
            </template>
          </b-table>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from "../EventBus";
export default {
  name: "app",
  data: function () {
    return {
      activeTab: 0,
      currentId: "",
      currentData: {},
      testSteps: {},
    };
  },
  methods: {
    onCurrentFlowId() {
      console.log("on!");
      EventBus.$on("push-msg", (payload) => {
        //received data
        this.currentId = payload;

        var url = "http://10.11.11.146:9000/MPFlow/GetMPFlow/" + this.currentId;

        axios.get(url).then(
          (response) => {
            console.log(response.data);
            this.currentData = response.data;

            url =
              "http://10.11.11.146:9000/MPFlow/GetTestSteps/" + this.currentId;
            axios.get(url).then(
              (response2) => {
                this.testSteps = response2.data.data;
                console.log(this.testSteps);
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
  },
  mounted: function () {
    this.onCurrentFlowId();
  },
  beforeDestroy: function () {
    EventBus.$off("push-msg");
  },
};
</script>