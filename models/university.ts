import { firestore } from "@/private/firebaseconfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

class University {
  name: string;
  location: string;
  faculties: string[];
  universityId: any;

  constructor(name: string, location: string, faculties: string[]) {
    this.name = name;
    this.location = location;
    this.faculties = faculties;
  }

  // Save the university to Firestore
  async save(): Promise<boolean> {
    try {
      const docRef = await addDoc(collection(firestore, "universities"), {
        name: this.name,
        location: this.location,
        faculties: this.faculties
      });
      this.universityId = docRef.id;
      console.log("Successfully created an university");
      return true;
    } catch (error) {
      console.error("Error saving university:", error);
      return false;
    }
  }

  // Update the university in Firestore
  async update(): Promise<boolean> {
    try {
      const universityRef = doc(firestore, "universities", this.universityId);
      await updateDoc(universityRef, {
        name: this.name,
        location: this.location,
        faculties: this.faculties,
    })
      console.log("Successfully updated the university");
      return true;
    } catch (error) {
      console.error('Error updating university:', error);
      return false;
    }
  }

  // Delete the association from Firestore
  async delete(): Promise<boolean> {
    try {
    await deleteDoc(doc(firestore, "universities", this.universityId));
    console.log("Successfully deleted the university");
    return true;
    } catch (error) {
      console.error('Error deleting university:', error);
      return false;
    }
  }

  // Fetch an association from Firestore by ID
  static async fetchById(id: any): Promise<University | null> {
    try {
      const univeristyRef = doc(firestore, "univeristies", id);
      const univeristySnap = await getDoc(univeristyRef);
      if (univeristySnap.exists()) {
        console.log("Univeristy fetched successfully");
        const data = univeristySnap.data();
        return new University(
          data.name,
          data.location,
          data.faculties,
        );
      }
      return null;
    } catch (error) {
      console.error('Error fetching university:', error);
      return null;
    }
  }
}

export default University;