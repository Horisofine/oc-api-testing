import { firestore } from "@/private/firebaseconfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

class Student {
  id: any;
  firstName: string;
  lastName: string;
  mediaId: string;
  personalEmail: string;
  password: string;
  phoneNumber: string;
  universityID: number;
  universityEmail: string;
  faculty: string;
  fieldOfStudy: string;
  levelOfStudy: string;
  walletId: string;

  constructor(
    firstName: string,
    lastName: string,
    mediaId: string,
    personalEmail: string,
    password: string,
    phoneNumber: string,
    universityID: number,
    universityEmail: string,
    faculty: string,
    fieldOfStudy: string,
    levelOfStudy: string,
    walletId: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mediaId = mediaId;
    this.personalEmail = personalEmail;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.universityID = universityID;
    this.universityEmail = universityEmail;
    this.faculty = faculty;
    this.fieldOfStudy = fieldOfStudy;
    this.levelOfStudy = levelOfStudy;
    this.walletId = walletId;
  }

   // Save the event to Firestore
   async save() {
    try {
      const docRef = await addDoc(collection(firestore, 'students'), {
        firstName: this.firstName,
        lastName: this.lastName,
        mediaId: this.mediaId,
        personalEmail: this.personalEmail,
        password:  this.password,
        phoneNumber: this.phoneNumber,
        universityID: this.universityID,
        universityEmail: this.universityEmail,
        faculty: this.faculty,
        fieldOfStudy: this.fieldOfStudy,
        levelOfStudy: this.levelOfStudy,
        walletId: this.walletId
      });
      this.id = docRef.id;
      console.log("Successfully created an student")
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      return false;
    }
  }

   // Update the event in Firestore
   async update() {
    try {
      const studentRef = doc(firestore, "students", this.id)

      await updateDoc(studentRef, {
        firstName: this.firstName,
        lastName: this.lastName,
        mediaId: this.mediaId,
        personalEmail: this.personalEmail,
        password:  this.password,
        phoneNumber: this.phoneNumber,
        universityID: this.universityID,
        universityEmail: this.universityEmail,
        faculty: this.faculty,
        fieldOfStudy: this.fieldOfStudy,
        levelOfStudy: this.levelOfStudy,
        walletId: this.walletId
      })
      console.log("Successfully updated the student")
      return true;
    } catch (error) {
      console.error('Error updating student:', error);
      return false;
    }
  }

  // Delete the association from Firestore
  async delete() {
    try {
      await deleteDoc(doc(firestore, "students", this.id));
      console.log("Successfully deleted the student")
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      return false;
    }
  }

  // Fetch an association from Firestore by ID
  static async fetchById(id : string) {
    try {
      const studentRef = doc(firestore, "students", id);
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        console.log("Student retrieved successfully");
        const data = studentSnap.data();
        return new Student(
          data.firstName,
          data.lastName,
          data.mediaId,
          data.personalEmail,
          data.password,
          data.phoneNumber,
          data.universityID,
          data.universityEmail,
          data.faculty,
          data.fieldOfStudy,
          data.levelOfStudy,
          data.walletId,
        );
      }
      return null;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  }
}

export default Student;
