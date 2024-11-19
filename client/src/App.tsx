import { Outlet } from 'react-router-dom';
import './index.css';
import HomeNavBar from './components/navbar/HomeNavBar';

function App() {
  return (
    <section>
      <HomeNavBar />
      <Outlet />
    </section>
  );
}

export default App;
