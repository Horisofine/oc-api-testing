import { firestore } from '@/private/firebaseconfig';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"

class Association {
  name: string;
  faculty: string;
  associationEmail: string;
  password: string;
  associationId: any;

  constructor(name: string, faculty: string, associationEmail: string, password: string) {
    this.name = name;
    this.faculty = faculty;
    this.associationEmail = associationEmail;
    this.password = password;
  }

  // Save the association to Firestore
  async save(): Promise<boolean> {
    try {
      const docRef = await addDoc(collection(firestore, 'associations'), {
        name: this.name,
        faculty: this.faculty,
        associationEmail: this.associationEmail,
        password: this.password,
      });
      this.associationId = docRef.id;
      console.log("Successfully created an association")
      return true;
    } catch (error) {
      console.error('Error saving association:', error);
      return false;
    }
  }

  // Update the association in Firestore
  async update(): Promise<boolean> {
    try {
      const associationRef = doc(firestore, "associations", this.associationId);
      await updateDoc(associationRef, {
        name: this.name,
        faculty: this.faculty,
        associationEmail: this.associationEmail,
        password: this.password,
    })
      console.log("Successfully updated the association");
      return true;
    } catch (error) {
      console.error('Error updating association:', error);
      return false;
    }
  }

  // Delete the association from Firestore
  async delete(): Promise<boolean> {
    try {
    await deleteDoc(doc(firestore, "associations", this.associationId));
    console.log("Successfully deleted the association");
    return true;
    } catch (error) {
      console.error('Error deleting association:', error);
      return false;
    }
  }

  // Fetch an association from Firestore by ID
  static async fetchById(id: any): Promise<Association | null> {
    try {
      const associationRef = doc(firestore, "associations", id);
      const associationSnap = await getDoc(associationRef);
      if (associationSnap.exists()) {
        console.log("Association fetched successfully");
        const data = associationSnap.data();
        return new Association(
          data.name,
          data.faculty,
          data.associationEmail,
          data.password
        );
      }
      return null;
    } catch (error) {
      console.error('Error fetching association:', error);
      return null;
    }
  }
}

export default Association;
