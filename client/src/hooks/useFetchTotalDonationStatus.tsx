import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  userId?: number;
  email?: string;
  role?: string;
  password?: string;
};

const useFetchTotalDonationStatus = () => {
  const [totalDonationStatus, setTotalDonationStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const decodedToken: DecodedToken | null = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId;

  useEffect(() => {
    const fetchTotalDonationStatus = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is missing.');
        }
        const res = await axios.get(
          `http://localhost:3000/api/restaurant/viewTotalDonationStatus/${userId}`
        );
        setTotalDonationStatus(res.data.totalDonationStatus);
      } catch (error) {
        console.error('Error fetching total donation status:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalDonationStatus();
  }, [userId]);

  return { totalDonationStatus, loading };
};

export default useFetchTotalDonationStatus;
