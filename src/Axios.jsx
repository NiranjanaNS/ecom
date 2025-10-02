import axios from "axios";

const Axios = axios.create ({
    baseURL:"http://13.51.121.100/api",
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
})
export default Axios
