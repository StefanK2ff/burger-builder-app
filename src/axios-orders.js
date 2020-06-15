import axios from "axios";

const orderInstance = axios.create({
    baseURL: "https://react-burger-builder-bcb0f.firebaseio.com/"
})

export default orderInstance