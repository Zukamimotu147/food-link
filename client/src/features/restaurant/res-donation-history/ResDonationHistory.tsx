import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { columns } from './columns';
import { DataTable } from './data-table';
import { jwtDecode } from 'jwt-decode';
import { ResDonationHistoryInfo } from './columns';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);
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
  const resDonationHistoryRef = useRef(null);

  useGSAP(() => {
    gsap.from(resDonationHistoryRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);
  useEffect(() => {
    const getResDonationHistory = async () => {
      try {
        const res = await axios.get(
          `https://food-link.onrender.com/api/restaurant/viewResDonationHistory/${userId}`
        );
        console.log('Res Donation History Data', res.data.resDonationHistory);
        setData(res.data.resDonationHistory);
      } catch (error) {
        console.error('Error fetching res donation history:', error);
      }
    };
    getResDonationHistory();
  }, [userId]);
  return (
    <div className="container mx-auto py-10" ref={resDonationHistoryRef}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ResDonationHistory;
