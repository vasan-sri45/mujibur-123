import React, { useEffect } from 'react'
import CandidateCard from './components/CandidateCard';

const App = () => {

   useEffect(() => {
    document.title = "M. MUJIBUR RAHMAN";
  }, []);

  return (
    <div >
      <CandidateCard />
    </div>
  )
}

export default App
