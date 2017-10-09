import axios from "axios";
import Auth from "../Auth.js";

const authHeader = {'Authorization' : `bearer ${Auth.getToken()}`}

export default {
    getSchools: function(query) {
        return axios.get(query);
    },
    getSchoolById : function(query) {
        return axios.get(query)
    },
    addSchool: function(id) {
        return axios({
            method: "post",
            url: "/user/college",
            headers: authHeader,
            data: {
                collegeApiId: id
            }
        })
    },
    deleteSchool: function(collegeId) {
        return axios({
            method: "delete",
            url: "/user/college",
            headers: authHeader,
            data: {
                collegeId: collegeId
            }
        })
    },
    setDefaultCollegeReqs: function(notePrefs) {
        return axios({
            method: "post",
            url: "/user/default_notes",
            headers: authHeader,
            data: {
                noteFields: notePrefs
            }
        })
    },
    setDefaultAppPrefs: function(appPrefs) {
        return axios({
            method: "post",
            url: "/user/default_requirements",
            headers: authHeader,
            data: {
                appRequirements: appPrefs
            }    
        })
    },
    getUser: function() {
        return axios({
            method : "get",
            url : '/user',
            headers: authHeader
        })
    },
    updateNote: function(queryObj) {
        return axios({
            method: "put",
            url: "/user/note",
            data: queryObj,
            headers: authHeader
        })
    }
}
