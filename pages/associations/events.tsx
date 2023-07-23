// AssociationEvents.js

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firestore, auth } from "../../private/firebaseconfig"; // Replace '../firebase' with the path to your Firebase config and initialization file
import { useRouter } from "next/router";

const AssociationEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for changes in the user's authentication state
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          // Fetch events belonging to the association from Firestore
          const eventsRef = collection(firestore, "events");
          const q = query(
            collection(firestore, "events"),
            where("associationId", "==", uid)
          );

          const querySnapshot = await getDocs(q);
          const eventsDoc : any[] = [] ;
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            eventsDoc.push(doc.data())
          });

          setEvents(eventsDoc)
        } catch (error) {
          console.error("Error fetching association events:", error);
        }
        // ...
      } else {
        // User is signed out
        // ...
        router.push("/associations/login")
      }
    });

    // Clean up the subscription when the component unmounts
    // return () => unsubscribe();
  }, [isAuthenticated, router]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User signed out successfully")
        router.push("/associations/login")
      }).catch((error) => {
        // An error happened.
        console.log("An error occured when signing out: ", error)
      });
  }

  return (
    <div>
      <h1>Association Events</h1>
      <ul>
        {events.map((event: any) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            {/* Add other event details as needed */}
          </li>
        ))}
      </ul>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default AssociationEvents;
