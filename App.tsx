
import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './sections/Home';
import Maps from './sections/Maps';
import Offers from './sections/Offers';
import Vlans from './sections/Vlans';
import Materials from './sections/Materials';
import Maintenance from './sections/Maintenance';
import Columns from './sections/Columns';
import Contact from './sections/Contact';
import { Section } from './types';

const App: React.FC = () => {
  const { userRole } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);

  useEffect(() => {
    if (userRole) {
      document.body.classList.add('logged-in');
    } else {
      document.body.classList.remove('logged-in');
    }
  }, [userRole]);

  if (!userRole) {
    return <Login />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case Section.Home:
        return <Home setActiveSection={setActiveSection} />;
      case Section.Maps:
        return <Maps />;
      case Section.Offers:
        return <Offers />;
      case Section.Vlans:
        return <Vlans />;
      case Section.Materials:
        return <Materials />;
      case Section.Maintenance:
        return <Maintenance />;
      case Section.Columns:
        return <Columns />;
      case Section.Contact:
        return <Contact />;
      default:
        return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="main-wrapper block bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800 min-h-screen">
      <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
        {renderSection()}
      </Layout>
    </div>
  );
};

export default App;
