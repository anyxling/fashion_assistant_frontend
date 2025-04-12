import React, { useState, useEffect } from 'react';
// import NamePrompt from './components/NamePrompt';
import WardrobeUploader from './components/WardrobeUploader';
import WardrobeView from './components/WardrobeView';
// import TaskSelector from './components/TaskSelector';
import OutfitGenerator from './components/OutfitGenerator';
// import CompatibilityChecker from './components/CompatibilityChecker';
import HeroSection from './components/HeroSection';
import IntroFormSection from './components/IntroFormSection';

const App = () => {
  const [view, setView] = useState('intro');

  const [userName, setUserName] = useState('');
  const [wardrobe, setWardrobe] = useState([]);

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  return (
    <>
      {view !== 'intro' && (
        <button
          onClick={() => {
            localStorage.removeItem('view');
            setView('intro');
          }}
          style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            background: 'transparent',
            border: '1px solid #ccc',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          ← Back to Home
        </button>
      )}

      {view === 'intro' ? (
        <>
          <HeroSection />
          <IntroFormSection
            setUserName={setUserName}
            setWardrobe={setWardrobe}
            setView={setView}
          />
        </>
      ) : (
        <>
          <main className="flex-grow-1">
            <div className="container">
            {view === 'wardrobe' && (
                <WardrobeView
                  wardrobe={wardrobe}
                  userName={userName}
                  onNext={() => setView('generate')}
                  onUpload={() => setView('upload')}
                />
              )}
              {view === 'upload' && (
                <WardrobeUploader
                  userName={userName}
                  setWardrobe={setWardrobe}
                  setView={setView}
                />
              )}
              {/* {view === 'tasks' && <TaskSelector userName={userName} setView={setView} />} */}
              {view === 'generate' && <OutfitGenerator userName={userName} />}
              {/* {view === 'compatibility' && (
                <CompatibilityChecker userName={userName} wardrobe={wardrobe} />
              )} */}
            </div>
          </main>

          <footer className="bg-white text-center text-muted py-3 border-top mt-5">
            <small>
              © {new Date().getFullYear()} AI Stylist — Built with ❤️ + Deep Learning
            </small>
          </footer>
        </>
      )}
    </>
  );
};

export default App;
