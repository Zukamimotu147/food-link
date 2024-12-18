import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { CharityInfo } from '@/features/admin/charity/columns';

const useFetchCharities = () => {
  const [data, setData] = useState<CharityInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://food-link.onrender.com/api/admin/getCharities');
        // console.log('Charity data successfully fetched', response.data);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An error occurred while fetching data.');
          }
        } else {
          toast.error('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading };
};

export default useFetchCharities;
