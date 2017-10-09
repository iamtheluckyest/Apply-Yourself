import axios from "axios";

export default {
    getSchools: function(query) {
        return axios.get(query);
    },
    getSchoolById : function(query) {
        return axios.get(query)
    },
    addSchool: function(queryObj) {
        return axios(queryObj)
    },
    deleteSchool: function(queryObj) {
        return axios(queryObj)
    },
    setDefaultCollegeReqs: function(queryObj) {
        return axios(queryObj)
    },
    setDefaultAppPrefs: function(queryObj) {
        return axios(queryObj)
    }
}
