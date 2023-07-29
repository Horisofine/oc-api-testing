import { auth, firestore } from "@/private/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, DocumentData, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// Edit event modal
// May need to be moved to another location for better coding

const EditEventModal = ({ event, onClose, onSave }) => {
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [description, setDescription] = useState(event.description);
  const [audience, setAudience] = useState(event.audience);
  const [attendees, setAttendees] = useState(event.attendees);
  const [ticketPrice, setTicketPrice] = useState(event.ticketPrice);
  const [ticketAvailability, setTicketAvailability] = useState(
    event.ticketAvailability
  );
  const [eventType, setEventType] = useState(event.eventType);
  const [categories, setCategories] = useState(event.categories);
  const [status, setStatus] = useState(event.status);
  // Add other event fields here

  const handleSave = () => {
    // Save the edited event details to Firestore
    const updatedEvent = {
      title,
      location,
      date,
      time,
      description,
      audience,
      attendees,
      ticketPrice,
      ticketAvailability,
      eventType,
      categories,
      status,
      // Add other updated event fields here
    };
    onSave(updatedEvent);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Event</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Audience:
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </label>
        <label>
          Attendees:
          <input
            type="number"
            value={attendees}
            onChange={(e) => setAttendees(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Ticket Price:
          <input
            type="number"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Ticket Availability:
          <input
            type="checkbox"
            checked={ticketAvailability}
            onChange={(e) => setTicketAvailability(e.target.checked)}
          />
        </label>
        <label>
          Event Type:
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          />
        </label>
        <label>
          Categories:
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </label>
        {/* Add other form fields here */}
        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default function EventDetail({ params }: any) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<DocumentData>(); // State to hold the event data

  const { eventId } = router.query;

  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveEvent = async (updatedEvent: any) => {
    try {
      // Update the event details in Firestore
      const eventRef = doc(firestore, "events", `${eventId}`);
      await updateDoc(eventRef, updatedEvent);
      setShowModal(false); // Close the modal after saving
      router.reload()
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  useEffect(() => {
    // Listen for changes in the user's authentication state
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if eventId is available, if not, redirect to the events page
        if (!eventId) {
          router.push("/associations/events");
        }
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

  return (
    <>
      {/* <div>{JSON.stringify(event)}</div> */}
      <ul>
        <li>Title: {event?.title}</li>
        <li>Date: {event?.date}</li>
        <li>Location: {event?.location}</li>
        <li>Description: {event?.description}</li>
        <li>Time: {event?.time}</li>
        <li>Audience: {event?.audience}</li>
        <li>Attendees: {event?.attendees}</li>
        <li>TicketPrice: {event?.ticketPrice}</li>
        <li>TicketAvailability: {event?.ticketAvailability}</li>
        <li>EventType: {event?.eventType}</li>
        <li>Categories: {event?.categories}</li>
        <li>Status: {event?.status}</li>
      </ul>
      <button onClick={handleEditClick}>Edit</button>

      {showModal && (
        <EditEventModal
          event={event}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
        />
      )}
    </>
  );
}
