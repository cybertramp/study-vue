<template>
  <div class="container">
    <section>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="title is-1">MP Flows</p>
          </div>
          <div class="level-item"></div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item"></p>
          <p class="subtitle is-5"></p>
        </div>
      </nav>
    </section>
    <!-- table -->
    <b-table v-bind:data="mpCurrentData.data" ref="mainTable">
      <template slot-scope="props">
        <b-table-column field="date" label="Date" is-small>
          <span>{{ new Date(props.row.date).toLocaleDateString() }}</span>
        </b-table-column>
        <b-table-column field="cmSite" label="Site" is-small>{{ props.row.cmSite }}</b-table-column>
        <b-table-column field="nandType" label="NandType" is-small>
          <span v-if="props.row.nandType == 'b27a'" class="tag is-light">{{ props.row.nandType }}</span>
          <span v-if="props.row.nandType == 'bics3'" class="tag is-black">{{ props.row.nandType }}</span>
        </b-table-column>
        <b-table-column field="mpName" label="Flow Name" is-small>
          <router-link
            to="/mpflow-detail"
            v-on:click.native="emitCurrentFlowId(props.row.id)"
          >{{ props.row.mpName }}</router-link>
        </b-table-column>
        <b-table-column field="branchName" label="Branch Path" is-small>{{ props.row.branchName }}</b-table-column>

        <b-table-column width="5%">
          <div class="buttons">
            <!-- table buttons -->
            <b-button
              type="is-info"
              size="is-small"
              outlined
              @click="downloadFile('http://10.11.11.146:3000/fadu/mp_cm_data/archive/'+props.row.cmSite+'/'+props.row.nandType+'/'+props.row.mpName.slice(0,8)+'.zip')"
            >Download</b-button>
          </div>
        </b-table-column>
      </template>
      <template slot="footer">
        <div class="has-text-right">
          There are
          <strong>{{Object.keys(mpCurrentData.data).length.toString()}}</strong> Flows.
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";

import { EventBus } from "../EventBus";

export default {
  name: "app",
  data: function () {
    return {
      sortableOptions: {
        chosenClass: "is-selected",
      },
      mpCurrentData: [],
      currentData: {
        id: "",
        mpName: "noName",
        branchName: "",
        nandType: "",
        cmSite: "",
        date: new Date(),
        description: "",
        testSteps: [],
      },
      currentStepData: {
        category1: "",
        category2: "",
        step: "",
        cmd: "",
        fileinfoShaList: [""],
        tag: "",
        description: "",
      },

      selected: "",
    };
  },
  methods: {
    getAllMpflow: function () {
      axios.get("http://10.11.11.146:9000/MPFlow/GetAllWithFilinfo").then(
        (response) => {
          this.mpCurrentData = response.data;
          this.selected = this.mpCurrentData.data[1];
          console.log(this.mpCurrentData.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    save(nowFlow) {
      // data transfer - Mpflow
      var wrapMpFlow = {
        id: this.currentData.id,
        mpName: this.currentData.mpName,
        nandType: this.currentData.nandType,
        cmSite: this.currentData.cmSite,
        date: this.currentData.date,
        description: this.currentData.description,
      };

      var wrapTestSteps = {
        mpFlowId: this.currentData.id,
        data: this.currentData.testSteps,
      };
      console.log("===");
      console.log(this.currentData.testSteps);

      // 1st data transfer - Mpflow
      axios
        .post("http://10.11.11.146:9000/MPFlow/ModifyMPFlow", wrapMpFlow)
        .then(
          (response) => {
            console.log("normal sended: " + response);
            console.log("======");
            // 2nd data transfer - Mpflow Steps
            axios
              .post(
                "http://10.11.11.146:9000/MPFlow/ModifyTestSteps",
                wrapTestSteps
              )
              .then(
                (response) => {
                  console.log("normal sended: " + response);
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
      this.$refs.mainTable.toggleDetails(nowFlow);
    },
    addStep: function () {
      if (
        this.currentStepData.category1 != "" &&
        this.currentStepData.category2 != "" &&
        this.currentStepData.step != ""
      ) {
        var tmp = this.currentStepData;
        this.currentData.testSteps.push({
          category1: tmp.category1,
          category2: tmp.category2,
          step: tmp.step,
          cmd: tmp.cmd.split(","),
          fileinfoShaList: tmp.fileinfoShaList,
          tag: tmp.tag,
          description: tmp.description,
        });
      }
    },
    removeLastStep() {
      this.currentData.testSteps.pop();
    },

    downloadFile(url) {
      // file download
      var link = document.createElement("a");
      link.href = url;
      link.click();
    },

    emitCurrentFlowId(_id) {
      console.log("Message transmission");
      EventBus.$emit("push-msg", _id);
    },
  },
  mounted: function () {
    this.getAllMpflow();
  },
};
</script>