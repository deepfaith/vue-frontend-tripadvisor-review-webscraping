import http from "../http-common";

class DataService {
  create(data) {
    return http.post("/restaurants", data);
  }
}

export default new DataService();
