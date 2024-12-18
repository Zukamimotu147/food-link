import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  userId?: number;
  email?: string;
  role?: string;
  password?: string;
};

type TotalDonationStatus = {
  status: string;
  count: number;
};

type ChartData = {
  name: string;
  value: number;
  fill: string;
};

const useFetchTotalDonationStatus = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
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
          `https://food-link.onrender.com/api/restaurant/viewDonationStatusSummary/${userId}`
        );

        const formattedData = res.data.donationStatusSummary.map((item: TotalDonationStatus) => ({
          status: item.status,
          count: item.count,
          fill: item.status === 'ACCEPTED' ? '#008000' : '#FF4141',
        }));

        // console.log('Total Donation Status Data', res.data.donationStatusSummary);
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching total donation status:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalDonationStatus();
  }, [userId]);

  return { chartData, loading };
};

export default useFetchTotalDonationStatus;
