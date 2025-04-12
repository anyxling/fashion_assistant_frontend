import React, { useState } from 'react';
import { uploadWardrobe } from '../api/wardrobe';

function UploadForm() {
  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!userName || !file) {
      setError('Please enter your name and select one image to upload.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const res = await uploadWardrobe(userName, file);
      setResult(res.wardrobe[0]); // show last uploaded
    } catch (err) {
      setError('Upload failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Upload your fashion item</h2>

      <input
        type="text"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
        disabled={!userName}
      />

      <button
        onClick={handleUpload}
        disabled={!userName || !file || loading}
        className={`px-4 py-2 text-white rounded ${(!userName || !file || loading) ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {result && (
        <div className="mt-4 text-left">
          <h4 className="font-semibold mb-1 text-green-700">Upload Successful!</h4>
          <img
            src={`http://localhost:8000/${result.path}`}
            alt={result.filename}
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            className="mb-2"
          />
          <p><strong>Caption:</strong> {result.caption}</p>
        </div>
      )}
    </div>
  );
}

export default UploadForm;