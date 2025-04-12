import React, { useState } from 'react';
import axios from 'axios';

function WardrobeUploader({ userName, setWardrobe, setView }) {
  const [file, setFile] = useState(null);
  const [uploadedItem, setUploadedItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !userName) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("user_name", userName);
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:8000/upload_wardrobe/", formData);
      const item = res.data.wardrobe[0];
      setUploadedItem(item);
      setWardrobe((prev) => [...prev, item]);
      setUploading(false);
    } catch (err) {
      alert("Upload failed. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* LEFT: Image section */}
      <div
        style={{
          flex: 1,
          backgroundImage: 'url("/runway.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* RIGHT: Upload form */}
      <div
        style={{
          flex: 1,
          padding: '4rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          overflowY: 'auto',
        }}
      >
        <h2 style={{ fontWeight: 'bold', marginBottom: '2rem', fontSize: '1.8rem' }}>
          Upload an item to your wardrobe
        </h2>

        <div style={{ marginBottom: '1.5rem', width: '70%' }}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.6rem 1.5rem',
            fontWeight: '500',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          {uploading ? "Uploading..." : "Upload Item"}
        </button>

        {uploadedItem && (
          <div
            className="d-flex flex-column align-items-center"
            style={{ marginTop: '3rem', textAlign: 'center' }}
          >
            <p className="fw-semibold">Uploaded Successfully:</p>
            <img
              src={`http://localhost:8000/${uploadedItem.path}`}
              alt={uploadedItem.caption}
              style={{
                width: '250px',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '10px',
                marginTop: '1rem',
              }}
            />
            <p className="text-muted">{uploadedItem.caption}</p>

            <div className="d-flex gap-3 mt-3">
              <button
                onClick={() => {
                  setUploadedItem(null);
                  setFile(null);
                }}
                className="farfetch-outline-button"
              >
                Upload Another Item
              </button>
              <button
                onClick={() => {
                  setUploadedItem(null);     // ⬅️ This clears the "uploaded successfully" screen
                  setView("wardrobe");
                }}
                className="farfetch-outline-button"
              >
                Done Uploading
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WardrobeUploader;
