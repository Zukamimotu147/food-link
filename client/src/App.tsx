import { Outlet } from 'react-router-dom';
import './index.css';
import HomeNavBar from './components/navbar/HomeNavBar';

function App() {
  return (
    <main className="overflow-hidden">
      <HomeNavBar />
      <Outlet />
    </main>
  );
}

export default App;
