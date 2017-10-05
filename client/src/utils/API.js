import axios from "axios";

export default {
    getSchools: function(query) {
        return axios.get(query);
    }
}
