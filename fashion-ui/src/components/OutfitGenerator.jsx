import React, { useState } from 'react';
import axios from 'axios';

function OutfitGenerator({ userName }) {
  const [city, setCity] = useState('');
  const [occasion, setOccasion] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [image, setImage] = useState(null);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [weatherLine, setWeatherLine] = useState('');
  const [wardrobeItems, setWardrobeItems] = useState([]);

  const handleSubmit = async () => {
    if (!city || !occasion || !gender) return alert('Please fill in all fields.');

    setLoading(true);
    setResult('');
    setImage(null);
    setRecommendedItems([]);
    setWeatherLine('');

    try {
      const res = await axios.post('http://localhost:8000/generate_outfit/', null, {
        params: {
          user_name: userName,
          city: city,
          occasion: occasion,
          sex: gender,
        },
      });

      const fullText = res.data;

      // Extract weather info and items
      const weatherText = fullText.split("\n")[0];
      setWeatherLine(weatherText);

      const itemMatch = fullText.match(/items: \[(.*?)\]/);
      const rawItems = itemMatch ? itemMatch[1] : '';
      const itemArray = rawItems.split(',').map((i) => i.replace(/['"]+/g, '').trim());
      setRecommendedItems(itemArray);

      const localMatch = fullText.split("the corresponding ids are: ")[1].match(/\['.*?'\]/g);
      const localItems = [... new Set(localMatch.map(item => {
        const match = item.match(/'([^']+\.jpg)'/);
        return match ? match[1] : null;
      }).filter(Boolean))];
      
      const wardrobeRes = await axios.get(`http://localhost:8000/wardrobe/${userName}/embeddings.json`);
      var localRes = wardrobeRes.data.filter(item =>
        localItems.includes(item.filename)
      );
      localRes = Array.from(
        new Map(localRes.map(item => [item.filename, item])).values()
      );
      setWardrobeItems(localRes);

      const cleaned = itemArray.join(', ');
      const formData = new FormData();
      formData.append('recommend_items', cleaned);
      formData.append('occasion', occasion);

      // Get wardrobe images (assuming embeddings.json exists)
      const imgRes = await axios.post('http://localhost:8000/generate_virtual_tryon/', formData);
      setImage(`data:image/jpeg;base64,${imgRes.data.generated_image_base64}`);

    } catch (err) {
      console.error(err);
      alert('Error generating outfit or image.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto text-center mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Outfit Generator</h2>
      <p className="text-gray-700 mb-4">Tell us a few details and we’ll suggest a stylish outfit.</p>

      <div 
        className="mb-6 grid gap-3"
        style={{
          display: 'inline-flex',
          gap: '1rem', // spacing between elements
          marginBottom: '1.5rem', // same as mb-6
          flexWrap: 'wrap', // allows wrapping on small screens 
        }}
      >
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          // className="border p-2 rounded w-full"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          placeholder="What’s the occasion?"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          // className="border p-2 rounded w-full"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
          }}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          // className="border p-2 rounded w-full"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
          }}
        >
          <option value="">Select your gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer not to say">Prefer not to say</option>
        </select>
        <button
          onClick={handleSubmit}
          disabled={loading}
          // className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem 1.2rem',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Generating...' : 'Generate Outfit'}
        </button>
      </div>

          {(weatherLine || recommendedItems.length > 0 || image) && (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '4rem',
          marginTop: '4rem',
          flexWrap: 'wrap',
        }}
      >
        {/* LEFT: Try-On Image */}
        {image && (
          <div style={{ textAlign: 'left', minWidth: '320px' }}>
            <h4 className="font-semibold mb-4 text-lg" style={{ fontSize: '1.25rem' }}>
              Virtual Try-On
            </h4>
            <img
              src={image}
              alt="Try-on"
              style={{
                height: '460px', // taller image
                width: 'auto',
                borderRadius: '0.5rem',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* RIGHT: Weather + Recommendation + Picks */}
        <div style={{ maxWidth: '700px', flex: 1, textAlign: 'left' }}>
          <div style={{ marginBottom: '2rem' }}>
            {weatherLine && (
              <p
                className="mb-3 text-gray-800"
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  fontWeight: '500',
                }}
              >
                <strong>Weather:</strong> {weatherLine}
              </p>
            )}
            {recommendedItems.length > 0 && (
              <p
                className="text-gray-800"
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  fontWeight: '500',
                }}
              >
                <strong>We recommend:</strong> {recommendedItems.join(', ')}
              </p>
            )}
          </div>

          {wardrobeItems.length > 0 && (
            <div>
              <p><strong>We picked these from your wardrobe:</strong></p>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {wardrobeItems.map((item) => (
                  <div className="col" key={item.filename}>
                    <img
                      src={`http://localhost:8000/${item.path}`}
                      className="card-img-top mb-2 shadow-sm"
                      alt={item.caption}
                      style={{
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    </div>
  );
}

export default OutfitGenerator;

