import { firestore } from "@/private/firebaseconfig"
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"

class Event {
  title: string;
    location: string;
    date: string;
    time: string;
    description: string;
    audience: string;
    attendees: number;
    ticketPrice: number;
    ticketAvailability: boolean;
    eventType: string;
    categories: string;
    status: string;
    name: any;
    members: any;
    id: any;

  constructor(title: string, location : string, date : string, time : string, description : string, audience : string, attendees : number, ticketPrice : number, ticketAvailability : boolean, eventType : string, categories : string, status : string) {
    this.title = title,
    this.location = location,
    this.date = date,
    this.time = time,
    this.description = description,
    this.audience = audience,
    this.attendees = attendees,
    this.ticketPrice = ticketPrice,
    this.ticketAvailability = ticketAvailability,
    this.eventType = eventType,
    this.categories = categories, 
    this.status = status
  }

  // Save the event to Firestore
  async save() {
    try {
      const docRef = await addDoc(collection(firestore, 'events'), {
        title: this.title,
        location: this.location,
        date: this.date,
        time: this.time,
        description:  this.description,
        audience: this.audience,
        attendees: this.attendees,
        ticketPrice: this.ticketPrice,
        ticketAvailability: this.ticketAvailability,
        eventType: this.eventType,
        categories: this.categories,
        status: this.status
      });
      this.id = docRef.id;
      console.log("Successfully created an event")
      return true;
    } catch (error) {
      console.error('Error saving event:', error);
      return false;
    }
  }

  // Update the event in Firestore
  async update() {
    try {
      const eventRef = doc(firestore, "events", this.id)

      await updateDoc(eventRef, {
        title: this.title,
        location: this.location,
        date: this.date,
        time: this.time,
        description:  this.description,
        audience: this.audience,
        attendees: this.attendees,
        ticketPrice: this.ticketPrice,
        ticketAvailability: this.ticketAvailability,
        eventType: this.eventType,
        categories: this.categories,
        status: this.status
      })
      console.log("Successfully updated the event")
      return true;
    } catch (error) {
      console.error('Error updating event:', error);
      return false;
    }
  }

  // Delete the association from Firestore
  async delete() {
    try {
      await deleteDoc(doc(firestore, "events", this.id));
      console.log("Successfully deleted the event")
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }

  // Fetch an association from Firestore by ID
  static async fetchById(id : string) {
    try {
      const eventRef = doc(firestore, "events", id);
      const eventSnap = await getDoc(eventRef);

      if (eventSnap.exists()) {
        console.log("Event retrieved successfully");
        const data = eventSnap.data();
        return new Event(
          data.title,
          data.location,
          data.date,
          data.time,
          data.description,
          data.audience,
          data.attendees,
          data.ticketPrice,
          data.ticketAvailability,
          data.eventType,
          data.categories,
          data.status,
        );
      }
      return null;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  }
}

export default Event;
