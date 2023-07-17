import Image from "next/image";
import Association from "../models/association";

export default function Associations() {
    async function createAssociation() {
        const association = new Association(
            "Test Name",
            "Test Faculty",
            "Test Email",
            "Test Password"
        );

        // Save the association
        await association.save().then((success) => {
            if (success) {
            console.log("Association saved successfully.");
            } else {
            console.log("Failed to save the association.");
            }
        });
        
        // Update the association
        association.name = "Updated Association";
        await association.update().then((success) => {
        if (success) {
            console.log("Association updated successfully.");
        } else {
            console.log("Failed to update the association.");
        }
        });

        // Fetch an association by ID
        const associationId = "yourAssociationId";
        await Association.fetchById(association.associationId).then((association) => {
        if (association) {
            console.log("Fetched association:", association);
        } else {
            console.log("Association not found.");
        }
        });

        // Delete the association
        //   association.delete().then((success) => {
        //     if (success) {
        //       console.log('Association deleted successfully.');
        //     } else {
        //       console.log('Failed to delete the association.');
        //     }
        //   });
    }

    return (
        <div>
            <button onClick={createAssociation}>Create an association</button>
        </div>
    );
}
function createAssociation() {
  throw new Error("Function not implemented.");
}