import axios from 'axios';
import { useState, useEffect } from 'react';

type User = {
  //   userId: number;
  count: number;
};
const useFetchTotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await axios.get('https://food-link.onrender.com/api/restaurant/viewTotalUsers');
        // console.log('Total Users Data', res.data.totalUsers);
        const totalUsers = res.data.totalUsers;
        setTotalUsers(totalUsers);
      } catch (error) {
        console.error('Error fetching total users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);
  return { totalUsers, loading };
};

export default useFetchTotalUsers;
