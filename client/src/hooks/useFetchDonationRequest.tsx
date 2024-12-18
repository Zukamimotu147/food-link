import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

type DonationRequest = {
  id: number;
  [key: string]: any;
};
const useFetchDonationRequest = () => {
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        const response = await axios.get(
          'https://food-link.onrender.com/api/admin/getDonationRequest'
        );
        // console.log('Donation request data successfully fetched', response.data);
        setDonationRequests(response.data);
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

    fetchDonationRequests();
  }, []);
  return { donationRequests, loading };
};

export default useFetchDonationRequest;
