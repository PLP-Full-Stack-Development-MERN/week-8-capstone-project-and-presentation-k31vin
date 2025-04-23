
import api from './api';

export interface Resource {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  content: string;
  author: string;
  publishDate: string;
}

const resourceService = {
  getAllResources: async (): Promise<Resource[]> => {
    const response = await api.get('/resources');
    return response.data;
  },
  
  getResourcesByCategory: async (category: string): Promise<Resource[]> => {
    const response = await api.get(`/resources/category/${category}`);
    return response.data;
  },
  
  getResourceById: async (id: string): Promise<Resource> => {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  }
};

export default resourceService;
