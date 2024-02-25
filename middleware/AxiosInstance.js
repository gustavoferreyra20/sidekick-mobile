import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
;

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        return data;
    } catch (error) {
        console.error('Error reading AsyncStorage data:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
};

const AxiosInstance = axios.create({
    baseURL: 'https://sidekick-server-nine.vercel.app/api/', // Replace with your API base URL
    timeout: 5000, // Set your desired timeout
});

// Add a request interceptor to set the token in the headers
AxiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const data = await getData(); // Get the token from AsyncStorage
            if (data) {
                config.headers.Authorization = `Bearer ${data.token}`;
            }
            return config;
        } catch (error) {
            console.error('Error setting Authorization header:', error);
            return Promise.reject(error); // Reject the request with the caught error
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;