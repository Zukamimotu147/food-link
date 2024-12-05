import axios from 'axios';
import { useState, useEffect } from 'react';

type Charity = {
  count: number;
};
const useFetchTotalUsers = () => {
  const [totalCharities, setTotalCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTotalCharities = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/restaurant/viewTotalCharities');
        // console.log('Total Charities Data', res.data.totalCharities);
        setTotalCharities(res.data.totalCharities);
      } catch (error) {
        console.error('Error fetching total users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalCharities();
  }, []);
  return { totalCharities, loading };
};

export default useFetchTotalUsers;
