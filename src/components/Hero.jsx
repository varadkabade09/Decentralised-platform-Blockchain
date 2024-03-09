import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGlobalState, setGlobalState } from '../store';
import JobListingCard from './JobListingCard';
import ProgressBar from '@ramonak/react-progress-bar';

const Hero = () => {
  const storedProgress = localStorage.getItem('val');
  const [progressval, setProgressval] = useState(storedProgress ? parseFloat(storedProgress) : 0);
  const [jobs] = useGlobalState('jobs');

  const openModal = () => {
    setGlobalState('createModal', 'scale-100');
  };

  const handleProgressChange = (e) => {
    const newProgressval = e.target.value;
    localStorage.setItem('val', newProgressval);
    console.log('New progressval:', newProgressval);
    setProgressval(parseFloat(newProgressval));
    setGlobalState('progressval', parseFloat(newProgressval));
  };

  useEffect(() => {
    // Update the progress value when localStorage changes
    const storedProgress = localStorage.getItem('val');
    if (storedProgress) {
      setProgressval(parseFloat(storedProgress));
      setGlobalState('progressval', parseFloat(storedProgress));
    }
  }, []);

  return (
    <section className="min-h-[89vh]">
      <button
        className="p-3 bg-green-500 rounded-full text-white fixed bottom-7 right-2"
        onClick={openModal}
      >
        <FaPlus />
      </button>
      <main className="mt-11 sm:px-11 px-3">
        <div className="p-3">
          <h3 className="text-gray-600 text-2xl border-[1px] rounded-t-lg border-gray-300 py-5 px-3">
            {jobs.length > 0 ? 'Job listings' : 'No jobs yet'}
          </h3>
          {jobs.length > 0 &&
            jobs.map((job, index) => (
              <div key={index} className="flex items-start mb-4">
                <div className="flex-1 pr-4">
                  <JobListingCard jobListing={job} />
                </div>
                {/* <div className="pr-56 flex flex-col items-start">
                  <h1 className="mb-2 text-gray-600">Progress of Freelancer</h1>
                  <div className="p-4">
                    <ProgressBar className="w-[320px]" completed={progressval} />
                  </div>
                  <div className="flex items-center mb-2">
                    <label htmlFor="progress" className="mr-2">
                      Enter the progress
                    </label>
                    <input
                      type="number"
                      value={progressval}
                      onChange={handleProgressChange}
                      placeholder="Progress"
                      className="border rounded px-2 py-1"
                    />
                  </div>
                </div> */}
              </div>
            ))}
        </div>
      </main>
    </section>
  );
};

export default Hero;
