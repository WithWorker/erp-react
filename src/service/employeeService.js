import axios from 'axios';

const API_URL = '/api/employees';

export const fetchEmployees = async () => {
  return await axios.get(API_URL);
};
