import {
    baseUrl,
    getDashboard
} from "../../config"
import axios from "axios";


class ResourceListService {
    constructor(baseUrl) {
      this.basePath = "/dashboard/data";
      this.baseUrl = `${baseUrl}${this.basePath}`;
    }

    getDashboard(){
        return axios(getDashboard(this.baseUrl));
    }

}

export default new ResourceListService(baseUrl);
