import { FC } from 'react';
import CardWrapper from './approval-donation components/CardWrapper';

import useFetchDonationRequest from '@/hooks/useFetchDonationRequest';

interface CardActiveDonationProps {
  onClick: (donate: any) => void;
}

const CardActiveDonation: FC<CardActiveDonationProps> = ({ onClick }) => {
  const { donationRequests, loading } = useFetchDonationRequest();
  if (loading) return <div>Loading donation requests...</div>;

  return (
    <>
      {donationRequests.length > 0 ? (
        donationRequests.map((request: any) => (
          <div key={request.donationId} onClick={() => onClick(request)}>
            <CardWrapper title={request.restaurantName}>
              <p>Food Item Name: {request.foodItemName}</p>
              <p>Status: {request.status}</p>
            </CardWrapper>
          </div>
        ))
      ) : (
        <h1 className="flex justify-center items-center">
          <span>No donations available</span>
        </h1>
      )}
    </>
  );
};

export default CardActiveDonation;
