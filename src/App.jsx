import React, { useState, useEffect } from 'react';
import { Home, Target, BarChart3 } from 'lucide-react';
import OnboardingPage from './components/OnboardingPage';
import Dashboard from './components/Dashboard';
import DreamsPage from './components/DreamsPage';
import { getData, getUserProfile } from './utils/localStorage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userGender, setUserGender] = useState('');

  useEffect(() => {
    const data = getData();
    setHasCompletedOnboarding(data.user.hasCompletedOnboarding);
    
    // Get user gender for background
    const profile = getUserProfile();
    setUserGender(profile.sexe || '');
  }, []);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentPage('dashboard');
    
    // Update gender after onboarding
    const profile = getUserProfile();
    setUserGender(profile.sexe || '');
  };

  // Get background style based on gender
  const getBackgroundStyle = () => {
    if (userGender === 'homme') {
      // Male background: Cool blue gradient - try image first, fallback to gradient
      return {
        background: `
          linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.8) 100%),
          linear-gradient(45deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      };
    } else if (userGender === 'femme') {
      // Female background: Warm pink/purple gradient
      return {
        background: `
          linear-gradient(135deg, rgba(236, 72, 153, 0.6) 0%, rgba(219, 39, 119, 0.8) 100%),
          linear-gradient(45deg, #f472b6 0%, #ec4899 50%, #db2777 100%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      };
    }
    // Default background
    return {
      background: 'linear-gradient(135deg, #f0f4f8 0%, #e5e7eb 100%)'
    };
  };

  if (!hasCompletedOnboarding) {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: Home },
    { id: 'dreams', label: 'Mes Rêves', icon: Target }
  ];

  return (
    <div className="min-h-screen" style={getBackgroundStyle()}>
      {/* Background overlay for better readability */}
      <div className="min-h-screen backdrop-blur-sm bg-white/30">
        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-md shadow-md">
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
                          : 'text-gray-700 hover:bg-gray-100/70'
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
    </div>
  );
}

export default App;
