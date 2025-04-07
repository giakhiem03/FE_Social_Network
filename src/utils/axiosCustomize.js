import axios from "axios";
import NProgress from "nprogress";
import store from "../store";

NProgress.configure({
    showSpinner: true,
    trickleSpeed: 100,
});

const instance = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true,
});
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        const access_token = store?.getState()?.user?.access_token;

        config.headers["Authorization"] = `Bearer ${access_token}`;

        NProgress.start();

        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        NProgress.done();

        // Trả về dữ liệu nếu có
        return response && response.data ? response.data : response;
    },
    function (error) {
        //token expired
        if (error.response.data && error.response.data.EC === -999) {
            window.location.href("/login");
        }

        NProgress.done();

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error && error.response && error.response.data
            ? Promise.reject(error.response.data)
            : Promise.reject(error);
    }
);

export default instance;
