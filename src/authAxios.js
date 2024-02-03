import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://api.flybet9.com/api",
});

export default customAxios;
