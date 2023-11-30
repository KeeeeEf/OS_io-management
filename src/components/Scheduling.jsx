import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LineChart } from './LineChart';

export const Scheduling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trackStream, ct } = location.state;

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [curTrack, setCurTrack] = useState('');
  const [schedulingData, setSchedulingData] = useState([]);
  const [totalSeekTime, setTotalSeekTime] = useState('');

  useEffect(() => {
    const selectedAlgo = sessionStorage.getItem('selectedAlgorithm');

    import(/* @vite-ignore */ `./algos/${selectedAlgo.toLowerCase()}`).then((module) => {
      const { calculateScheduling } = module;
      const ctrack = parseInt(ct, 10);
      
      const functionCall = calculateScheduling(trackStream, ctrack);
      const sched = functionCall.graphResults;
      const totalstime = functionCall.totalSeekTime;

      console.log("sched: " + sched);
      console.log("totalstime: " + totalstime);

      setSelectedAlgorithm(selectedAlgo);
      setCurTrack(ctrack);

      setSchedulingData(sched);
      setTotalSeekTime(totalstime);
    });
  }, [trackStream, ct, selectedAlgorithm]);

  const handleBack = () => {
    navigate('/input');
    window.location.reload();
  };

  const handleSimulateAgain = () => {
    navigate('/', { state: { key: Date.now() } });
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div>
        <div className="text-center">
            <h1>{selectedAlgorithm} Disk Scheduling</h1>
            <button onClick={handleBack} className="btn btn-primary">
            Back to Input Parameters
            </button>
        </div>
      <div className='row mt-3'>
        <div className='col'>
          <h5><b>Current Track:</b> {curTrack}</h5>
          <h5>
            <b>Stream of Track Access Requests: </b> 
            {trackStream.map((page, pageIndex) => (
                <span key={pageIndex}>
                {pageIndex > 0 && ', '}
                {page}
                </span>
            ))}
            </h5>
        </div>
      </div>
    
      <div className="mt-2 mb-4 text-center">
        <LineChart data={schedulingData}/>
        <h4 className="mt-3"><b>Total Seek Time: </b>{totalSeekTime} </h4>
      </div>  

      <div className="text-center mt-3">
        <button
          onClick={handleSimulateAgain}
          className="btn btn-danger btn-lg"
        >
          Simulate Again
        </button>
      </div>
        
    </div>
  );
};