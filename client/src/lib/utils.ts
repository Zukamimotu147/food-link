import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const formatteddate = date.toISOString().split('T')[0];
  const formattedtime = date.toISOString().replace('Z', '');
  const parsedTime = new Date(formattedtime);
  const time = parsedTime.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${formatteddate} ${time}`;
};

export const formatDatePickup = (dateString: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const monthName = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
};
