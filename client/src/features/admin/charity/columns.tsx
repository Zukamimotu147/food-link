import { ColumnDef } from '@tanstack/react-table';

export type CharityInfo = {
  charityId: number;
  charityName: number;
  charityDescription: string;
  streetAddress: string;
  barangay: string;
  city: string;
  province: string;
  contactNumber: string;
  email: string;
  charityPhotoUrl?: string;
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
