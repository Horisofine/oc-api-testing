import Image from "next/image";
import Association from "../../models/association";
import Link from "next/link";

export default function Associations() {
    

    return (
        <div>
      <ul>
        <li>
          <Link href={"/associations/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/associations/signup"}>Signup</Link>
        </li>
        <li>
          <Link href={"/associations/createEvent"}>Create events</Link>
        </li>
      </ul>
    </div>
    );
}
function createAssociation() {
  throw new Error("Function not implemented.");
}