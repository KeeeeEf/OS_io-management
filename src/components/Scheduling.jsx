import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Scheduling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trackStream, ct } = location.state;

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [curTrack, setCurTrack] = useState('');
//   const [tableData, setTableData] = useState([]);
//   const [replacedData, setReplacedData] = useState([]);
//   const [pageFaults, setPageFaults] = useState(0);
//   const [pageHits, setPageHits] = useState(0);

  useEffect(() => {
    const selectedAlgo = sessionStorage.getItem('selectedAlgorithm');

    import(/* @vite-ignore */ `./algos/${selectedAlgo.toLowerCase()}`).then((module) => {
    //   const { calculateScheduling } = module;
      const ctrack = parseInt(ct, 10);
    //   const functionCall = calculateScheduling(trackStream, ctrack);

    //   const resultData = functionCall.frameResults || [];
    //   const resultReplaced = functionCall.replacedPages || [];
    //   const { pageFaults, pageHits } = functionCall;

      setSelectedAlgorithm(selectedAlgo);
      setCurTrack(ctrack);
    //   setTableData(resultData);
    //   setReplacedData(resultReplaced);
    });
  }, [trackStream, ct]);

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
          <h5><b>Total Track Access Requests:</b> {trackStream.length}</h5>
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
    
      <table className="table mt-4 text-center table-striped">
        <thead>
          <tr>
            <th></th>
            
          </tr>
        </thead>
      </table>

      <div className="text-center">
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