import Event from "../models/events";

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
event.save().then((success) => {
  if (success) {
    console.log("Event saved successfully.");
  } else {
    console.log("Failed to save the event.");
  }
});

// Update the event
event.title = "Updated Event";
event.update().then((success) => {
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
//   const eventId = 'yourEventId';
Event.fetchById(event.id).then((event) => {
  if (event) {
    console.log("Fetched event:", event);
  } else {
    console.log("Event not found.");
  }
});
