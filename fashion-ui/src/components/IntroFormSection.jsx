import React, { useState } from 'react';
import axios from 'axios';

function IntroFormSection({ setUserName, setWardrobe, setView }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const backgroundImage = '/fashion2.jpg';

  const handleContinue = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.get(`http://localhost:8000/check_user?user_name=${input}`);
      setUserName(input);
      setWardrobe(res.data.wardrobe || []);
      setView('wardrobe');
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="welcome"
      style={{
        minHeight: '100vh',
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome!</h2>
        <p style={{ marginBottom: '1rem' }}>What's your name?</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your name"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={handleContinue}
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem 1.2rem',
              cursor: 'pointer',
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroFormSection;