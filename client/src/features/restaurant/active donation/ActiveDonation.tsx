import CardActiveDonation from './CardActiveDonation';
import useActiveDonations from '@/hooks/useFetchActiveDonationData';
import { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { formatDate, formatDatePickup } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import UpdateDonation from './activedonation components/UpdateDonation';

type Donation = {
  foodItem: string;
  quantity: number;
  category: string;
  description: string;
  pickupLocation: string;
  pickupDate: string;
  specialInstructions?: string;
  contactPerson: string;
  contactNumber: string;
  allergen?: string;
  charityName: string;
  storageRequirement?: string;
  foodDonationTable: {
    foodItemName: string;
    quantity: number;
    createdAt: string;
    category: string;
    description: string;
    streetAddress: string;
    barangay: string;
    city: string;
    pickupDate: string;
    specialInstructions: string;
    contactName: string;
    contactNumber: string;
    allergens: string;
    storageRequirements: string;
    donationId: number;
  };
};

const ActiveDonation = () => {
  const { loading } = useActiveDonations();
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  console.log('Data from selected donation', selectedDonation);

  const deleteDonation = async (donationId: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/restaurant/deleteDonationRequest/${donationId}`
      );
      console.log('Donation Deleted', res.data);
      toast.success('Donation request deleted successfully');

      window.location.reload();
      //   console.log('Donation Id send delete', donationId);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      }
      console.log(error);
    }
  };

  if (loading) return <div>Loading Active Donations...</div>;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <CardActiveDonation onClick={(donation: any) => setSelectedDonation(donation)} />
      </div>

      <Dialog open={!!selectedDonation} onOpenChange={() => setSelectedDonation(null)}>
        <DialogContent className="md:max-w-[500px] lg:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Created At {formatDate(selectedDonation?.foodDonationTable.createdAt ?? '')}
            </DialogTitle>
            <p className="text-center">
              Recipient:{' '}
              <span className="text-black text-1xl font-semibold">
                {selectedDonation?.charityName}
              </span>
            </p>
          </DialogHeader>
          <div className="flex flex-col">
            <h1 className="text-black text-1xl mb-3 font-semibold">Donation Details</h1>
            <DialogDescription className="text-black flex flex-col">
              <div className="flex flex-col ml-2">
                <div>
                  Food Item:{' '}
                  <span className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.foodItemName}
                  </span>
                </div>
                <div>
                  Quantity:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.quantity}
                  </span>
                </div>
                <div>
                  Category:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.category}
                  </span>
                </div>
                <div>
                  Description:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.description}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-1xl mb-3 font-semibold">Pickup Information</h1>
            <DialogDescription className="text-black flex flex-col">
              <div className="flex flex-col ml-2">
                <div>
                  Pickup Location:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.streetAddress},{' '}
                    {selectedDonation?.foodDonationTable.barangay},{' '}
                    {selectedDonation?.foodDonationTable.city},{' '}
                  </span>
                </div>
                <div>
                  Pickup Date:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {formatDatePickup(selectedDonation?.foodDonationTable.pickupDate ?? '')}
                  </span>
                </div>
                {/* <div>
                  Category:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.category}
                  </span>
                </div> */}
                <div>
                  Special Instructions:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.specialInstructions}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-1xl mb-3 font-semibold">Contact Details</h1>
            <DialogDescription className="text-black flex flex-col">
              <div className="flex flex-col ml-2">
                <div>
                  Contact Person:{' '}
                  <span className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.contactName}
                  </span>
                </div>
                <div>
                  Contact Number:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.contactNumber}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-1xl mb-3 font-semibold">Additional Information</h1>
            <DialogDescription className="text-black flex flex-col">
              <div className="flex flex-col ml-2">
                <div>
                  Allergen:{' '}
                  <span className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.allergens}
                  </span>
                </div>
                <div>
                  Storage Requirement:{' '}
                  <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                    {selectedDonation?.foodDonationTable.storageRequirements}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </div>

          <DialogFooter>
            <UpdateDonation donationId={selectedDonation?.foodDonationTable.donationId} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the donation resquest
                    and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      deleteDonation(selectedDonation?.foodDonationTable.donationId ?? 0)
                    }>
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActiveDonation;
