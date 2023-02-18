import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL_DEV } from '../utils/constants';
import { useNavigate } from 'react-router';

type RegistrationFormData = {
  username: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(API_BASE_URL_DEV + '/auth/register', formData);
      if (response.status === 200) {
        navigate('/profile')
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleGoogleRegistration = async () => {
    try {
      const response = await axios.get('/api/google-auth');
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Register'}
      </button>
      <button type="button" onClick={handleGoogleRegistration}>
        Register with Google
      </button>
    </form>
  );
};

export default RegistrationForm;
