import { useState } from 'react';


import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('freelancer');
  const navigate= useNavigate();
  const ClickRegister = () =>{
    navigate('/');
  }

  const handleLogin = async(e) => {
    localStorage.setItem('email',email);
    localStorage.setItem('password',password);
    localStorage.setItem('role',role);
    e.preventDefault();
    try {
      
      console.log(role)
      if( role=="client"){
        navigate('/chome')
      }
      else{
        navigate('/fhome')
      }
     
    } catch (error) {
      console.error('Error:', error.response.data.message);
     
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-2 flex-col justify-center px-6 py-12 lg:px-8 font-[Signika]" style={{backgroundImage: 'url()', backgroundSize: 'cover', backgroundPosition: 'left'}} >
        <div class></div>
        <div className="sm:mx-auto sm:w-full font-[Signika] ">
        <h2 className="mt-5 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-900">
            Decentralized Freelance Marketplace
          </h2>
          <h2 className="mt-10 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm border-2 rounded-md py-2 px-4">
          
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Role selection */}
            <div>
              <label htmlFor="role" className="block text-lg font-medium leading-6 text-gray-900 mb-2 mt-2">
                Select Role
              </label>
              <select
              style={{ paddingLeft: '10px' }}
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:leading-6"
              >
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block  leading-2 text-gray-900 text-lg font-medium">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-lg font-medium"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between ">
                <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className=" text-indigo-600 hover:text-indigo-500 text-lg font-medium">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-lg font-medium"
                />
              </div>
            </div>

            {/* Sign in button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5  leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-lg font-medium"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Register link */}
          <p className="mt-10 text-center  text-gray-500 text-lg font-medium">
            New User?{' '}
            <button onClick={ClickRegister} className=" leading-6 text-indigo-600 hover:text-indigo-500 text-lg font-medium">
              Register here
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;