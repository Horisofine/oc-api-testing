// AssociationEvents.js

import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firestore, auth } from "../../private/firebaseconfig"; // Replace '../firebase' with the path to your Firebase config and initialization file
import { useRouter } from "next/router";
import Link from "next/link";

const AssociationEvents = () => {
  const router = useRouter();
  const [draftFvents, setDraftEvents] = useState<string[]>([]);
  const [publishedFvents, setPublishedEvents] = useState<string[]>([]);
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
          const draftEventsDoc: any[] = [];
          const publishedEventsDoc: any[] = [];
          querySnapshot.forEach((doc) => {
            // Spread the document data and add the ID as a new property 'eventId'
            const eventDataWithId = { id: doc.id, ...doc.data() };
            console.log(eventDataWithId);

              if (doc.data().status == "Draft") {
                draftEventsDoc.push(eventDataWithId)
              }
              else {
                publishedEventsDoc.push(eventDataWithId)
              }
          });

          setDraftEvents(draftEventsDoc);
          setPublishedEvents(publishedEventsDoc);
        } catch (error) {
          console.error("Error fetching association events:", error);
        }
        // ...
      } else {
        // If the user is not authenticated, redirect to the login page
        router.push("/associations/login");
      }
    });

    // Clean up the subscription when the component unmounts
    // return () => unsubscribe();
  }, [isAuthenticated, router]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        router.push("/associations/login");
      })
      .catch((error) => {
        // An error happened.
        console.log("An error occurred when signing out: ", error);
      });
  };

  // Function to handle event deletion
  const handleDeleteEvent = async (eventId: any) => {
    console.log(eventId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        // Delete the event from Firestore
        const eventRef = doc(firestore, "events", eventId);
        await deleteDoc(eventRef);
        console.log("Event deleted successfully!");
        // Redirect to events page after deletion
        router.push("/associations/events");
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <div>
      <h1>Association Events</h1>
      <Link href={"/associations/createEvent"}>
        <button>Create event</button>
      </Link>

      <h1>Published events</h1>
      <ul>
        {publishedFvents.map((event: any) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            {/* Add other event details as needed */}
            <button
              onClick={() => handleDeleteEvent(event.id)}
              style={{ color: "white", background: "red" }}
            >
              Delete Event
            </button>
          </li>
        ))}
      </ul>

      <h1>Draft events</h1>
      <ul>
        {draftFvents.map((event: any) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            {/* Add other event details as needed */}
            <button
              onClick={() => handleDeleteEvent(event.id)}
              style={{ color: "white", background: "red" }}
            >
              Delete Event
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default AssociationEvents;
