
import api from './api';

export interface VitalRecord {
  id: string;
  userId: string;
  type: 'weight' | 'blood_pressure' | 'blood_sugar' | 'water_intake';
  value: number | { systolic: number; diastolic: number };
  unit: string;
  date: string;
}

export interface VitalsHistoryResponse {
  raw: VitalRecord[];
  formatted: {
    weight?: { date: string; value: number }[];
    blood_pressure?: { date: string; systolic: number; diastolic: number }[];
    blood_sugar?: { date: string; value: number }[];
    water_intake?: { date: string; value: number }[];
  };
}

const vitalsService = {
  getAllVitals: async (): Promise<VitalRecord[]> => {
    const response = await api.get('/vitals');
    return response.data;
  },
  
  getVitalsByUserId: async (userId: string): Promise<VitalRecord[]> => {
    const response = await api.get(`/vitals/user/${userId}`);
    return response.data;
  },
  
  getVitalsHistory: async (userId: string, type?: string): Promise<VitalsHistoryResponse> => {
    const url = type 
      ? `/vitals/history/${userId}?type=${type}`
      : `/vitals/history/${userId}`;
    
    const response = await api.get(url);
    return response.data;
  },
  
  addVital: async (vitalData: Partial<VitalRecord>): Promise<VitalRecord> => {
    const response = await api.post('/vitals', vitalData);
    return response.data;
  }
};

export default vitalsService;
