import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

type DecodedToken = {
  userId?: number;
  email?: string;
  role?: string;
  password?: string;
};

type Donation = {
  id: number;
  [key: string]: any;
};

const useActiveDonations = () => {
  const [activeDonationList, setActiveDonationList] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const decodedToken: DecodedToken | null = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId;

  useEffect(() => {
    const fetchActiveDonationData = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is missing.');
        }

        const res = await axios.get(
          `http://localhost:3000/api/restaurant/viewDonationRequests/${userId}`
        );
        setActiveDonationList(res.data.donations);
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching active donations.');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveDonationData();
  }, [userId]);

  return { activeDonationList, loading };
};

export default useActiveDonations;
