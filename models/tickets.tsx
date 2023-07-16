import { firestore } from "@/private/firebaseconfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

class Ticket {
  ticketId: any;
  eventId: any;
  datePurchased: string;
  price: number;
  status: string;
  eventDate: string;

  constructor(
    datePurchased: string,
    price: number,
    status: string,
    eventDate: string
  ) {
    this.datePurchased = datePurchased;
    this.price = price;
    this.status = status;
    this.eventDate = eventDate;
  }

  // Save the event to Firestore
  async save() {
    try {
      const docRef = await addDoc(collection(firestore, "tickets"), {
        datePurchased: this.datePurchased,
        price: this.price,
        status: this.status,
        eventDate: this.eventDate,
      });
      this.ticketId = docRef.id;
      console.log("Successfully created an ticket");
      return true;
    } catch (error) {
      console.error("Error saving ticket:", error);
      return false;
    }
  }

  // Update the event in Firestore
  async update() {
    try {
      const eventRef = doc(firestore, "tickets", this.ticketId);

      await updateDoc(eventRef, {
        datePurchased: this.datePurchased,
        price: this.price,
        status: this.status,
        eventDate: this.eventDate,
      });
      console.log("Successfully updated the ticket");
      return true;
    } catch (error) {
      console.error("Error updating ticket:", error);
      return false;
    }
  }

  // Delete the association from Firestore
  async delete() {
    try {
      await deleteDoc(doc(firestore, "tickets", this.ticketId));
      console.log("Successfully deleted the ticket")
      return true;
    } catch (error) {
      console.error('Error deleting ticket:', error);
      return false;
    }
  }

   // Fetch an association from Firestore by ID
   static async fetchById(id : string) {
    try {
      const ticketRef = doc(firestore, "tickets", id);
      const ticketSnap = await getDoc(ticketRef);

      if (ticketSnap.exists()) {
        console.log("Ticket retrieved successfully");
        const data = ticketSnap.data();
        return new Ticket(
          data.datePurchased,
          data.price,
          data.status,
          data.eventDate,
        );
      }
      return null;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return null;
    }
  }
}
