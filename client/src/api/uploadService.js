import axios from "axios";

export default class UploadService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL, //http://localhost:3001/api/
      withCredentials: true
    });
  }

  uploadProfile = async payload => {
    const { data } = await this.service.post("/upload/profile-photo", payload);
    return data;
  };
}
