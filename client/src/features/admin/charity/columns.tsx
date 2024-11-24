'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
