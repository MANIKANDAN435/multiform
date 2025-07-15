import { useState } from 'react'
import { ref, set } from 'firebase/database'
import { auth } from './firebase'
import { db } from './firebase'
import { useNavigate } from 'react-router-dom'

const Education = () => {
  const initialdata = {
    qualification: "",
    university: "",
    yearofpassing: ""
  }

  const [educationdata, setEducationData] = useState(initialdata)
  const navigate = useNavigate()

  const handledata = (e) => {
    const { name, value } = e.target
    setEducationData((prev) => ({ ...prev, [name]: value }))
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const user = auth.currentUser
      if (!user) {
        alert("User not logged in!")
        return
      }
      const uid = user.uid
      await set(ref(db, `users/${uid}/education`), {
        ...educationdata
      })
      navigate("/workdetails")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1 className='text-center mt-4 text-2xl font-bold'>Educational Qualification</h1>

      <div className='md:w-140 md:mx-auto md:shadow-[0_4px_10px_rgba(165,42,42,0.8)] md:rounded-sm md:pb-10 mt-8 md:mt-15 md:pt-3'>

        <form onSubmit={handlesubmit} className='flex flex-col px-4 mt-8 md:w-120 md:mx-auto'>

          <label htmlFor="qualification" className='text-xl'>Highest Qualification</label>
          <input
            type="text"
            id='qualification'
            value={educationdata.qualification}
            onChange={handledata}
            name='qualification'
            required
            placeholder='type your qualification'
            className='border-2 border-black rounded-sm px-1 mt-1 py-2'
          />

          <label htmlFor="university" className='mt-8 text-xl'>University Name</label>
          <input
            type="text"
            id='university'
            value={educationdata.university}
            onChange={handledata}
            name='university'
            required
            placeholder='type here university name'
            className='border-2 border-black rounded-sm px-1 mt-1 py-2'
          />

          <label htmlFor="yearofpassing" className='mt-8 text-xl'>Year of passing</label>
          <input
            type="date"
            id='yearofpassing'
            value={educationdata.yearofpassing}
            onChange={handledata}
            name='yearofpassing'
            required
            className='border-2 border-black rounded-sm px-1 mt-1 py-2'
         
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
  )
}

export default Education
