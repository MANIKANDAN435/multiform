import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try { 
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/reviewdetails');
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form onSubmit={handleLogin} className="flex flex-col md:border-2 border-black p-3 md:p-6 rounded-md w-96">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

        <label>Email</label>
        <input
          type="email"
          className="border px-2 py-2 rounded-sm mt-1 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          className="border px-2 py-2 rounded-sm mt-1 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button type="submit" className="bg-green-400 py-2 rounded-sm mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
