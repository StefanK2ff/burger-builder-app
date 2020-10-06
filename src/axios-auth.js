import axios from "axios";

const authInstance = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1"
})

export default authInstance