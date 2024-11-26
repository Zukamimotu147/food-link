import { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import CardWrapper from '../components/CardWrapper';
import { ActiveDonationData } from '../types/donationTypes';
import { set } from 'date-fns';

interface CardActiveDonationProps {
  onClick: (donate: ActiveDonationData) => void;
}

const CardActiveDonation: FC<CardActiveDonationProps> = ({ onClick }) => {
  const [activeDonationList, setActiveDonationList] = useState<ActiveDonationData[]>([]);

  return <div>CardActiveDonation</div>;
};

export default CardActiveDonation;
