// AssociationLogin.js

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../private/firebaseconfig'; // Replace '../firebase' with the path to your Firebase config and initialization file
import { useRouter } from 'next/router';
import { collection, getDocs, query, where } from 'firebase/firestore';

const AssociationLogin = () => {
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      router.push("/associations/events")
    }
  });

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      // Sign in with email and password using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Association login successful');
      // Redirect to the dashboard or other pages upon successful login
      router.push("/associations/events")
      
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>Association Login</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default AssociationLogin;
