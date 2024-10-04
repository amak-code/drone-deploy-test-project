import './App.css';
import React, { useState, useEffect } from "react";

interface DroneData {
  image_id: string;
  timestamp: string;
  latitude: string;
  longitude: string;
  altitude_m: number;
  heading_deg: number;
  file_name: string;
  camera_tilt_deg: number;
  focal_length_mm: number;
  iso: number;
  shutter_speed: string;
  aperture: string;
  color_temp_k: number;
  image_format: string;
  file_size_mb: number;
  drone_speed_mps: number;
  battery_level_pct: number;
  gps_accuracy_m: number;
  gimbal_mode: string;
  subject_detection: string;
  image_tags: string[];
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [droneData, setDroneData] = useState<DroneData[]>([]);
  const [response, setResponse] = useState<string>("");

  //fetching data from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/drone-data")
      .then((res) => res.json())
      .then((data) => setDroneData(data))
      .catch((error) => console.error("Error fetching drone data:", error));
  }, []);

  //query submission
  const handleQuery = () => {
    fetch("http://127.0.0.1:5000/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.response))
      .catch((error) => console.error("Error submitting query:", error));
  };

  return (
    <div className='drone-data-container'>
      <h1>DroneDeploy Dron Data</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question about dron data here"
          className='custom-input'
        />
        <button onClick={handleQuery}>Submit</button>
      </div>
      {response && (
        <div style={{ marginBottom: "20px" }}>
          <strong>AI Response:</strong> {response}
        </div>
      )}

    </div>
  );
};

export default App;
