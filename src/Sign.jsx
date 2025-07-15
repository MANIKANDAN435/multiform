import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [showpassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // ✅ Move regex outside so it's reusable
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!passwordRegex.test(password)) return;

    try {
      const usercredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = usercredential.user;

      await updateProfile(user, {
        displayName: username
      });

      await set(ref(db, `users/${user.uid}/authinfo`), {
        fullname: username,
        email: user.email
      });

      alert('User registered successfully!');
      navigate("/personaldata");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please log in instead.");
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div>
      <h1 className='text-center mt-4 text-2xl font-bold'>Create Account</h1>
      <div className='md:shadow-[0_4px_10px_rgba(165,42,42,0.8)] md:w-140 md:mx-auto md:mt-15 md:py-5 md:bg-[rgb(220, 208, 168)] md:rounded-sm ' >

      <form onSubmit={handleSignup} className='flex flex-col md:items-center md:pb-6'>

        {/* Name */}
        <div className='px-2'>
          <input type="text" required value={username} onChange={(e) => setUserName(e.target.value)}
           className='w-80 md:w-120 border-black border-2 p-2 rounded-sm mt-12'
            placeholder='Type your name here'
          />
        </div>

        {/* Email */}
        <div className='px-2'>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className='w-80 border-black border-2 p-2 rounded-sm mt-8 md:w-120'
          />
        </div>

        {/* Password with toggle */}
        <div className='relative px-2'>
          <input
            type={showpassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className={`w-60 md:w-100 border-2 p-2 rounded-sm mt-8 md:translate-x-[-38px] ${
              !passwordRegex.test(password) && isSubmitted ? "border-red-500" : "border-black"
            }`}
          />
          <button
            type='button'
            className="absolute  md:right-[-30px] right-12 top-14  -translate-y-1/2 flex items-center gap-1 text-black text-lg"
            onClick={() => setShowPassword((curr) => !curr)}
          >
            {showpassword ? <>Hide <IoMdEyeOff /></> : <>Show <IoMdEye /></>}
          </button>
        </div>

        {/* Password error message */}
        {!passwordRegex.test(password) && isSubmitted && (
          <p className="text-red-500 text-sm mt-1 ml-3">
            ⚠ Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
          </p>
        )}

        {/* Buttons */}
        <div className='flex justify-evenly md:w-100 w-70'>
          <button className='bg-green-400 rounded-sm px-2 py-1 mt-8  allbtnstyle' type="submit">Create Account</button>
          <button className='bg-black rounded-sm text-white px-2 py-1 mt-8  allbtnstyle' type='button' onClick={() => navigate("/")}>Back</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Signup;
