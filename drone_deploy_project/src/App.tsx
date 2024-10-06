import './App.css';
import React, { useState, useEffect } from "react";



const App: React.FC = () => {
  const [droneData, setDroneData] = useState<any>(null);
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  
  
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
          <strong>AI Response:</strong> 
          <p>
            {response}
          </p>
        </div>
        
      )}

    </div>
  );
};

export default App;
