import { toast } from 'react-toastify';
import { Header } from '../components';
import { loginWithCometChat, signUpWithCometChat } from '../services/chat';
import { setGlobalState, useGlobalState } from '../store';
import { useNavigate } from 'react-router-dom';



const Authenticate = () => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const user = await signUpWithCometChat(connectedAccount);
      toast.success('Signed up successfully, please login 👌');
      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Encountered error while signing up 🤯');
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      const user = await loginWithCometChat(connectedAccount);
      setGlobalState('currentUser', user);
      navigate('/messages');
      toast.success('Logged in successfully 👌');
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Encountered error while logging in 🤯');
      throw error;
    }
  };

  return (
    <>
      <Header />

      <div className="w-full sm:w-3/5 mx-auto mt-8 px-3 font-[Signika]">
        <h1 className="text-2xl font-bold text-center">Chats Authentication</h1>
        <p className="text-center">
          Login or sign up to chat with your client.
        </p>

        <div className="flex justify-center items-center space-x-3 mt-5 font-[Signika]">
          <button
            onClick={() => toast.promise(handleLogin(), {
              pending: 'Logging...',
              success: 'Logged in successfully 👌',
              error: 'Encountered error while logging in 🤯',
            })}
            className="flex justify-center items-center space-x-1 py-1 px-5 rounded-full font-[Signika]
          bg-blue-500 text-white max-sm:text-sm"
          >
            Login
          </button>
          <button
            onClick={() => toast.promise(handleSignUp(), {
              pending: 'Signing up...',
              success: 'Signed up successfully, please login 👌',
              error: 'Encountered error while signing up 🤯',
            })}
            className="py-1 px-5 rounded-full bg-green-500 text-white max-sm:text-sm"
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default Authenticate;
