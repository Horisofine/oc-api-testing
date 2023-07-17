import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
 import { firestore } from "@/private/firebaseconfig"

export default function CreateEvent() {

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [attendees, setAttendees] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticketAvailability, setTicketAvailability] = useState(true);
  const [eventType, setEventType] = useState("");
  const [categories, setCategories] = useState("");
  const [status, setStatus] = useState("");

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Create event document
    const event = {
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
      eventId: null,
    };
    const eventRef = await addDoc(collection(firestore, "events"), event);

    // Create tickets
    const tickets = [];
    for (let i = 0; i < attendees; i++) {
      const ticket = {
        eventId: eventRef.id,
        datePurchased: "",
        price: ticketPrice,
        status: "available",
        eventDate: date,
        ticketId: null,
      };
      const ticketRef = await addDoc(collection(firestore, "tickets"), ticket);
      tickets.push(ticketRef.id);
    }

    console.log(
      "Event and tickets created successfully:",
      eventRef.id,
      tickets
    );
    // Redirect or display success message
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
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
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
