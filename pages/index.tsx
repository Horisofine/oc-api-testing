import Image from "next/image";
import Event from "../models/events";
import Link from "next/link";

export default function Home() {
  async function createEvent() {
    const event = new Event(
      "Sample Event",
      "Sample Location",
      "2023-07-31",
      "18:00",
      "Sample Description",
      "Public",
      100,
      10,
      true,
      "Conference",
      "Technology",
      "Active"
    );

    // Save the event
    await event.save().then((success) => {
      if (success) {
        console.log("Event saved successfully.");
      } else {
        console.log("Failed to save the event.");
      }
    });

    // Update the event
    event.title = "Updated Event";
    await event.update().then((success) => {
      if (success) {
        console.log("Event updated successfully.");
      } else {
        console.log("Failed to update the event.");
      }
    });

    // Delete the event
    //   event.delete().then((success) => {
    //     if (success) {
    //       console.log('Event deleted successfully.');
    //     } else {
    //       console.log('Failed to delete the event.');
    //     }
    //   });

    // Fetch an event by ID
    const eventId = "yourEventId";
    await Event.fetchById(event.eventId).then((event) => {
      if (event) {
        console.log("Fetched event:", event);
      } else {
        console.log("Event not found.");
      }
    });
  }

  return (
    <div>
      <ul>
        <li>
          <Link href={"/events"}>Events</Link>
        </li>
        <li>
          <Link href={"/associations"}>Associations</Link>
        </li>
        <li>
          <Link href={"/students"}>Students</Link>
        </li>
        <li>
          <Link href={"/tickets"}>Tickets</Link>
        </li>
        <li>
          <Link href={"/createEvent"}>Create events</Link>
        </li>
      </ul>
    </div>
  );
}
