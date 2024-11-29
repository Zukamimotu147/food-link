import { useEffect, useState } from 'react';
import axios from 'axios';
import { columns } from './columns';
import { DataTable } from './data-table';
import { jwtDecode } from 'jwt-decode';
import { ResDonationHistoryInfo } from './columns';

type DecodedToken = {
  userId?: number;
  email?: string;
  role?: string;
  password?: string;
};
const ResDonationHistory = () => {
  const token = localStorage.getItem('token');
  const decodedToken: DecodedToken | null = token ? jwtDecode(token) : null;

  const userId = decodedToken?.userId;
  const [data, setData] = useState<ResDonationHistoryInfo[]>([]);
  useEffect(() => {
    const getResDonationHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/restaurant/viewResDonationHistory/${userId}`
        );
        console.log('Res Donation History Data', res.data.resDonationHistory);
        setData(res.data.resDonationHistory);
      } catch (error) {
        console.error(error);
      }
    };
    getResDonationHistory();
  }, [userId]);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ResDonationHistory;
