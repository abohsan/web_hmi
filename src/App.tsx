// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import DashboardPage from './pages/DashboardPage';
import TanksPage from './pages/TanksPage';
import SettingsPage from './pages/SettingsPage';
import Header from './components/Header/Header'; // if you're using a header

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/DashboardPage" element={<DashboardPage />} />
      <Route path="/TanksPage" element={<TanksPage />} />
      <Route path="/SettingsPage" element={<SettingsPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </>
);

export default App;
