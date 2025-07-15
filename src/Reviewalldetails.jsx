import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Reviewalldetails = () => {
  const [personalData, setPersonalData] = useState({});
  const [educationData, setEducationData] = useState({});
  const [workData, setWorkData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          setLoading(true);

          const personalSnap = await get(ref(db, `users/${uid}/personaldata`));
          const educationSnap = await get(ref(db, `users/${uid}/education`));
          const workSnap = await get(ref(db, `users/${uid}/workdetails`));

          setPersonalData(personalSnap.exists() ? personalSnap.val() : {});
          setEducationData(educationSnap.exists() ? educationSnap.val() : {});
          setWorkData(workSnap.exists() ? workSnap.val() : {});
        } catch (err) {
          console.error('Failed to fetch data:', err);
        } finally {
          setLoading(false);
        }
      } else {
        alert('You are not logged in');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="readbosshead">
      <h2 className="readheading">Read Only</h2>
      <div className="readallheaddiv">

        {/* Personal Details */}
        <div className="borederforreadhead shadow-colored">
          <h3 className="readallhead">Personal Details</h3>
          <p className="readallsubhead">
            <strong>Full Name:</strong> {personalData.fullname || 'N/A'}
          </p>
          <p><strong>Email:</strong> {personalData.email || 'N/A'}</p>
          <p><strong>Phone No:</strong> {personalData.phoneno || 'N/A'}</p>
        </div>

        {/* Education Details */}
        <div className="borederforreadhead shadow-colored">
          <h3 className="readallhead">Education Details</h3>
          <p className="readallsubhead">
            <strong>Qualification:</strong> {educationData.qualification || 'N/A'}
          </p>
          <p><strong>University:</strong> {educationData.university || 'N/A'}</p>
          <p><strong>Year of Passing:</strong> {educationData.yearofpassing || 'N/A'}</p>
        </div>

        {/* Work Details */}
        <div className="borederforreadhead shadow-colored">
          <h3 className="readallhead">Work Details</h3>
          <p className="readallsubhead">
            <strong>Employed:</strong> {workData.Areyoucurrentlyemployed || 'N/A'}
          </p>
          <p><strong>Job Role:</strong> {workData.jobrole || 'N/A'}</p>
          <p><strong>Preferred Location:</strong> {workData.location || 'N/A'}</p>
        </div>
      </div>

      <div className="flex justify-center md:mt-10 mt-5 md:hover:scale-110 md:transition-transform duration-300">
        <button
          className="px-2 py-1 bg-black text-white rounded-sm"
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Reviewalldetails;
