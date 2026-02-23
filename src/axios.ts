import axios from 'axios';
import router from './router';
import { useToastStore } from './stores';



const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/core/v1/",
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem("rtl-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
     const toast = useToastStore();
    if (error.response?.status === 401) {
      router.push('/login');
    }

    if(error.response?.status === 422){
            const item = error.response.data.errors;
            let errors = "";
            for (const key in item) {
                errors += `${item[key]}`;
                break
            }
    
            toast.show(errors|| 'Validation error', 'error');
    }
 
    return Promise.reject(error);
  }
);

export default apiClient;
