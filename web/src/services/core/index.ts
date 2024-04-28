

import { ApiData, axiosInstance } from '../axios';
const apiInstance = axiosInstance(`${process.env.NEXT_PUBLIC_API_URL || ""}/api`);

export const API: ApiData = {
  post(endpoint, formData, config) {
    return apiInstance.post(endpoint, formData, config);
  },

  put(endpoint, formData, config) {
    return apiInstance.put(endpoint, formData, config);
  },

  patch(endpoint, formData, config) {
    return apiInstance.patch(endpoint, formData, config);
  },

  get(endpoint, config) {
    return apiInstance.get(endpoint, config);
  },

  delete(endpoint, config) {
    return apiInstance.delete(endpoint, config);
  },
};