import { ColumnDef } from '@tanstack/react-table';

export type CharityInfo = {
  charityId: number;
  charityName: number;
  streetAddress: string;
  barangay: string;
  city: string;
  province: string;
  contactNumber: string;
  email: string;
};

export const columns: ColumnDef<CharityInfo>[] = [
  {
    accessorKey: 'charityId',
    header: 'Charity ID',
  },
  {
    accessorKey: 'charityName',
    header: 'Charity Name',
  },
  {
    accessorKey: 'streetAddress',
    header: 'Street Address',
  },
  {
    accessorKey: 'barangay',
    header: 'Barangay',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'province',
    header: 'Province',
  },
  {
    accessorKey: 'contactNumber',
    header: 'Contact Number',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];
