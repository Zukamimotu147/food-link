import { useEffect, useState } from 'react';
import { CharityInfo, columns } from './columns';
import { DataTable } from './data-table';
import axios from 'axios';
import { toast } from 'sonner';

const CharityTable = () => {
  const [data, setData] = useState<CharityInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getCharities');
        localStorage.setItem('charities', JSON.stringify(response.data));
        const charities = localStorage.getItem('charities');
        console.log('Charity data successfully fetched', charities);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An error occurred while fetching data.');
          }
        } else {
          toast.error('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CharityTable;
