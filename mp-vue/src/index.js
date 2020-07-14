import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import $ from 'jquery';

Vue.use(SuiVue);

const getBreeds = async () => {
    try {
      return await axios.get('http://localhost:9000/Fileinfo/GetAllList');
    } catch (error) {
      console.error(error);
    }
  };

t=getBreeds()
console.log(t)