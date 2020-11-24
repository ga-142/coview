const axios = require("axios").default;

const apiClient = axios.create({
  baseURL: `https://api.covidtracking.com`, //for local development
  withCredentials: false // This is the default
});

export default {
  getState(state: string) {
    return apiClient.get(`/v1/states/${state}/daily.json`);
  },
  getUSA() {
    return apiClient.get(`/v1/us/daily.json`);
  }
};
