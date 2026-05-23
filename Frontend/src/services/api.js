import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:5000/api"

});


// TOKEN

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if(token){

    req.headers.Authorization =
      `Bearer ${token}`;

  }

  return req;

});


// AUTH 

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getuser = () =>
  API.get("/auth/me");


//PROPERTIES

export const getProperties = () =>
  API.get("/properties");

export const getSingleProperty = (id) =>
  API.get(`/properties/${id}`);

export const createProperty = (data) =>
  API.post("/properties", data);

export const updateProperty = (id, data) =>
  API.put(`/properties/${id}`, data);

export const deleteProperty = (id) =>
  API.delete(`/properties/${id}`);

export const getFeaturedProperties = () =>
  API.get("/properties/featured");

// DASHBOARD

export const getDashboardData = () =>
  API.get("/dashboard/admin");


// INQUIRIES 
export const createInquiry = (data) =>
  API.post("/inquiries", data);

export const getAllInquiries = () =>
  API.get("/inquiries/admin");

export const deleteInquiry = (id) =>
  API.delete(`/inquiries/${id}`);

//UPLOADIMAGE
export const uploadImage = (formData) =>
API.post("/upload", formData);

//PROPERTY
export const getPendingProperties = () =>
  API.get("/admin/pending-properties");

export const approveProperty = (id) =>
  API.put(`/admin/approve-property/${id}`);

export const rejectProperty = (id) =>
  API.delete(`/admin/reject-property/${id}`);

export const featureProperty = (id) =>
  API.put(`/admin/feature-property/${id}`);

export default API;