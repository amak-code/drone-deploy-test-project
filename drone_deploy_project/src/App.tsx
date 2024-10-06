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
  const [response, setResponse] = useState<string>("");
  const [droneData, setDroneData] = useState<DroneData[]>([]);


  // fetch drone data from the backend
  useEffect(() => {
    fetch("/api/drone-data")
      .then((res) => res.json())
      .then((data) => setDroneData(data))
      .catch((error) => console.error("Error fetching drone data:", error));
  }, []);


  //query submission
  const handleQuery = () => {
    fetch("/api/query", {
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
      <h1>DroneDeploy Drone Data</h1>
      <div className="drone-data-cards">
        {droneData.map((data) => (
          <div key={data.image_id} className="drone-card">
            <h2>Image ID: {data.image_id}</h2>
            <p><strong>Timestamp:</strong> {data.timestamp}</p>
            <p><strong>Latitude:</strong> {data.latitude}, <strong>Longitude:</strong> {data.longitude}</p>
            <p><strong>Altitude (m):</strong> {data.altitude_m}</p>
            <p><strong>Heading (deg):</strong> {data.heading_deg}</p>
            <p><strong>File Name:</strong> {data.file_name}</p>
            <p><strong>Camera Tilt (deg):</strong> {data.camera_tilt_deg}</p>
            <p><strong>Focal Length (mm):</strong> {data.focal_length_mm}</p>
            <p><strong>ISO:</strong> {data.iso}</p>
            <p><strong>Shutter Speed:</strong> {data.shutter_speed}</p>
            <p><strong>Aperture:</strong> {data.aperture}</p>
            <p><strong>Color Temp (K):</strong> {data.color_temp_k}</p>
            <p><strong>Image Format:</strong> {data.image_format}</p>
            <p><strong>File Size (MB):</strong> {data.file_size_mb}</p>
            <p><strong>Drone Speed (mps):</strong> {data.drone_speed_mps}</p>
            <p><strong>Battery Level (%):</strong> {data.battery_level_pct}</p>
            <p><strong>GPS Accuracy (m):</strong> {data.gps_accuracy_m}</p>
            <p><strong>Gimbal Mode:</strong> {data.gimbal_mode}</p>
            <p><strong>Subject Detection:</strong> {data.subject_detection}</p>
            <p><strong>Image Tags:</strong> {data.image_tags.join(", ")}</p>
          </div>
        ))}
      </div>
      
      <div className='custom-input-block'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question about drone data here"
          className='custom-input'
        />
        <button onClick={handleQuery}>Submit</button>
      </div>
      {response && (
        <div style={{ marginBottom: "20px" }}>
          <strong>AI Response:</strong>
          <p data-testid="ai-response">
            {response}
          </p>
        </div>

      )}

    </div>
  );
};

export default App;
