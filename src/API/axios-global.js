import axios from 'axios'


const adminAPI = axios.create({
    baseURL: "http://localhost:3500/admin",
})

adminAPI.defaults.withCredentials = true

const clientAPI = axios.create({
    baseURL: "http://localhost:3500/client",
})
export {adminAPI , clientAPI}