import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { ref, set, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Personaldata = () => {
  const initialdata = { fullname: '', email: '', phoneno: '' };
  const [personaldetails, setPersonalDetails] = useState(initialdata);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const snap = await get(ref(db, `users/${user.uid}/personaldata`));  
        if (snap.exists()) {
          setPersonalDetails(snap.val());
        } else {
          setPersonalDetails((prev) => ({ ...prev, email: user.email ,fullname : user.displayName}));
        }
      }else{
        navigate("/")
      }
    });
    return () => unsubscribe();
  }, []);   

  const handlepersonaldata = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();


    try {
      await set(ref(db, `users/${uid}/personaldata`), { ...personaldetails });
      navigate('/education');
    } catch (error) {
      console.log('Error saving personal data:', error);
    }
  };

  return (
    <div>
      <h1 className='text-center mt-4 text-2xl font-bold'>Personal Details</h1>

      <div className='md:shadow-[0_4px_10px_rgba(165,42,42,0.8)] md:w-140 md:mx-auto md:mt-15 md:py-5 md:bg-[rgb(220, 208, 168)] md:rounded-sm'>

        <form onSubmit={handlesubmit} className='flex flex-col mt-5 mx-5 md:w-120 md:mx-auto'>
          <label htmlFor="fullname" className='mt-4'>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={personaldetails.fullname}
            onChange={handlepersonaldata}
            required
            id="fullname"
            placeholder="full name"
            className='border-black border-2 px-3 py-2 mt-1 rounded-sm'
          />

          <label htmlFor="email" className='mt-4'>Email</label>
          <input
            type="text"
            name="email"
            value={personaldetails.email}
            onChange={handlepersonaldata}
            required
            id="email"
            placeholder="email"
            className='border-black border-2 px-3 py-2 mt-1 rounded-sm'
          />

          <label htmlFor="phoneno" className='mt-4'>Phone number</label>
          <input
            type="text"
            name="phoneno"
            value={personaldetails.phoneno}
            onChange={handlepersonaldata}
            required
            maxLength={10}
            inputMode="numeric"
            id="phoneno"
            placeholder="mobile no"
            className='border-black border-2 px-3 py-2 mt-1 rounded-sm'
          />

          <button type="submit" className='bg-green-400 mt-6 allbtnstyle w-20 mx-auto rounded-sm py-2'>Submit</button>
        </form>

      </div>
    </div>
  );
};

export default Personaldata;
