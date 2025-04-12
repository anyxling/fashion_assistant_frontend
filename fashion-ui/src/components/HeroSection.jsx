import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/fashion_vid1.mp4" type="video/mp4" />
      </video>
      <div className="overlay" />

      <div className="hero-text">
      <h1 style={{ fontFamily: '"Avenir", "Helvetica Neue", sans-serif', fontWeight: 700 }} className="text-5xl font-bold">
        AI STYLIST
      </h1>
        <p className="text-xl mt-2">Personalized fashion recommendations for everyone.</p>
      </div>
    </section>
  );
};

export default HeroSection;

