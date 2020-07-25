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
          <p class="subtitle is-5">
            <strong>{{Object.keys(mpCurrentData.data).length.toString()}}</strong> Flows
          </p>
        </div>
      </nav>
    </section>
    <!-- table -->

    <b-table
      v-bind:data="mpCurrentData.data"
      ref="mainTable"
      detailed
      detail-key="id"
      :show-detail-icon="false"
    >
      <template slot-scope="props">
        <b-table-column field="mpName" label="Flow Name" is-small>
          <router-link
            to="/mpflow-detail"
            v-on:click.native="emitCurrentFlowId(props.row.id)"
          >{{ props.row.mpName }}</router-link>
        </b-table-column>
        <b-table-column field="branchName" label="Branch Data" is-small>{{ props.row.branchName }}</b-table-column>
        <b-table-column field="nandType" label="NandType" is-small>{{ props.row.nandType }}</b-table-column>
        <b-table-column field="cmSite" label="Site" is-small>{{ props.row.cmSite }}</b-table-column>
        <b-table-column field="date" label="Date" is-small>
          <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
        </b-table-column>
        <b-table-column>
          <div class="buttons">
            <!-- table buttons -->
            <b-button type="is-danger" size="is-small" outlined @click="toggle(props.row)">Modify</b-button>
            <b-button
              type="is-info"
              size="is-small"
              outlined
              @click="downloadFile('http://10.11.11.146:3000/fadu/mp_cm_data/archive/'+props.row.cmSite+'/'+props.row.nandType+'/'+props.row.mpName.slice(0,8)+'.zip')"
            >Download</b-button>
          </div>
        </b-table-column>
      </template>
      <!-- 분기점 -->
      <template slot="detail">
        <!-- Modify menu -->
        <!-- Modify case -->
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <p class="title is-3">
                <b>Modify flow</b>
              </p>
            </div>
          </div>

          <!-- Right side -->
          <div class="level-right">
            <p class="level-item">
              <b-button type="is-link" @click="save()">Save</b-button>
            </p>
            <!-- future
              <p class="level-item">
                <b-button type="is-black">Load previous</b-button>
              </p>
            -->
          </div>
        </nav>
        <div class="columns">
          <div class="column is-one-quarter">
            <b-field label="MP Flow name">
              <b-input v-model="currentData.mpName">{{currentData.mpName}}</b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Description">
              <b-input v-model="currentData.description">{{currentData.description}}</b-input>
            </b-field>
          </div>
        </div>
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <p class="title is-4">
                <b>Test steps</b>
              </p>
            </div>
          </div>

          <!-- Right side -->
          <div class="level-right">
            <p class="level-item">
              <b-button type="is-link" @click="addStep()">Add step</b-button>
            </p>
            <p class="level-item">
              <b-button type="is-success" @click="removeStep()">Clear steps</b-button>
            </p>
            <!-- future
              <p class="level-item">
                <b-button type="is-black">Load previous</b-button>
              </p>
            -->
          </div>
        </nav>

        <div class="columns">
          <div class="column is-1">
            <b-field label="Category1" label-position="inside">
              <b-input
                placeholder="FCT"
                v-model="currentStepData.category1"
              >{{currentStepData.category1}}</b-input>
            </b-field>
          </div>
          <div class="column is-2">
            <b-field label="Category2" label-position="inside">
              <b-input
                placeholder="Basic Check"
                v-model="currentStepData.category2"
              >{{currentStepData.category2}}</b-input>
            </b-field>
          </div>
          <div class="column is-9">
            <b-field label="Teststep" label-position="inside">
              <b-input
                placeholder="Power Cycle SSD"
                v-model="currentStepData.step"
              >{{currentStepData.step}}</b-input>
            </b-field>
          </div>

          <div class="column"></div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field label="Description" label-position="inside">
              <b-input
                placeholder="Commnets"
                v-model="currentStepData.description"
              >{{currentStepData.description}}</b-input>
            </b-field>
            <b-field label="Tag" label-position="inside">
              <b-input
                placeholder="add/remove/notuse"
                v-model="currentStepData.tag"
              >{{currentStepData.tag}}</b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Command" label-position="inside">
              <b-input
                placeholder="JBOF telnet"
                v-model="currentStepData.cmd"
                type="textarea"
              >{{currentStepData.cmd}}</b-input>
            </b-field>
          </div>
        </div>

        <b-table
          v-bind:data="currentData.testSteps"
          ref="table"
          pagination-size="is-small"
          v-sortable="sortableOptions"
          draggable
          @dragstart="dragstart"
          @drop="drop"
          @dragover="dragover"
          @dragleave="dragleave"
        >
          <template slot-scope="props_sub">
            <b-table-column
              width="10%"
              field="category1"
              label="TestCase"
            >{{ props_sub.row.category1 }}</b-table-column>
            <b-table-column width="20%" field="category2" label="Test">{{ props_sub.row.category2 }}</b-table-column>
            <b-table-column width="40%" field="step" label="TestStep">{{ props_sub.row.step }}</b-table-column>
            <b-table-column width="10%" field="cmd" label="Command">{{ props_sub.row.cmd }}</b-table-column>
            <b-table-column width="10%" field="tag" label="Tag">{{ props_sub.row.tag }}</b-table-column>
          </template>
        </b-table>
        <!------------------->
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { Sortable } from "sortablejs";
import { EventBus } from "../EventBus";

