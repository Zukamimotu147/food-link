import { FC } from 'react';
import CardWrapper from './activedonation components/CardWrapper';
import { ActiveDonationData } from '../types/donationTypes';
import useActiveDonations from '@/hooks/useFetchActiveDonationData';
import NoDonationReqAvail from './activedonation components/NoDonationReqAvail';

interface CardActiveDonationProps {
  onClick: (donate: ActiveDonationData) => void;
}

const CardActiveDonation: FC<CardActiveDonationProps> = ({ onClick }) => {
  const { activeDonationList, loading } = useActiveDonations();
  if (loading) return <div>Loading Active Donations...</div>;

  return (
    <>
      {activeDonationList.length > 0 ? (
        activeDonationList.map((donation: any) => (
          <div key={donation.foodDonationTable.donationId} onClick={() => onClick(donation)}>
            <CardWrapper title={donation.charityName}>
              <p>Food Item Name: {donation.foodDonationTable.foodItemName}</p>
              <p>Quantity: {donation.foodDonationTable.quantity}</p>
            </CardWrapper>
          </div>
        ))
      ) : (
        // <h1 className="flex justify-center items-center">
        //   <span>No donations request available</span>
        // </h1>
        <NoDonationReqAvail />
      )}
    </>
  );
};

export default CardActiveDonation;
