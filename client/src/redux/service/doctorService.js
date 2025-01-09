import axios from "axios";
const API_URL = "/api/doctor";
const getDoctors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createDoctor = async (row, config) => {
  const response = await axios.post(API_URL, row, config);
  return await response.data;
};
const deleteDoctor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};

const doctorService = {
  createDoctor,
  getDoctors,
  deleteDoctor,
};
export default doctorService;