///////////////////////////////////
// for dragable table
///////////////////////////////////
const createSortable = (el, options, vnode) => {
  return Sortable.create(el, {
    ...options,
    onEnd: function (evt) {
      const data = vnode.context.$data.currentData.testSteps;
      const item = data[evt.oldIndex];
      if (evt.newIndex > evt.oldIndex) {
        for (let i = evt.oldIndex; i < evt.newIndex; i++) {
          data[i] = data[i + 1];
        }
      } else {
        for (let i = evt.oldIndex; i > evt.newIndex; i--) {
          data[i] = data[i - 1];
        }
      }
      data[evt.newIndex] = item;
    },
  });
};

const sortable = {
  name: "sortable",
  bind(el, binding, vnode) {
    const table = el.querySelector("table");
    table._sortable = createSortable(
      table.querySelector("tbody"),
      binding.value,
      vnode
    );
  },
  update(el, binding, vnode) {
    const table = el.querySelector("table");
    table._sortable.destroy();
    table._sortable = createSortable(
      table.querySelector("tbody"),
      binding.value,
      vnode
    );
  },
  unbind(el) {
    const table = el.querySelector("table");
    table._sortable.destroy();
  },
};
///////////////////////////////////

export default {
  name: "app",
  directives: { sortable },
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
      axios.get("http://10.11.11.146:9000/MPFlow/GetAll").then(
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
    toggle(nowFlow) {
      // get Teststeps
      // 수정 해야함 id를 못받고 있음
      console.log(this.currentData.id);
      var tmpTest =
        "http://10.11.11.146:9000/MPFlow/GetMPFlow/" + this.currentData.id;
      axios.get(tmpTest).then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
      this.$refs.mainTable.toggleDetails(nowFlow);
      this.currentData = nowFlow;
      console.log(this.currentData);
      this.currentData.testSteps = [];
    },
    save() {
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
    },
    /*
    switchModify(row) {
      if (this.modifyModeFileinfo == false) {
        this.modifyModeFileinfo = true;
        this.modifyKeyName = "Apply";
      } else {
        // send
        this.modifyModeFileinfo = false;
        this.modifyKeyName = "Modify";
        
        // data 갱신
        this.send_data["data"] = this.mpCurrentData.data[row].fileinfoList;
        
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
    },*/
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
    removeStep: function () {
      this.currentData.testSteps.pop();
    },

    downloadFile(url) {
      // file download
      var link = document.createElement("a");
      link.href = url;
      link.click();
    },

    // table dragable function
    dragstart(payload) {
      this.draggingRow = payload.row;
      this.draggingRowIndex = payload.index;
      payload.event.dataTransfer.effectAllowed = "copy";
    },
    dragover(payload) {
      payload.event.dataTransfer.dropEffect = "copy";
      payload.event.target.closest("tr").classList.add("is-selected");
      payload.event.preventDefault();
    },
    dragleave(payload) {
      payload.event.target.closest("tr").classList.remove("is-selected");
      payload.event.preventDefault();
    },
    drop(payload) {
      payload.event.target.closest("tr").classList.remove("is-selected");
      const droppedOnRowIndex = payload.index;
      let tmp = this.currentData.testSteps[droppedOnRowIndex];
      this.currentData.testSteps[
        droppedOnRowIndex
      ] = this.currentData.testSteps[this.draggingRowIndex];
      this.currentData.testSteps[this.draggingRowIndex] = tmp;
      console.log(this.currentData.testSteps);
    },
    emitCurrentFlowId(_id) {
      console.log("emit!");
      EventBus.$emit("push-msg", _id);
    },
  },
  mounted: function () {
    this.getAllMpflow();
  },
};
</script>