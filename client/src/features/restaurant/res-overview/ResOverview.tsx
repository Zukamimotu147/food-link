// import ResPieChart from './ResPieChart';
import useFetchTotalDonations from '@/hooks/useFetchTotalDonations';
import useFetchTotalCharities from '@/hooks/useFetchTotalCharities';
import useFetchTotalUsers from '@/hooks/useFetchTotalUsers';
const ResOverview = () => {
  const { totalCharities } = useFetchTotalCharities();
  const { totalUsers } = useFetchTotalUsers();
  const { totalDonations } = useFetchTotalDonations();

  const totalUserCount = totalUsers.reduce((acc, user) => acc + user.count, 0);
  const totalCharitiesCount = totalCharities.reduce((acc, charity) => acc + charity.count, 0);
  const totalDonationsCount = totalDonations.reduce((acc, donation) => acc + donation.count, 0);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-customGreen/90">
          {/* {totalUsers.map((user, index) => (
            <div key={index}>{user.count}</div>
          ))} */}
          <h1 className="font-bold text-4xl text-white text-center">{totalUserCount}</h1>
        </div>
        <div className="aspect-video rounded-xl bg-customGreen/90">
          <h1 className="font-bold text-4xl text-white text-center">{totalDonationsCount}</h1>
        </div>
        <div className="aspect-video rounded-xl bg-customGreen/90">
          <h1 className="font-bold text-4xl text-white text-center">{totalCharitiesCount}</h1>
        </div>
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </main>
  );
};

export default ResOverview;
