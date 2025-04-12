import axios from 'axios';

export const checkUser = async (userName) => {
  const res = await axios.get('http://localhost:8000/check_user/', {
    params: { user_name: userName }
  });
  return res.data;
};

export const uploadItem = async (userName, file) => {
  const formData = new FormData();
  formData.append('user_name', userName);
  formData.append('image', file);
  const res = await axios.post('http://localhost:8000/upload_wardrobe/', formData);
  return res.data;
};
