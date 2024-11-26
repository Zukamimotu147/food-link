import CardWrapper from '../components/CardWrapper';
import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
type DecodedToken = {
  userId?: number;
  email?: string;
  role?: string;
  password?: string;
};
const ActiveDonation = () => {
  const [activeDonationList, setActiveDonationList] = useState<any[]>([]);
  const token = localStorage.getItem('token');
  const decodedToken: DecodedToken | null = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId;
  useEffect(() => {
    const fetchActiveDonationData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/restaurant/viewDonationRequests/${userId}`
        );

        // localStorage.setItem('activeDonationList', JSON.stringify(res.data));
        // const activeDonationList = localStorage.getItem('activeDonationList');
        const donations = res.data.donations;

        setActiveDonationList(donations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActiveDonationData();
  }, [userId]);
  return (
    <>
      {activeDonationList.length > 0 ? (
        activeDonationList.map((donation: any) => (
          <div key={donation.foodDonationTable.donationId}>
            <CardWrapper title={donation.charityName}>
              <p>Food Item Name: {donation.foodDonationTable.foodItemName}</p>
              <p>Quantity: {donation.foodDonationTable.quantity}</p>
            </CardWrapper>
          </div>
        ))
      ) : (
        <p>No donations available</p>
      )}
    </>
  );
};

export default ActiveDonation;
