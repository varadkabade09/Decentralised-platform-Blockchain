import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'
import { BsList, BsX } from 'react-icons/bs'
import MobileHeader from './MobileHeader'


const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [showSettings, setShowSettings] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <header className="bg-white w-full mx-auto p-5 flex justify-between items-center flex-wrap shadow-md">
      
      
      <Link className="text-green-600 font-[risque] text-2xl" to={'/chome'}>
        Fiver
      </Link>
      <div className="items-center space-x-5 md:block hidden">
        <Link to={'/mybids'} className="text-gray-600">
          {/* My Bids */}
        </Link>
        
        <Link to={'/myprojects'} className="text-gray-600">
          My Projects
        </Link>
        <Link to={'/messages'} className="text-gray-600">
          Messages
        </Link>
        

        {connectedAccount ? (
          <>
          <button className="bg-green-500 text-white py-1 px-5 rounded-full">
            {/* {truncate(connectedAccount, 4, 4, 11)} */}
            <button className="" onClick={handleClick}>My Profile</button>

            {showSettings && (
              <div className="bg-white p-8 text-left shadow-md rounded-md p-2 absolute top-14 right-28 z-10 ">
              <a href="/profile" className="block mb-2 text-gray-600">View Profile</a>
              <a href="/" className="block mt-4 text-gray-600">Sign out</a>
            </div>
            )}
           
          </button>
          
          </>
        ) : (
          <button
            className="bg-green-500 text-white py-1 px-5 rounded-full"
            onClick={connectWallet}
          >
            
            connect wallet
          </button>
        )}
      </div>

      <div className="md:hidden block relative" onClick={handleToggle}>
        {!isOpen ? (
          <BsList className="text-2xl cursor-pointer" />
        ) : (
          <BsX className="text-2xl cursor-pointer" />
        )}
        <MobileHeader toggle={isOpen} />
      </div>
    </header>
  )
}

export default Header
