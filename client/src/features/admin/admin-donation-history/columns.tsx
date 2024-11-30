import { ColumnDef } from '@tanstack/react-table';
import { formatDatePickup } from '@/lib/utils';
export type AdminDonationHistoryInfo = {
  donationId: number;
  userId: number;
  restaurantName: string;
  foodItemName: string;
  quantity: number;
  category: string;
  pickupDate: string;
  address: string;
  contactName: string;
  contactNumber: string;
  allergens: string;
  status: string;
};

export const columns: ColumnDef<AdminDonationHistoryInfo>[] = [
  {
    accessorKey: 'donationId',
    header: 'Donation Id',
  },
  {
    accessorKey: 'userId',
    header: 'User Id',
  },
  {
    accessorKey: 'restaurantName',
    header: 'Restaurant Name',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'pickupDate',
    header: 'Pickup Date',
    cell: ({ row }) => {
      const pickupDate = row.original.pickupDate;
      return formatDatePickup(pickupDate);
    },
  },
  {
    accessorKey: 'contactName',
    header: 'Contact Name',
  },
  {
    accessorKey: 'contactNumber',
    header: 'Contact Number',
  },
  {
    accessorKey: 'allergens',
    header: 'Allergens',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === 'ACCEPTED' ? 'text-green-500' : status === 'REJECTED' ? 'text-red-500' : '';
      return <span className={color}>{status}</span>;
    },
  },
];
