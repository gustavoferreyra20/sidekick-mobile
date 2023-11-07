import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIDEKICK_API } from "@env";

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        return data;
    } catch (e) {
        // error reading value
    }
};

const axiosInstance = axios.create({
    baseURL: SIDEKICK_API, // Replace with your API base URL
    timeout: 5000, // Set your desired timeout
});

// Add a request interceptor to set the token in the headers
axiosInstance.interceptors.request.use(
    async (config) => {
        const data = await getData(); // Get the token from AsyncStorage
        if (data) {
            config.headers.Authorization = `Bearer ${data.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;