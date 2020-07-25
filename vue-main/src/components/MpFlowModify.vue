<template>
  <div class="container">
    <!-- mini menu -->
    <section>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="title is-1">Modify MP Flow</p>
          </div>
        </div>
      </nav>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="title is-3">Flow information</p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button type="is-link" tag="router-link" to="/mpflow">Back</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-success">Save</b-button>
          </p>
        </div>
      </nav>
      <!-- content -->
      <div class="columns">
        <div class="column is-2" v-if="isLoaded">
          <b-field label="File Data">
            <p>{{flow_data.branchName}}</p>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field label="Updated date">
            <b-datetimepicker v-model="flow_data.date" placeholder="Click to select...">
              <template slot="left">
                <button class="button is-primary" @click="datetime = new Date()">
                  <b-icon icon="clock"></b-icon>
                  <span>Now</span>
                </button>
              </template>
              <template slot="right">
                <button class="button is-danger" @click="datetime = null">
                  <b-icon icon="close"></b-icon>
                  <span>Clear</span>
                </button>
              </template>
            </b-datetimepicker>
          </b-field>
        </div>

        <div class="column is-2">
          <b-field label="CM Site">
            <b-input placeholder="exicon / unigen" v-model="flow_data.cmSite"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Nand Type">
            <b-input placeholder="BiCS3 / B27A" v-model="flow_data.nandType"></b-input>
          </b-field>
        </div>
        <div class="column"></div>
      </div>
      <div class="columns">
        <div class="column is-one-quarter">
          <b-field label="MP Flow name">
            <b-input placeholder="unigen MP v1" v-model="flow_data.mpName"></b-input>
          </b-field>
        </div>
        <div class="column is-three-quarters">
          <b-field label="Description">
            <b-input placeholder="Updated..." v-model="flow_data.description"></b-input>
          </b-field>
        </div>
        <div class="column"></div>
      </div>
      <hr />
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="title is-3">
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
            <b-button type="is-success">Clear</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-black">Load previous</b-button>
          </p>
        </div>
      </nav>

      <div class="columns">
        <div class="column is-1">
          <b-field label="Category1" label-position="inside">
            <b-input placeholder="FCT" v-model="inputData.category1">{{inputData.category1}}</b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Category2" label-position="inside">
            <b-input placeholder="Basic Check" v-model="inputData.category2">{{inputData.category2}}</b-input>
          </b-field>
        </div>
        <div class="column is-6">
          <b-field label="Teststep" label-position="inside">
            <b-input placeholder="Power Cycle SSD" v-model="inputData.step">{{inputData.step}}</b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Command" label-position="inside">
            <b-input placeholder="JBOF telnet" v-model="inputData.cmd">{{inputData.cmd}}</b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Tag" label-position="inside">
            <b-input placeholder="add/remove/notuse" v-model="inputData.tag">{{inputData.tag}}</b-input>
          </b-field>
        </div>
      </div>
      <!-- table -->
      <b-table
        :data="flow_data.testSteps"
        ref="table"
        pagination-size="is-small"
        v-sortable="sortableOptions"
        draggable
        @dragstart="dragstart"
        @drop="drop"
        @dragover="dragover"
        @dragleave="dragleave"
      >
        <template slot-scope="props">
          <b-table-column width="10%" field="category1" label="TestCase">{{ props.row.category1 }}</b-table-column>
          <b-table-column width="20%" field="category2" label="Test">{{ props.row.category2 }}</b-table-column>
          <b-table-column width="50%" field="step" label="TestStep">{{ props.row.step }}</b-table-column>
          <b-table-column width="10%" field="cmd" label="Command">{{ props.row.cmd }}</b-table-column>
          <b-table-column width="10%" field="tag" label="Tag">{{ props.row.tag }}</b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { Sortable } from "sortablejs";
const createSortable = (el, options, vnode) => {
  return Sortable.create(el, {
    ...options,
    onEnd: function(evt) {
      const data = vnode.context.$data.flow_data.testSteps;
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
    }
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
  }
};

export default {
  name: "app",
  directives: { sortable },
  data: function() {
    return {
      sortableOptions: {
        chosenClass: "is-selected"
      },
      flow_data: {
        mpName: "noName",
        branchName: "",
        nandType: "",
        cmSite: "",
        date: new Date(),
        description: "",
        testSteps: []
      },
      branches: [],
      inputData: {
        category1: "",
        category2: "",
        step: "",
        cmd: "",
        tag: ""
      },
      isLoaded: false,
      selcetedBranch: "",
      isChangedTable: false
    };
  },
  methods: {
    getBranches: function() {
      axios.get("http://10.11.11.146:9000/MPFlow/GetAllWithFilinfo").then(
        response => {
          console.log(Object.keys(response.data.data).length.toString());
          this.isLoaded = true;
          var i;
          for (i = 0; i < Object.keys(response.data.data).length; i++) {
            this.branches[i] = response.data.data[i].mpName;
          }
          console.log(this.branches);
        },
        error => {
          console.log(error);
        }
      );
    },
    addStep: function() {
      console.log(this.inputData);
      if (
        this.inputData.category1 != "" &&
        this.inputData.category2 != "" &&
        this.inputData.step != ""
      ) {
        var tmp = this.inputData;
        this.flow_data.testSteps.push({
          category1: tmp.category1,
          category2: tmp.category2,
          step: tmp.step,
          cmd: tmp.cmd,
          tag: tmp.tag
        });
        console.log(this.inputData);
      }
    },
    selectedItem: function() {
      console.log(this.selcetedBranch);
      let _tmp = this.selcetedBranch.split("_");
      let _cmsite = _tmp[1];
      let _date = new Date(
        _tmp[0].substr(0, 4),
        _tmp[0].substr(4, 2) - 1,
        _tmp[0].substr(6, 2)
      );

      this.flow_data.cmSite = _cmsite;
      this.flow_data.date = _date;
      console.log(_cmsite, _date);
      console.log(this.flow_data);
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
      let tmp = this.flow_data.testSteps[droppedOnRowIndex];
      this.flow_data.testSteps[droppedOnRowIndex] = this.flow_data.testSteps[
        this.draggingRowIndex
      ];
      this.flow_data.testSteps[this.draggingRowIndex] = tmp;
      console.log(this.flow_data.testSteps);
      this.isChangedTable = true;
      //this.$refs.table.reload();
      // this.$buefy.toast.open(
      //   `Moved ${this.draggingRow.first_name} from row ${this.draggingRowIndex +
      //     1} to ${droppedOnRowIndex + 1}`
      // );
    }
  },
  created: function() {
    this.getBranches();
  }
};
</script>