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
      <b-tabs>
        <b-tab-item label="Property">
          <!-- Default -->
          <section v-if="!activeModifyProperty">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <p class="title is-4">
                    <b>Flow Property</b>
                  </p>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
                <b-button type="is-light" @click="modifyProperty()">Modify</b-button>
              </div>
            </nav>
            <div class="container">
              <div class="notification">
                <b-field horizontal label="MP Flow name: ">{{currentData.data.mpName}}</b-field>
                <b-field horizontal label="File Branch path: ">{{currentData.data.branchName}}</b-field>
                <b-field horizontal label="Nand Type">{{currentData.data.nandType}}</b-field>
                <b-field horizontal label="CM Site: ">{{currentData.data.cmSite}}</b-field>
                <b-field horizontal label="Updated Date: ">{{currentData.data.date}}</b-field>
                <b-field horizontal label="Description: ">{{currentData.data.description}}</b-field>
              </div>
            </div>
          </section>
          <!-- Modify Section -->
          <section v-if="activeModifyProperty">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <p class="title is-4">
                    <b>Modify Property</b>
                  </p>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
                <p class="level-item">
                  <b-button type="is-light" @click="modifyProperty()">Save</b-button>
                </p>
                <p class="level-item">
                  <b-button
                    type="is-light"
                    @click="activeModifyProperty = !activeModifyProperty;"
                  >Close</b-button>
                </p>
              </div>
            </nav>
            <b-field horizontal label="MP Flow name: ">
              <b-input v-model="currentData.data.mpName"></b-input>
            </b-field>
            <b-field horizontal label="File Branch path: ">
              <b-input v-model="currentData.data.branchName"></b-input>
            </b-field>
            <b-field horizontal label="Nand Type">
              <b-input v-model="currentData.data.nandType"></b-input>
            </b-field>
            <b-field horizontal label="CM Site: ">
              <b-input v-model="currentData.data.cmSite"></b-input>
            </b-field>
            <b-field horizontal label="Updated Date: ">
              <b-input v-model="currentData.data.date"></b-input>
            </b-field>
            <b-field horizontal label="Description: ">
              <b-input v-model="currentData.data.description"></b-input>
            </b-field>
          </section>
        </b-tab-item>

        <b-tab-item label="Test step">
          <!-- Default -->
          <section v-if="!activeModifyTestStep">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <p class="title is-4">
                    <b>Flow Steps</b>
                  </p>
                </div>
              </div>

              <div class="level-right">
                <p class="level-item">
                  <b-button type="is-light" @click="modifyStep()">Modify</b-button>
                </p>
              </div>
            </nav>
            <br />
            <b-table v-bind:data="testSteps" checkable>
              <template slot-scope="props">
                <b-table-column
                  field="category1"
                  label="Category1"
                  width="5%"
                >{{ props.row.category1 }}</b-table-column>
                <b-table-column
                  field="category2"
                  label="Category2"
                  width="10%"
                >{{ props.row.category2 }}</b-table-column>
                <b-table-column field="step" label="Step" width="35%">{{ props.row.step }}</b-table-column>
                <b-table-column field="cmd" label="Commands">{{ props.row.cmd }}</b-table-column>
                <b-table-column field="tag" label="Tags" width="5%">{{ props.row.tag }}</b-table-column>
              </template>
            </b-table>
          </section>
          <!-- Modify section -->
          <section v-if="activeModifyTestStep">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <p class="title is-4">
                    <b>Modify flow</b>
                  </p>
                </div>
              </div>

              <div class="level-right">
                <p class="level-item">
                  <b-button type="is-light" @click="addStep()">Add Step</b-button>
                </p>
                <p class="level-item">
                  <b-button type="is-light" @click="removeLastStep()">Remove Last Step</b-button>
                </p>
                <p class="level-item">
                  <b-button type="is-light" @click="saveStep()">Save</b-button>
                </p>
                <p class="level-item">
                  <b-button
                    type="is-light"
                    @click="activeModifyTestStep = !activeModifyTestStep;"
                  >Close</b-button>
                </p>
              </div>
            </nav>
            <br />
            <div class="columns">
              <div class="column is-1">
                <b-field label="Category1" label-position="inside">
                  <b-input
                    placeholder="FCT"
                    v-model="inputStepData.category1"
                  >{{inputStepData.category1}}</b-input>
                </b-field>
              </div>
              <div class="column is-2">
                <b-field label="Category2" label-position="inside">
                  <b-input
                    placeholder="Basic Check"
                    v-model="inputStepData.category2"
                  >{{inputStepData.category2}}</b-input>
                </b-field>
              </div>
              <div class="column is-9">
                <b-field label="Teststep" label-position="inside">
                  <b-input
                    placeholder="Power Cycle SSD"
                    v-model="inputStepData.step"
                  >{{inputStepData.step}}</b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Description" label-position="inside">
                  <b-input
                    placeholder="Commnets"
                    v-model="inputStepData.description"
                  >{{inputStepData.description}}</b-input>
                </b-field>
                <b-field label="Tag" label-position="inside">
                  <b-input
                    placeholder="add/remove/notuse"
                    v-model="inputStepData.tag"
                  >{{inputStepData.tag}}</b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Command" label-position="inside">
                  <b-input
                    placeholder="JBOF telnet"
                    type="textarea"
                    v-model="inputStepData.cmd"
                  >{{inputStepData.cmd}}</b-input>
                </b-field>
              </div>
            </div>
            <br />
            <b-table
              :data="testSteps"
              draggable
              v-sortable="sortableOptions"
              @dragstart="dragstart"
              @drop="drop"
              @dragover="dragover"
              @dragleave="dragleave"
            >
              <template slot-scope="props">
                <b-table-column
                  field="category1"
                  label="Category1"
                  width="5%"
                >{{ props.row.category1 }}</b-table-column>
                <b-table-column
                  field="category2"
                  label="Category2"
                  width="10%"
                >{{ props.row.category2 }}</b-table-column>
                <b-table-column field="step" label="Step" width="35%">{{ props.row.step }}</b-table-column>
                <b-table-column field="cmd" label="Commands">{{ props.row.cmd }}</b-table-column>
                <b-table-column field="tag" label="Tags" width="5%">{{ props.row.tag }}</b-table-column>
              </template>
            </b-table>
          </section>
        </b-tab-item>

        <b-tab-item label="Files">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="title is-4">
                  <b>Flow Files</b>
                </p>
              </div>
            </div>

            <div class="level-right">
              <div class="level-item">
                <p class="subtitle is-5">
                  <strong>{{Object.keys(currentData.data.fileinfoList).length.toString()}}</strong>
                  Files
                </p>
              </div>
            </div>
          </nav>
          <b-table v-bind:data="currentData.data.fileinfoList">
            <template slot-scope="props">
              <b-table-column
                field="filePath"
                label="File Path"
                sortable
                width="50%"
              >{{ props.row.filePath }}</b-table-column>
              <b-table-column field="sha1" label="Sha1" width="30%">{{ props.row.sha1 }}</b-table-column>
              <b-table-column field="version" label="Version" width="5%">{{ props.row.version }}</b-table-column>
              <b-table-column
                field="description"
                label="Description"
                sortable
                width="15%"
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
import { Sortable } from "sortablejs";

