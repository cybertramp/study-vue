<template>
  <div>
    <!-- mini menu -->
    <section>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="title is-1">Create MP Flow</p>
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
            <b-button type="is-link" tag="router-link" to="/mp-history">Back</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-success">Save</b-button>
          </p>
          <p class="level-item">
            <b-button type="is-black">Delete</b-button>
          </p>
        </div>
      </nav>
      <!-- content -->
      <div class="columns">
        <div class="column is-3">
          <b-field label="MP Flow name">
            <b-input placeholder="unigen MP v1"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="File Data">
            <b-select placeholder="Select a branch" v-model="selected" :options="branches"></b-select>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="CM Site">
            <b-input placeholder="exicon / unigen"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Nand Type">
            <b-input placeholder="BiCS3 / B27A"></b-input>
          </b-field>
        </div>
        <div class="column"></div>
      </div>
      <div class="columns">
        <div class="column is-3">
          <b-field label="Select a date">
            <b-datepicker placeholder="Click to select..." trap-focus></b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Description">
            <b-input placeholder="Updated..."></b-input>
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
      <b-table v-bind:data="flow_data.testSteps" ref="table">
        <template slot-scope="props">
          <b-table-column field="category1" label="TestCase">{{ props.row.category1 }}</b-table-column>
          <b-table-column field="category2" label="Test">{{ props.row.category2 }}</b-table-column>
          <b-table-column field="step" label="TestStep">{{ props.row.step }}</b-table-column>
          <b-table-column field="cmd" label="Command">{{ props.row.cmd }}</b-table-column>
          <b-table-column field="tag" label="Tag">{{ props.row.tag }}</b-table-column>
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
      flow_data: {
        mpName: "testtest",
        branchName: "",
        nandType: "b27a",
        cmSite: "unigen",
        date: "",
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
      }
    };
  },
  methods: {
    getBranches: function() {
      axios.get("http://10.11.11.146:9000/MPFlow/GetAllWithFilinfo").then(
        response => {
          console.log(Object.keys(response.data.data).length.toString());
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
      this.flow_data.testSteps.push(this.inputData);
    }
  },
  mounted: function() {
    this.getBranches();
    console.log(this.branches);
  }
};
</script>