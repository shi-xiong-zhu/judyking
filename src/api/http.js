import router from "@/router";
import axios from "axios"
import { Notify } from 'vant';

let http = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://backend-api-01.newbee.ltd/api/v1' : "/api/v1"
})

http.interceptors.request.use(function(config) {
    config.headers.token = localStorage.getItem('xftoken')
    return config
}, function(err) {
    return Promise.reject(err)
});

http.interceptors.response.use(function(response) {
        let data = response.data
        if (data.resultCode !== 200) {
            if (data.message.includes("已存在")) {
                Notify({ type: "danger", message: data.message || "用户已存在" })
            }

            if (data.resultCode == 416) {
                if (router.currentRoute.path != "/login") {
                    router.push("/login?needback=1")
                }
            }
            return Promise.reject(response.data)
        }
        return response.data
    },
    function(err) {
        return Promise.reject(err);
    })

export default http