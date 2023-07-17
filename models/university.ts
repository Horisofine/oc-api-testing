import { firestore } from '@/private/firebaseconfig';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"


class University {
    name: string;
    location: string;
    departments: Array<string>;
    universityId: any;

    constructor(name: string, location: string, departments: Array<string>) {
        this.name = name;
        this.location = location;
        this.departments = departments;
    }

    // Save the university to Firestore
    async save(): Promise<boolean> {
        try {
        const docRef = await addDoc(collection(firestore, 'universities'), {
            name: this.name,
            location: this.location,
            departments: this.departments
        });
        this.universityId = docRef.id;
        console.log("Successfully created a university")
        return true;
        } catch (error) {
        console.error('Error saving university:', error);
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
            departments: this.departments
        })
        console.log("Successfully updated the university");
        return true;
        } catch (error) {
        console.error('Error updating university:', error);
        return false;
        }
    }

    // Delete the university from Firestore
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

    // Fetch a university from Firestore by ID
    static async fetchById(id: any): Promise<University | null> {
        try {
        const universityRef = doc(firestore, "universities", id);
        const universitySnap = await getDoc(universityRef);
        if (universitySnap.exists()) {
            console.log("University fetched successfully");
            const data = universitySnap.data();
            return new University(
                data.name,
                data.location,
                data.departments
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