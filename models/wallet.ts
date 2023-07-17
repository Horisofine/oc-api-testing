import { firestore } from '@/private/firebaseconfig';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"

class Wallet {
    amountOfTickets: number;
    walletId: any;

    constructor(amountOfTickets: number) {
        this.amountOfTickets = amountOfTickets;
    }

    // Save the wallet to Firestore
    async save(): Promise<boolean> {
        try {
        const docRef = await addDoc(collection(firestore, 'wallet'), {
            amountOfTickets: this.amountOfTickets
        });
        this.walletId = docRef.id;
        console.log("Successfully added the wallet")
        return true;
        } catch (error) {
        console.error('Error saving wallet:', error);
        return false;
        }
    }

    // Update the wallet in Firestore
    async update() {
        try {
        const walletRef = doc(firestore, "wallet", this.walletId);
        await updateDoc(walletRef, {
            amountOfTickets: this.amountOfTickets
        });
        console.log("Successfully updated the wallet");
        return true;
        } catch (error) {
        console.error("Error updating wallet:", error);
        return false;
        }
    }

    // Delete the wallet from Firestore
    async delete(): Promise<boolean> {
        try {
        await deleteDoc(doc(firestore, "wallet", this.walletId));
        console.log("Successfully deleted the wallet");
        return true;
        } catch (error) {
        console.error('Error deleting wallet:', error);
        return false;
        }
    }

    // Fetch a wallet from Firestore by ID
    static async fetchById(id: any): Promise<Wallet | null> {
        try {
        const walletRef = doc(firestore, "wallet", id);
        const walletSnap = await getDoc(walletRef);
        if (walletSnap.exists()) {
            console.log("Wallet fetched successfully");
            const data = walletSnap.data();
            return new Wallet(
                data.amountOfTickets
            );
        }
        return null;
        } catch (error) {
        console.error('Error fetching wallet:', error);
        return null;
        }
  }
}

export default Wallet;