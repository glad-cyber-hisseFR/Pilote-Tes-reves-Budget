import React, { useState, useEffect } from 'react';
import { Home, Target, BarChart3 } from 'lucide-react';
import OnboardingPage from './components/OnboardingPage';
import Dashboard from './components/Dashboard';
import DreamsPage from './components/DreamsPage';
import { getData } from './utils/localStorage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const data = getData();
    setHasCompletedOnboarding(data.user.hasCompletedOnboarding);
  }, []);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentPage('dashboard');
  };

  if (!hasCompletedOnboarding) {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: Home },
    { id: 'dreams', label: 'Mes Rêves', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                Pilote Tes Rêves
              </h1>
            </div>
            <div className="flex gap-2">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      currentPage === item.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden md:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'dreams' && <DreamsPage />}
      </main>
    </div>
  );
}

export default App;
