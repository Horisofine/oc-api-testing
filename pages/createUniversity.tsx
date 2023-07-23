// pages/UniversityCreationPage.js
import University from '@/models/university';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../private/firebaseconfig'; // Replace '../firebase' with the path to your Firebase config and initialization file

const UniversityCreationPage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [faculties, setFaculties] = useState('');

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Split the facultyInput string by commas to get individual faculty names
    const facultiesArray = faculties.split(',').map((faculty) => faculty.trim());

    try {
      // Step 1: Create a new University document in Firestore
      const universityData = {
        name,
        location,
        facultiesArray, // Split faculties string and convert to array
      };

      await addDoc(collection(firestore, 'universities'), universityData);
      console.log('University created successfully');
    } catch (error) {
      console.error('Error creating university:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Create a University</h1>
      <form onSubmit={handleFormSubmit}>
        <label className="form-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
        </label>
        <label className="form-label">
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-input" />
        </label>
        <label className="form-label">
          Faculties (comma-separated):
          <input type="text" value={faculties} onChange={(e) => setFaculties(e.target.value)} className="form-input" />
        </label>
        <button type="submit" className="form-button">
          Create University
        </button>
      </form>
    </div>
  );
};

export default UniversityCreationPage;
