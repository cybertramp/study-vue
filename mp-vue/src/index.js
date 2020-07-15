//import Vue from 'vue';
//import SuiVue from 'semantic-ui-vue';
//import $ from 'jquery';

//import Vue from 'vue'
//import VueMaterial from 'vue-material'
//import 'vue-material/dist/vue-material.min.css'

//Vue.use(VueMaterial.default)

export default {
    name: 'app',
    data: function () {
        return {
            data_head: ["Target", "NandType", "CM-Site", "Update", "Version", "SHA1", "Description", "Remark", "FilePath"],
            data: []
        }
    },
    methods: {
        getInfo: function () {
            // using JSONPlaceholder
            const baseURI = 'http://10.11.11.146:9000/Fileinfo/GetAllList';
            this.$http.get(`${baseURI}/posts`)
                .then((result) => {
                    console.log(result)
                    this.data = result.data
                    console.log(this.data)
                })
        }

    },
    beforeMount() {
        this.getUnits()
    }
}