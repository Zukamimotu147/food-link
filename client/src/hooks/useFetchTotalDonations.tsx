import { useEffect, useState } from 'react';
import axios from 'axios';

type TotalDonations = {
  createdAt: string;
  count: number;
};

const useFetchTotalDonations = () => {
  const [totalDonations, setTotalDonations] = useState<TotalDonations[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const res = await axios.get(
          `https://food-link.onrender.com/api/restaurant/viewTotalDonations`
        );
        // console.log('Total Donations Data', res.data.totalDonations);

        setTotalDonations(res.data.totalDonations);
      } catch (error) {
        console.error('Error fetching total donations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalDonations();
  }, []);
  return { totalDonations, loading };
};

export default useFetchTotalDonations;
