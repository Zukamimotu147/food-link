import { useEffect, useState } from 'react';
import axios from 'axios';
import { columns } from './columns';
import { DataTable } from './data-table';
import { AdminDonationHistoryInfo } from './columns';

const AdmDonationHistory = () => {
  const [data, setData] = useState<AdminDonationHistoryInfo[]>([]);
  useEffect(() => {
    const getAdminDonationHistory = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/admin/getAdminDonationHistory');
        console.log('Admin Donation History Data', res.data);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching admin donation history:', error);
      }
    };
    getAdminDonationHistory();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdmDonationHistory;
