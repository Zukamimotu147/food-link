import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import HomeNavBar from './components/navbar/HomeNavBar';

function App() {
  return (
    <main className="overflow-hidden">
      <HomeNavBar />
      <Outlet />
      <Toaster richColors />
    </main>
  );
}

export default App;
