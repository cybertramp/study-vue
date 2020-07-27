<template>
  <div>
    <div class="tab-pane is-active">
      <div class="content">
        <h1>PB Portal</h1>
        <p>FADU 양산용 데이터를 관리하기 위한 포털입니다.</p>
        <h3>목적</h3>
        <p>여러 버전의 데이터 관리를 좀 더 편리하고 단순하게 관리하기 위함에 목적이 있습니다.</p>
        <ul>
          <li>Total size: {{totalSize}} MiB</li>
          <li>CM branches: {{cmBranches}}</li>
          <li>Total files: {{totalFiles}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
//import axios from "axios";
//import ping from "ping";
export default {
  name: "app",
  data: function () {
    return {
      totalSize: 0,
      cmBranches: 0,
      totalFiles: 0,
    };
  },
  methods: {},
  mounted: function () {},
};
</script>