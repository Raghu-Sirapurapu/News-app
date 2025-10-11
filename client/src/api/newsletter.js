import axios from './axios'; // uses baseURL: http://localhost:5000/api

// Get all newsletters
const getAllNewsletters = async () => {
  return await axios.get('/newsletters');
};

// Get a newsletter by ID
 const getNewsletterById = async (id) => {
  return await axios.get(`/newsletters/${id}`);
};

// Create a new newsletter 
 const createNewsletter = async (formData, token) => {
  return await axios.post('/newsletters/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update a newsletter 
 const updateNewsletter = async (id, updatedData, token) => {
  return await axios.put(`/newsletters/update/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete a newsletter 
 const deleteNewsletter = async (id, token) => {
  return await axios.delete(`/newsletters/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
 const getMySubmissions = async (token, id) => {
  return await axios.get(`/newsletters/my-submissions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export{
    getAllNewsletters,
    getNewsletterById,
    createNewsletter,
    updateNewsletter,
    deleteNewsletter,
    getMySubmissions
}