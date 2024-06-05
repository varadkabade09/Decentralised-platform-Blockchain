import React from 'react'
import { jobs } from '../store/data'
import { Header, JobListingOwnerActions } from "../components";
import UpdateJob from '../components/UpdateJob';

const JobListing = () => {
  return (
    <div className="font-[Signika]">
      <Header />
      <div className="mt-8 px-8 font-[Signika]">
  
        <JobListingOwnerActions jobListing={jobs} editable={true} />
        
        <UpdateJob />
        
      </div>
    </div>
  );
}

export default JobListing