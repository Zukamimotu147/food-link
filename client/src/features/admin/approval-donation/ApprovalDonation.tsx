import useFetchDonationRequest from '@/hooks/useFetchDonationRequest';
import CardApprovalDonation from './CardApprovalDonation';
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
import { Button } from '@/components/ui/button';
import { formatDatePickup } from '@/lib/utils';

type Request = {
  donationId: number;
  userId: number;
  charityId: number;
  charityName: string;
  restaurantName: string;
  foodItemName: string;
  quantity: number;
  category: string;
  description: string;
  streetAddress: string;
  barangay: string;
  city: string;
  province: string;
  pickupDate: string;
  specialInstructions: string;
  contactName: string;
  contactNumber: string;
  allergens: string;
  storageRequirements: string;
  photoUrl: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
};
const ApprovalDonation = () => {
  const [selectedDonation, setSelectedDonation] = useState<Request | null>(null);
  const { loading } = useFetchDonationRequest();
  if (loading) return <div>Loading...</div>;

  const approveDonation = async (donationId: number) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/approveDonation/${donationId}`);
      toast.success('Donation approved successfully');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectDonation = async (donationId: number) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/rejectDonation/${donationId}`);
      toast.success('Donation rejected successfully');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <CardApprovalDonation
          onClick={(request: any) => {
            setSelectedDonation(request);
          }}
        />
      </div>

      <Dialog open={!!selectedDonation} onOpenChange={() => setSelectedDonation(null)}>
        <DialogContent className="max-w-[300px] sm:max-w-[500px] lg:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-center font-bold">Donation Request</DialogTitle>
            <DialogDescription className="text-center">
              Charity Chosen:{' '}
              <span className="text-black text-1xl font-semibold">
                {selectedDonation?.charityName}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex flex-col w-full sm:w-1/2">
              <h1 className="text-black text-1xl mb-3 font-semibold">Donation Details</h1>
              <DialogDescription className="text-black flex flex-col">
                <div className="flex flex-col ml-2">
                  <div>
                    Restaurant Name:{' '}
                    <span className="text-black font-semibold">
                      {selectedDonation?.restaurantName}
                    </span>
                  </div>
                  <div>
                    Food Item Name:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.foodItemName}
                    </span>
                  </div>
                  <div>
                    Quantity:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.quantity}
                    </span>
                  </div>
                  <div>
                    Category:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.category}
                    </span>
                  </div>
                  <div>
                    Description:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.description}
                    </span>
                  </div>
                </div>
              </DialogDescription>
            </div>
            <div className="flex flex-col w-full sm:w-1/2">
              <h1 className="text-black text-1xl mb-3 font-semibold">Pickup Information</h1>
              <DialogDescription className="text-black flex flex-col">
                <div className="flex flex-col ml-2">
                  <div>
                    Pickup Location:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.streetAddress}, {selectedDonation?.barangay},{' '}
                      {selectedDonation?.city},{' '}
                    </span>
                  </div>
                  <div>
                    Pickup Date:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {formatDatePickup(selectedDonation?.pickupDate ?? '')},
                    </span>
                  </div>
                  <div>
                    Special Instructions:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.specialInstructions}
                    </span>
                  </div>
                </div>
              </DialogDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex flex-col w-full sm:w-1/2">
              <h1 className="text-black text-1xl mb-3 font-semibold">Contact Details</h1>
              <DialogDescription className="text-black flex flex-col">
                <div className="flex flex-col ml-2">
                  <div>
                    Contact Person:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.contactName}
                    </span>
                  </div>
                  <div>
                    Contact Number:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.contactNumber}
                    </span>
                  </div>
                </div>
              </DialogDescription>
            </div>
            <div className="flex flex-col w-full sm:w-1/2">
              <h1 className="text-black text-1xl mb-3 font-semibold">Additional Information</h1>
              <DialogDescription className="text-black flex flex-col">
                <div className="flex flex-col ml-2">
                  <div>
                    Allergens:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.allergens}
                    </span>
                  </div>
                  <div>
                    Storage Requirements:{' '}
                    <span style={{ wordBreak: 'break-word' }} className="text-black font-semibold">
                      {selectedDonation?.storageRequirements}
                    </span>
                  </div>
                </div>
              </DialogDescription>
            </div>
          </div>
          <div className="flex justify-center items-center m-auto">
            <div className="text-center">
              Image:{' '}
              <img
                src={selectedDonation?.photoUrl}
                alt="Donation request Image"
                style={{ width: 'auto', height: '400px' }}
              />
            </div>
          </div>

          <DialogFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Approve
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently{' '}
                    <span className="text-green-400 font-semibold">APPROVE</span> the donation
                    resquest and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => approveDonation(selectedDonation?.donationId ?? 0)}>
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'} className="font-bold px-4 py-2 rounded">
                  Reject
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently{' '}
                    <span className="text-red-400 font-semibold">REJECT</span> the donation resquest
                    and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => rejectDonation(selectedDonation?.donationId ?? 0)}>
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

export default ApprovalDonation;
