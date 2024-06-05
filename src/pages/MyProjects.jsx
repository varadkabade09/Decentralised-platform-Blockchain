import React, { useState, useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { DeleteJob, Header, JobListingOwnerActions, Payout, UpdateJob } from '../components';
import { useGlobalState } from '../store';

const MyProjects = () => {
  const [progressval, setProgressval] = useState(0);
  const [myjobs] = useGlobalState('myjobs');
  const [connectedAccount] = useGlobalState('connectedAccount');

  useEffect(() => {
    const storedProgress = localStorage.getItem('val');
    if (storedProgress && !isNaN(parseFloat(storedProgress))) {
      setProgressval(parseFloat(storedProgress));
    }
  }, []);

  const handleProgressChange = (e) => {
    const newProgressval = parseFloat(e.target.value);
    if (!isNaN(newProgressval)) {
      localStorage.setItem('val', newProgressval);
      setProgressval(newProgressval);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-5 my-7 font-[Signika]">
        {myjobs.map((myjob, i) => (

          <div key={i} className="my-5 p-4 bg-white rounded sha`dow-md font-[Signika]">
            
            <JobListingOwnerActions
              jobListing={myjob}
              editable={myjob.owner === connectedAccount}
            />
          </div>
        ))}
        {myjobs.length < 1 && (
          <h2 className="text-lg text-gray-500 mt-4 font-[Signika]">No Posted Jobs Yet</h2>
        )}
        <div className="flex justify-between mt-5">
          <UpdateJob />
          <DeleteJob />
          <Payout />
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
