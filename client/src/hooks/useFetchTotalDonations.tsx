import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  userId?: number;
  email?: string;
  role?: string;
  password?: string;
};

type TotalDonations = {
  count: number;
};

const useFetchTotalDonations = () => {
  const [totalDonations, setTotalDonations] = useState<TotalDonations[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const decodedToken: DecodedToken | null = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId;
  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is missing.');
        }
        const res = await axios.get(
          `http://localhost:3000/api/restaurant/viewTotalDonations/${userId}`
        );

        console.log('Total Donations Data', res.data.totalDonations);

        setTotalDonations(res.data.totalDonations);
      } catch (error) {
        console.error('Error fetching total donations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalDonations();
  }, [userId]);
  return { totalDonations, loading };
};

export default useFetchTotalDonations;
