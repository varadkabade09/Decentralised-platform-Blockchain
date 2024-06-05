import React, { useState, useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import {
  FaEthereum,
  FaPenAlt,
  FaTrashAlt,
  FaMoneyBill,
  FaArrowRight,
} from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { setGlobalState } from '../store'
import { Link, useNavigate } from 'react-router-dom'
import { getAcceptedFreelancer } from '../services/blockchain'

const JobListingOwnerActions = ({ jobListing, editable }) => {
  const [check,setCheck]=useState(false);
  const storedProgress = localStorage.getItem('val');
  const [progressval, setProgressval] = useState(storedProgress ? parseFloat(storedProgress) : 0);
  const getFreelancer = async () => {
    await getAcceptedFreelancer(jobListing?.id)
  }
  useEffect(() => {
    getFreelancer()
  }, [])
  const navigate = useNavigate();

  const handleProgressChange = (e) => {
    const newProgressval = e.target.value;
    localStorage.setItem('val', newProgressval);
    const val = localStorage.getItem('val')
    setProgressval(parseFloat(newProgressval));
    if(val>=100){
      setCheck(true);
    }
    else{
      setCheck(false);
    }
    
  };


  const openUpdateModal = () => {
    setGlobalState('updateModal', 'scale-100')
    setGlobalState('jobListing', jobListing)
  }

  const openPayoutModal = () => {
    setGlobalState('payoutModal', 'scale-100')
    setGlobalState('jobListing', jobListing)
  }

  const openDeleteModal = () => {
    setGlobalState('deleteModal', 'scale-100')
    setGlobalState('jobListing', jobListing)
  }

  const viewBidders = (id) => {
    navigate(`/viewbidders/${id}`)
  }

  return (
    <div className="border-t border-b border-l border-r border-gray-300 py-3 px-5 mt-2 font-[Signika]">

      <div>
        <div className='flex  font-[Signika]'>
          <h4>{jobListing.jobTitle}</h4>
          {!jobListing.listed && (<h1 className="text-lg font-semibold text-gray-800 ml-[470px] font-[Signika]">Progress of Freelancer</h1>)}
        </div>

        <div className="flex mt-2 items-center">
          <FaEthereum className="text-md cursor-pointer" />

          <span className="text-md">{jobListing.prize}</span>
          {!jobListing.listed && (
          <div className=" ml-[530px]">
            <ProgressBar className="w-[400px]" completed={progressval} bgColor="green" />
          </div>)}
    
        </div>
        <div className="flex items-center mt-3 text-sm flex-wrap gap-3">

          {jobListing.tags.length > 0
            ? jobListing.tags.map((tag, i) => (
              <div>
                <button key={i} className="px-4 py-1 bg-gray-200 rounded-lg mr-2">
                  {tag}
                </button>

              </div>

            ))
            : null}
            {!jobListing.listed && (
          <div className='ml-[350px] flex flex-col'>
            <label htmlFor="progress" className=" mr-2 text-gray-600">
              Enter the progress
            </label>
            <input
            type="number"
            value={progressval}
            onChange={handleProgressChange}
            placeholder="Progress"
            className="border rounded px-3 py-1 text-gray-700 mt-4"
          />
          </div>)}
        </div>
      </div>



      <p className="pr-7 mt-5 text-sm">{jobListing.description}</p>
      <div className="flex space-x-2">
        {editable && !jobListing.paidOut && (
          <div className="flex mt-5 space-x-3">
            {jobListing.listed && (
              <>
                <button
                  onClick={openUpdateModal}
                  className="flex items-center px-3 py-1 border-[1px] border-green-500 text-green-500 space-x-2 rounded-md"
                >
                  <FaPenAlt />
                  <span className="text-sm">Update</span>
                </button>
                <button
                  onClick={openDeleteModal}
                  className="flex items-center px-2 py-1 border-[1px] border-red-500 text-red-500 space-x-2 rounded-md text-sm"
                >
                  <FaTrashAlt />
                  <span className="text-sm">Delete</span>
                </button>

                {jobListing.freelancer !=
                  '0x0000000000000000000000000000000000000000' && (
                    <Link
                      to={`/chats/${jobListing.freelancer}`}
                      className="flex items-center px-3 py-1 border-[1px] border-green-500 text-green-500 space-x-2 rounded-md font-[Signika]"
                    >
                      <span className="text-sm">Chat with freelancer</span>
                    </Link>
                  )}

              </>
            )}

            {jobListing.listed && (
              <button
                className="text-sm py-1 px-3 bg-green-400 text-white flex items-center space-x-3 rounded-md font-[Signika]"
                onClick={() => viewBidders(jobListing.id)}
              >
                <span>View bidders</span>
                <FaArrowRight className="-rotate-45" />
              </button>
            )}
            {!jobListing.listed && !jobListing.paidOut && (
              <>
                {check && (
                  <>
                <button
                  onClick={openPayoutModal}
                  className="flex items-center px-3 py-1 border-[1px] border-sky-500 text-sky-500 space-x-2 rounded-md font-[Signika]"
                >
                  <FaMoneyBill />
                  <span className="text-sm">Pay</span>
                </button>
                </>
              )}
              {check && (
                  <>
                <a
                target="_blank" 
                  href='https://pages.razorpay.com/pl_NwzhgXN98CmbtY/view'
                  className="flex items-center px-3 py-1 border-[1px] border-sky-500 text-sky-500 space-x-2 rounded-md font-[Signika]"
                >
                  <FaMoneyBill />
                  <span className="text-sm">Pay using Card/UPI</span>
                </a>
                </>
              )}
                {jobListing.freelancer !=
                  '0x0000000000000000000000000000000000000000' && (
                    <Link
                      to={`/chats/${jobListing.freelancer}`}
                      className="flex items-center px-3 py-1 border-[1px] border-green-500 text-green-500 space-x-2 rounded-md font-[Signika]"
                    >
                      <span className="text-sm">Chat with freelancer</span>
                    </Link>
                  )}
                <div>
                </div>

              </>

            )}
          </div>
        )}

        {editable && jobListing.paidOut == true && (
          <div className="">
            <button className="text-sm px-2 py-1 text-green-600 mt-3 flex items-center space-x-1">
              <span>Completed</span>
              <IoMdCheckmarkCircleOutline />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobListingOwnerActions;
