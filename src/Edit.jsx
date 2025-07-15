import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [personalData, setPersonalData] = useState({});
  const [educationData, setEducationData] = useState({});
  const [workData, setWorkData] = useState({});

  const [originalPersonalData, setOriginalPersonalData] = useState({});
  const [originalEducationData, setOriginalEducationData] = useState({});
  const [originalWorkData, setOriginalWorkData] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        try {
          const personalSnap = await get(ref(db, `users/${user.uid}/personaldata`));
          const educationSnap = await get(ref(db, `users/${user.uid}/education`));
          const workSnap = await get(ref(db, `users/${user.uid}/workdetails`));

          const personal = personalSnap.exists() ? personalSnap.val() : {};
          const education = educationSnap.exists() ? educationSnap.val() : {};
          const work = workSnap.exists() ? workSnap.val() : {};

          setPersonalData(personal);
          setEducationData(education);
          setWorkData(work);

          setOriginalPersonalData(personal);
          setOriginalEducationData(education);
          setOriginalWorkData(work); 
        } catch (err) {
          console.error('Failed to fetch data:', err);
        }
      } else {
      navigate("/")
      }
    });

    return () => unsubscribe();
  }, []);

  const isDataChanged = () => {
    return (
      JSON.stringify(personalData) !== JSON.stringify(originalPersonalData) ||
      JSON.stringify(educationData) !== JSON.stringify(originalEducationData) ||
      JSON.stringify(workData) !== JSON.stringify(originalWorkData)
    );
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPersonalData(originalPersonalData);
    setEducationData(originalEducationData);
    setWorkData(originalWorkData);
    setIsEditing(false);
  };

const handleSubmit = async () => {
  if (isDataChanged()) {
    try {
      await set(ref(db, `users/${uid}/personaldata`), personalData);
      await set(ref(db, `users/${uid}/education`), educationData);
      await set(ref(db, `users/${uid}/workdetails`), workData);
      await set(ref(db, `users/${uid}/meta`), { submitted: true });

      alert('All details submitted successfully!');

      // 🔒 Sign out user
      await signOut(auth);

      // 🔁 Redirect to login or home
      navigate('/');
    } catch (err) {
      console.error('Error saving data:', err);
    }
  } else {
    console.log('No changes made');

    // Still log out and navigate if already submitted
    await signOut(auth);
    navigate('/');
  }
};

  return (
    <div className="p-4 max-w-2xl mx-auto ">
      <h2 className="text-center text-2xl font-bold mb-4">Review Your Details</h2>
    <div >
      {/* PERSONAL DETAILS */}
      <div className="border border-black rounded p-4 mb-4 md:mt-10 md:shadow-[0_4px_10px_rgba(165,42,42,0.8)]">
        <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
        <p className="mb-2"><strong>Full Name:</strong><br />
          {isEditing ? (
            <input
              value={personalData.fullname || ''}
              onChange={(e) =>
                setPersonalData((prev) => ({ ...prev, fullname: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            personalData.fullname || 'N/A'
          )}
        </p>
        <p className="mb-2"><strong>Email:</strong><br />
          {isEditing ? (
            <input
              value={personalData.email || ''}
              onChange={(e) =>
                setPersonalData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            personalData.email || 'N/A'
          )}
        </p>
        <p><strong>Phone No:</strong><br />
          {isEditing ? (
            <input
              value={personalData.phoneno || ''}
              onChange={(e) =>
                setPersonalData((prev) => ({ ...prev, phoneno: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            personalData.phoneno || 'N/A'
          )}
        </p>
      </div>

      {/* EDUCATION DETAILS */}
      <div className="border border-black rounded p-4 mb-4 md:mt-10 md:shadow-[0_4px_10px_rgba(165,42,42,0.8)]">
        <h3 className="font-semibold text-lg mb-2">Education Details</h3>
        <p className="mb-2"><strong>Qualification:</strong><br />
          {isEditing ? (
            <input
              value={educationData.qualification || ''}
              onChange={(e) =>
                setEducationData((prev) => ({ ...prev, qualification: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            educationData.qualification || 'N/A'
          )}
        </p>
        <p className="mb-2"><strong>University:</strong><br />
          {isEditing ? (
            <input
              value={educationData.university || ''}
              onChange={(e) =>
                setEducationData((prev) => ({ ...prev, university: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            educationData.university || 'N/A'
          )}
        </p>
        <p><strong>Year of Passing:</strong><br />
          {isEditing ? (
            <input
              value={educationData.yearofpassing || ''}
              onChange={(e) =>
                setEducationData((prev) => ({ ...prev, yearofpassing: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            educationData.yearofpassing || 'N/A'
          )}
        </p>
      </div>

      {/* WORK DETAILS */}
      <div className="border border-black rounded p-4 mb-4 md:mt-10 md:shadow-[0_4px_10px_rgba(165,42,42,0.8)]">
        <h3 className="font-semibold text-lg mb-2">Work Details</h3>
        <p className="mb-2"><strong>Employed:</strong><br />
          {isEditing ? (
            <input
              value={workData.Areyoucurrentlyemployed || ''}
              onChange={(e) =>
                setWorkData((prev) => ({ ...prev, Areyoucurrentlyemployed: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            workData.Areyoucurrentlyemployed || 'N/A'
          )}
        </p>
        <p className="mb-2"><strong>Job Role:</strong><br />
          {isEditing ? (
            <input
              value={workData.jobrole || ''}
              onChange={(e) =>
                setWorkData((prev) => ({ ...prev, jobrole: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            workData.jobrole || 'N/A'
          )}
        </p>
        <p><strong>Preferred Location:</strong><br />
          {isEditing ? (
            <input
              value={workData.location || ''}
              onChange={(e) =>
                setWorkData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="border px-2 py-1 mt-1 w-full"
            />
          ) : (
            workData.location || 'N/A'
          )}
        </p>
      </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="bg-yellow-400 px-4 py-2 rounded allbtnstyle">Edit</button>
        ) : (
          <>
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded allbtnstyle">Save</button>
            <button onClick={handleCancel} className="bg-gray-400 px-4 py-2 rounded ">Cancel</button>
          </>
        )}
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded allbtnstyle">Submit</button>
      </div>
    </div>
  );
};

export default Edit;
