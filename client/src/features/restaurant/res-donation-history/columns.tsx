import { ColumnDef } from '@tanstack/react-table';
import { formatDatePickup } from '@/lib/utils';
export type ResDonationHistoryInfo = {
  charityName: string;
  restaurantName: string;
  foodItemName: string;
  quantity: number;
  pickupDate: string;
  status: string;
  address: string;
  contactName: string;
  contactNumber: string;
};

export const columns: ColumnDef<ResDonationHistoryInfo>[] = [
  {
    accessorKey: 'restaurantName',
    header: 'Restaurant Name',
  },
  {
    accessorKey: 'charityName',
    header: 'Charity Name',
  },
  {
    accessorKey: 'foodItemName',
    header: 'Food Item Name',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'address',
    header: 'Address',
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
    accessorKey: 'pickupDate',
    header: 'Pickup Date',
    cell: ({ row }) => {
      const pickupDate = row.original.pickupDate;
      return formatDatePickup(pickupDate);
    },
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
