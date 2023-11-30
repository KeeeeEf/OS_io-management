import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Input = () => {
  const navigate = useNavigate();
  const [trackStream, setTrackStream] = useState([]);
  const [currentTrack, setCurrentTrack] = useState('');

  useEffect(() => {
    const storedTracks = JSON.parse(sessionStorage.getItem('inputTracks')) || [];
    const storedCurTrack = JSON.parse(sessionStorage.getItem('ct')) || '';
    setCurrentTrack(storedCurTrack);
    setTrackStream(storedTracks);

  }, []);

  const storeIOData = (data, ct) => {
    sessionStorage.setItem('inputTracks', JSON.stringify(data));
    sessionStorage.setItem('ct', JSON.stringify(ct));
  };

  const validateInput = () => {
    const streamValues = trackStream.map(Number);

    if (streamValues.some(isNaN) || streamValues.some(val => val < 0 || val > 199)) {
      alert('Please enter valid non-negative integers for Track Access Requests.');
      return false;
    }    

    if (streamValues.length < 2) {
      alert('Please enter at least two tracks.');
      return false;
    }

    const parsedCurrentTrack = parseInt(currentTrack, 10);
    if (isNaN(parsedCurrentTrack) || parsedCurrentTrack < 0 || parsedCurrentTrack > 199) {
      alert('Please enter a valid current track.');
      return false;
    }

    return true;
  };

  const handleSimulate = () => {

    if(!validateInput()){
      return;
    }

    const parsedCurrentTrack = parseInt(currentTrack, 10);

    storeIOData(trackStream, parsedCurrentTrack);

    navigate('/scheduling', {
      state: {
        trackStream,
        ct: parsedCurrentTrack,
      },
    });
  };

  const handleBack = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="text-center">
      <h1>Input Parameters</h1>
      <button onClick={handleBack} className="btn btn-primary">
        Back to Home
      </button>

      <div className="mt-5 text-center mx-auto w-25">
        <div className="form-group">
          <h5><b>Current Track</b></h5>
          <h6>(serviced by the read/write head)</h6>
          <input
            type="number"
            value={currentTrack}
            onChange={(e) => setCurrentTrack(e.target.value)}
            className="form-control text-center"
          />
        </div>
        <div className="form-group mt-5">
          <h5><b>Track Access Requests</b></h5>
          <h6>(separate by comma)</h6>
          <input
            type="text"
            value={trackStream.join(',')}
            onChange={(e) => setTrackStream(e.target.value.split(',').map(Number))}
            className="form-control text-center"
          />
        </div>
      </div>

      <button onClick={handleSimulate} className="btn btn-lg btn-danger mx-2 mt-5">
        Simulate Disk Scheduling
      </button>
    </div>
  );
};
