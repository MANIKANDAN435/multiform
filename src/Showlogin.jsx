
import { useNavigate } from 'react-router-dom'

const Showlogin = () => {
    const navigate = useNavigate()
   
  return (
    <div>
      
      <h1 className='text-center mt-3 text-2xl font-bold' >JOB APPLICATION FORM</h1>
    <div className='flex justify-center md:mt-40 mt-30 ' >
    <div className='btncontainer' >
        <div className=' flex justify-center items-center min-h-80'>
        <button className='mx-6 btnstyle1 btnstyle2'  onClick={()=>navigate("/login")}  >Sign up</button>
        <button  className='mx-6 btnstyle1' onClick={()=>navigate("/signup")} >Login</button>
        </div>
        
    </div>
    </div>
    </div>
  )
}

export default Showlogin