///////////////////////////////////
// for dragable table
///////////////////////////////////
const createSortable = (el, options, vnode) => {
  return Sortable.create(el, {
    ...options,
    onEnd: function (evt) {
      const data = vnode.context.$data.testSteps;
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
      activeModifyProperty: false,
      activeModifyTestStep: false,
      activeModifyFiles: false,
      currentId: "",
      currentData: {},
      testSteps: [],
      inputStepData: {
        category1: "",
        category2: "",
        step: "",
        cmd: "",
        fileinfoShaList: [""],
        tag: "",
        description: "",
      },
      draggingRow: null,
      draggingRowIndex: null,
    };
  },
  methods: {
    onCurrentFlowId() {
      console.log("Message recieved");
      EventBus.$on("push-msg", (payload) => {
        //received data
        this.currentId = payload;

        var url = "http://10.11.11.146:9000/MPFlow/GetMPFlow/" + this.currentId;

        axios.get(url).then(
          (response) => {
            this.currentData = response.data;

            url =
              "http://10.11.11.146:9000/MPFlow/GetTestSteps/" + this.currentId;
            axios.get(url).then(
              (response2) => {
                this.testSteps = response2.data.data;
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
    addStep() {
      if (
        this.inputStepData.category1 != "" &&
        this.inputStepData.category2 != "" &&
        this.inputStepData.step != ""
      ) {
        const tmp = this.inputStepData;
        this.testSteps.push({
          category1: tmp.category1,
          category2: tmp.category2,
          step: tmp.step,
          cmd: tmp.cmd.split(","),
          fileinfoShaList: tmp.fileinfoShaList,
          tag: tmp.tag,
          description: tmp.description,
        });
        this.$buefy.toast.open({
          message: `${this.testSteps.length.toString()}행에 ${
            tmp.category1
          } - ${tmp.category2} - ${tmp.step}가 추가되었습니다.`,
          position: "is-bottom",
          duration: 1000,
        });
      } else {
        this.$buefy.toast.open(`데이터 필드가 비어있습니다.`);
      }
    },
    modifyStep() {
      this.activeModifyTestStep = !this.activeModifyTestStep;
    },
    modifyProperty() {
      var wrapMpFlow = {
        id: this.currentId,
        mpName: this.currentData.data.mpName,
        nandType: this.currentData.data.nandType,
        cmSite: this.currentData.data.cmSite,
        date: this.currentData.data.date,
        description: this.currentData.data.description,
      };

      axios
        .post("http://10.11.11.146:9000/MPFlow/ModifyMPFlow", wrapMpFlow)
        .then(
          (response) => {
            this.$buefy.toast.open({
              message: `Flow 속성이 수정되었습니다. \n${response.data}`,
              position: "is-bottom",
              duration: 1000,
            });
          },
          (error) => {
            console.log(error);
          }
        );

      this.activeModifyProperty = !this.activeModifyProperty;
    },
    saveStep() {
      this.activeModifyTestStep = !this.activeModifyTestStep;

      this.$buefy.toast.open({
        message: `현재 ${this.currentData.data.mpName}의 Test steps가 수정되었습니다.`,
        position: "is-bottom",
        duration: 1000,
      });
      var wrapTestSteps = {
        mpFlowId: this.currentId,
        data: this.testSteps,
      };

      axios
        .post("http://10.11.11.146:9000/MPFlow/ModifyTestSteps", wrapTestSteps)
        .then(
          (response) => {
            console.log("normal sended: " + response.data);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    removeLastStep() {
      this.testSteps.pop();
      this.$buefy.toast.open({
        message: `${this.testSteps.length.toString()}행에 ${
          this.testSteps[this.testSteps.length - 1].category1
        } - ${this.testSteps[this.testSteps.length - 1].category2} - ${
          this.testSteps[this.testSteps.length - 1].step
        }이 제거되었습니다.`,
        position: "is-bottom",
        duration: 1000,
      });
    },

    ///////////////////////////////////
    // for dragable table - table dragable function
    ///////////////////////////////////
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
      const tmp = this.testSteps[droppedOnRowIndex];
      this.testSteps[droppedOnRowIndex] = this.testSteps[this.draggingRowIndex];
      this.testSteps[this.draggingRowIndex] = tmp;
    },
    ///////////////////////////////////
  },
  mounted: function () {
    this.onCurrentFlowId();
  },
  beforeDestroy: function () {
    EventBus.$off("push-msg");
  },
};
</script>