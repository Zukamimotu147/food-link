import { columns } from './columns';
import { DataTable } from './data-table';

import useFetchCharities from '@/hooks/useFetchCharities';

const CharityTable = () => {
  const { data, loading } = useFetchCharities();

  if (loading) return <div>Loading Charities...</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CharityTable;
