import axios from 'axios';
import router from './router';
import { useToastStore, useAuthStore } from './stores';



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
     const auth = useAuthStore()
     
    if (error.response?.status === 401) {
      auth.clearSession()

      if (router.currentRoute.value.path !== '/login') {
        router.replace('/login')
      }
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
    if(error.response?.status === 500){
            const item = error.response.data.errors;
            let errors = "";
            for (const key in item) {
                errors += `${item[key]}`;
                break
            }
    
            toast.show('Internal Server Error', 'error');
    }
 
    return Promise.reject(error);
  }
);

export default apiClient;
