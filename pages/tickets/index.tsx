import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, collectionGroup } from "firebase/firestore";
import { firestore } from "../../private/firebaseconfig"; // Replace '../firebase' with the path to your Firebase config and initialization file
import Link from "next/link";

export default function Tickets() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEventsAndTickets = async () => {
      try {
        // Step 1: Fetch all events
        const eventsRef = collection(firestore, "events");
        const eventsSnapshot = await getDocs(eventsRef);

        // Step 2: Fetch tickets for each event
        const eventsWithTickets = await Promise.all(
          eventsSnapshot.docs.map(async (eventDoc) => {
            const event = { id: eventDoc.id, ...eventDoc.data() };

            // Fetch tickets for the current event
            const ticketsRef = collection(eventDoc.ref, "tickets");
            const ticketsSnapshot = await getDocs(ticketsRef);
            const tickets = ticketsSnapshot.docs.map((ticketDoc) => ({
              id: ticketDoc.id,
              ...ticketDoc.data(),
            }));

            return { ...event, tickets };
          })
        );

        // Step 3: Set the state with the events and their associated tickets
        setEvents(eventsWithTickets);
      } catch (error) {
        console.error("Error fetching events and tickets:", error);
      }
    };

    fetchEventsAndTickets();
  }, []);

  return (
    <div>
        <Link href={"/"} >Home</Link>
      <h1>All Events and Tickets</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>Event - {event.title}</h2>
          <p>{event.description}</p>
          {/* Add other event details here */}

          <h3>Tickets</h3>
          <ul>
            {event.tickets.map((ticket) => (
              <li key={ticket.id}>
                <p>Ticket ID: {ticket.id}</p>
                <p>Price: {ticket.price}$</p>
                <p>Status: {ticket.status}</p>
                {/* Add other ticket details */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

