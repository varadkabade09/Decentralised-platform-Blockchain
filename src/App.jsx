import { Routes, Route } from 'react-router-dom'
import Profile from './Profile'
import Fhome from './pages/Fhome.jsx'
import Fmessages from './pages/Fmessages.jsx'
import CreateJob from './components/CreateJob.jsx'
import {
  Home,
  JobListing,
  MyProjects,
  Chats,
  ViewBidders,
  MyBids,
  MyJobs,
  RecentConversations,
} from './pages'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { isWalletConnected } from './services/blockchain'
import AuthenticatedRoutes from './utils/AuthenticatedRoutes'
import Authenticate from './pages/Authenticate'
import { useGlobalState } from './store'
import Login from './components/Login.jsx';

const App = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  useEffect(() => {
    isWalletConnected()
  }, [connectedAccount])

  return (
    <div className="min-h-screen font-[poppins]">
      <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/chome" element={<Home />} />
        <Route path="/fhome" element={<Fhome />} />
        <Route path="/create" element={<CreateJob />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/joblisting/:id" element={<JobListing />} />
        <Route path="/myprojects" element={<MyProjects />} />
        <Route path="/viewbidders/:id" element={<ViewBidders />} />
        <Route path="/mybids" element={<MyBids />} />
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/authenticate" element={<Authenticate />} />

        <Route element={<AuthenticatedRoutes />}>
          <Route path="/messages" element={<RecentConversations />} />
          <Route path="/fmessages" element={<Fmessages />} />
          <Route path="/chats/:id" element={<Chats />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
