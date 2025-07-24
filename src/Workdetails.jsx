import { useState } from 'react'
import { ref, set } from 'firebase/database'
import { auth } from './firebase'
import { db } from './firebase'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

const Workdetails = () => {
  const initialdata = {
    Areyoucurrentlyemployed: "",
    jobrole: "",
    location: "",
  }

  const [workdata, setWorkData] = useState(initialdata)
  const navigate = useNavigate()

  const handledata = (e) => {
    const { name, value } = e.target
    setWorkData((prev) => ({ ...prev, [name]: value }))
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const user = auth.currentUser;
      const uid = user.uid;
      await set(ref(db, `users/${uid}/workdetails`), {
        ...workdata
      });
      navigate("/edit")
    } catch (err) {
      console.log(err);
    }
  }
   useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,user=> {
      if(!user){
        navigate("/")
      }
    })
    
    return ()=> unsubscribe ()
  },[])

  return (
    <div>
      <h1 className='text-center mt-4 text-2xl font-bold'>Work Details</h1>
      <div className='md:w-140 md:mx-auto md:shadow-[0_4px_10px_rgba(165,42,42,0.8)] md:rounded-sm md:pb-10 mt-8'>
        <div className='md:mt-12 md:w-130 md:mx-auto'>
          <form onSubmit={handlesubmit} className='flex flex-col px-3'>
            <div className='flex mt-10 text-xl'>
              <p>Are you Employed</p>
              <label htmlFor="yes" className='pl-6'>yes
                <input
                  type="radio"
                  id='yes'
                  className='ml-1'
                  value="yes"
                  onChange={handledata}
                  name='Areyoucurrentlyemployed'
                  required
                  checked={workdata.Areyoucurrentlyemployed === "yes"}
                />
              </label>

              <label htmlFor="no" className='pl-6'>no
                <input
                  type="radio"
                  id='no'
                  className='ml-1'
                  value="no"
                  onChange={handledata}
                  name='Areyoucurrentlyemployed'
                  required
                  checked={workdata.Areyoucurrentlyemployed === "no"}
                />
              </label>
            </div>

            <label htmlFor="jobrole" className='text-xl mt-6'>Desired Job Role</label>
            <input
              type="text"
              id='jobrole'
              className='border-2 border-black rounded-sm px-1 mt-1 py-2'
              value={workdata.jobrole}
              onChange={handledata}
              name='jobrole'
              required
              placeholder='type your job role here'
            />

            <label htmlFor="location" className='mt-6 text-xl'>Preferred Location</label>
            <input
              type="text"
              id='location'
              className='border-2 border-black rounded-sm px-1 mt-1 py-2'
              value={workdata.location}
              onChange={handledata}
              name='location'
              required
              placeholder='type your location here'
            />

            <button
              type='submit'
              className='bg-green-400 mt-6 allbtnstyle w-20 mx-auto rounded-sm py-2'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Workdetails
