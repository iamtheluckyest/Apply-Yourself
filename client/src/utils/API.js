import axios from "axios";

export default {
    getSchools: function(query) {
        return axios.get(query);
    },
    addSchool: function(queryObj) {
        console.log("adding school")
        return axios(queryObj)
    }
}
