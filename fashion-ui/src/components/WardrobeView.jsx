
import React from 'react';

function WardrobeView({ wardrobe, userName, onNext, onUpload }) {
  const isEmpty = wardrobe.length === 0;
  if (isEmpty) {
    return (
      <div
        style={{
          backgroundImage: 'url("/linen.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          paddingTop: '4rem',
          paddingBottom: '4rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.6)',   // More transparent
            padding: '1.5rem 2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '90%',
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            // Force it to stay short
            minHeight: '200px',
            maxHeight: '250px',
            overflow: 'hidden',                       // ⬅️ Center it
          }}
        >
          <div className="container">
            <h2 className="text-center fw-bold mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>
              Hi {userName}, welcome!
            </h2>
              <div className="text-center">
                <p className="text-muted mb-3">
                  Your wardrobe is currently empty. Please upload at least one item to get started!
                </p>
                <button
                  onClick={onUpload}
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1.2rem',
                    cursor: 'pointer',
                  }}
                >
                  Upload Your First Item
                </button>
              </div>
              
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>           
        <h2 className="text-center fw-bold mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>
          Hi {userName}, welcome back!
        </h2>
        <p
          className="text-center mb-5"
          style={{ fontFamily: '"Inter", sans-serif', color: '#666' }}
        >
          Here's what you've uploaded so far:
        </p>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 mb-5">
          {wardrobe.map((item) => (
            <div className="col" key={item.filename}>
              <div className="wardrobe-item text-center">
                <img
                  src={`http://localhost:8000/${item.path}`}
                  className="card-img-top mb-2 shadow-sm"
                  alt={item.caption}
                  style={{
                    height: '350px',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                  }}
                />
                <p
                  style={{
                    fontSize: '1rem',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500,
                    color: '#111',
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button onClick={onUpload} className="farfetch-outline-button">
            Upload More Items
          </button>
          <button onClick={onNext} className="farfetch-outline-button">
            Suggest a new outfit for your occasion
          </button>
        </div>
      </>
    );
  }
}

export default WardrobeView;



