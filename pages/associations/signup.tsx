import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { auth, firestore } from "../../private/firebaseconfig"; // Replace '../firebase' with the path to your Firebase config and initialization file
import { useRouter } from "next/router";

const AssociationSignUp = ({ universities }: any) => {
  const router = useRouter()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");

  const [isUniversitySelected, setIsUniversitySelected] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(0);
  const [faculty, setFaculty] = useState(""); // Selected faculty from radio input

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Step 1: Create a new user account with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      console.log(user)
      const associationId = user.uid;

      // Step 2: Store the additional association data in Firestore
      const associationData = {
        name,
        universityId: universities[selectedUniversity].id,
        faculty,

        // You can add other association-related fields as needed
      };

      await setDoc(doc(firestore, "associations", associationId), associationData);
      console.log("Association sign-up successful");
      router.push("/associations/login")
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <h1>Association Sign Up</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          University:
          <select
            value={university}
            onChange={(e) => {
              if (e.target.value == "") {
                setIsUniversitySelected(false);
                setUniversity("")
              } else {
                setSelectedUniversity(e.target.tabIndex);
                setUniversity(e.target.value);
                setIsUniversitySelected(true);
                console.log(e.target.value)
              }
            }}
            className="form-input"
            required
          >
            <option value="">Select University</option>
            {universities.map((university: any, index: any) => (
              <option key={index} value={university.name}>
                {university.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Faculty:
          <select
            value={faculty}
            onChange={(e) => {
              setFaculty(e.target.value);
            }}
          >
            <option value="">Select Faculty</option>
            {isUniversitySelected &&
              universities[selectedUniversity].faculties.map(
                (faculty: string, index: number) => (
                  <option key={index} value={faculty}>
                    {faculty}
                  </option>
                )
              )}
          </select>
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const universitiesRef = collection(firestore, "universities");
    const snapshot = await getDocs(universitiesRef);
    const universities = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.name,
        faculties: data.facultiesArray || [], // Replace 'faculties' with the actual field name in your Firestore document
        id: doc.id
      };
    });

    // Return universities as props
    return {
      props: {
        universities,
      },
    };
  } catch (error) {
    console.error("Error fetching universities:", error);

    // If an error occurs during fetching, you can handle it here
    return {
      props: {
        universities: [],
      },
    };
  }
}

export default AssociationSignUp;
