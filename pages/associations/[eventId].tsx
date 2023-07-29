import { auth, firestore } from "@/private/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function EventDetail({ params }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<DocumentData>(); // State to hold the event data

  const router = useRouter();
  const { eventId } = router.query;

  // Check if eventId is available, if not, redirect to the events page
  if (!eventId) {
    router.push("/associations/events");
  }

  useEffect(() => {
    // Listen for changes in the user's authentication state
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If the user is authenticated, get their uid
        const uid = user.uid;
        try {
          // Fetch the event document from Firestore
          const eventRef = doc(firestore, "events", `${eventId}`);
          const eventSnap = await getDoc(eventRef);

          if (eventSnap.exists()) {
            // If the event document exists, set the event data to the state
            console.log("Event data:", eventSnap.data());
            setEvent(eventSnap.data());
          } else {
            // If the event document does not exist
            console.log("No such event!");
          }

        } catch (error) {
          console.error("Error fetching association events:", error);
        }
        // ...
      } else {
        // If the user is not authenticated, redirect to the login page
        // ...
        router.push("/associations/login");
      }
    });

    // This effect will run whenever eventId, isAuthenticated, or router changes
  }, [eventId, isAuthenticated, router]);

  return <div>{JSON.stringify(event)}</div>;
}
