import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      try {
        // Check if MetaMask is connected
        await window.ethereum.request({ method: 'eth_accounts' });
      } catch (error) {
        console.error('MetaMask not connected:', error);
      }
    };

    checkMetaMaskConnection();
  }, []); // Run only once on component mount

  const handleConnectMetamask = async () => {
    try {
      setLoading(true); // Show loader when connecting
      // Connect to Metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const selectedAccount = accounts[0];
      console.log('Connected Account:', selectedAccount);
      
      localStorage.setItem('role', role);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
     
      setLoading(false); 
    } catch (error) {
      console.error('Failed to connect Metamask:', error);
      setLoading(false); // Hide loader if connection fails
    }
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      // Connect MetaMask before login
      handleConnectMetamask();

      // Assuming MetaMask is connected and data retrieval is successful
      console.log(role);
      if(role=="client")
      {
        navigate('/clienthome')}
      else{
        navigate('/freelancerhome');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-[Signika]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm font-[Signika]">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-[Signika]">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLoginFormSubmit}>
          <div>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Select Role
              </label>
              <select
                style={{ paddingLeft: '10px' }}
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="ml-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="freelancer">FreeLancer</option>
                <option value="client">Client</option>
              </select>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  style={{ paddingLeft: '10px' }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between font-[Signika]">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  style={{ paddingLeft: '10px' }}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Your form fields here */}

            {/* Sign in button */}
            <div>
              <button
                type="submit"
                className=" font-[Signika] flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
