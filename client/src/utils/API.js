import axios from "axios";

export default {
    getschoolName: function() {
      return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3,4&_fields=id,school.name&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getschoolId: function() {
      return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools?id=164924&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getschoolLocation: function() {
      return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3,4&_fields=id,school.name,school.state&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getunderGraduatePopulation: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,2015.student.size&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getgraduatePopulation: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3,4&_fields=id,school.name,school.state,2015.student.grad_students&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getinStateTuition: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,school.state,2015.cost.tuition.in_state&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getoutStateTuition: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,school.state,2015.cost.tuition.out_of_state&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getscompletionRate2: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,school.state,2015.completion.completion_rate_less_than_4yr_150nt&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getcompletionRate4: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,school.state,2015.completion.completion_rate_4yr_150nt&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getsalary6: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,school.state,2013.earnings.6_yrs_after_entry.working_not_enrolled.overall&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getsalary10: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,school.state,2013.earnings.10_yrs_after_entry.working_not_enrolled.overall&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    },
    getaverageSAT: function() {
        return axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,school.state,2015.admissions.sat_scores.average.by_ope_id&api_key=S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8");
    }
  };
