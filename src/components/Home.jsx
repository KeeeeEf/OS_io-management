import { useNavigate } from 'react-router-dom';

function Home() {
  const algos = [
    'First-Come, First-Served',
    'Shortest Seek Time First',
    'SCAN',
    'Circular-SCAN',
    'LOOK',
    'Circular-LOOK',
  ];

  const algoAcronyms = {
    'First-Come, First-Served': 'FCFS',
    'Shortest Seek Time First': 'SSTF',
    'SCAN': 'SCAN',
    'Circular-SCAN': 'C-SCAN',
    'LOOK': 'LOOK',
    'Circular-LOOK': 'C-LOOK',
  };

  const navigate = useNavigate();

  const handleNavigate = (algorithm) => {
    const algorithmAcronym = algoAcronyms[algorithm];
    sessionStorage.setItem('selectedAlgorithm', algorithmAcronym);
    navigate('/input');
  };

  const displayButtons = (datum) => {
    return (
      <>
        <div className="col-md-6">
          <button
            type="button"
            onClick={() => handleNavigate(datum)}
            className="w-100 m-1 mt-3 btn btn-lg btn-danger btn-block"
          >
            {datum}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="text-center">
      <h1>Disk Scheduling Simulator</h1>
      <h4>By Gallego & Garcia</h4>
      <div className='m-5'>
        <h3 className="text-start">Choose an Algorithm:</h3>

        <div className="container" style={{ maxWidth: '950px' }}>
          <div className="row">
            {algos.map((data, index) => {
              return displayButtons(data, index);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
