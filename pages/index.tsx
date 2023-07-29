import Image from "next/image";
import Event from "../models/events";
import Link from "next/link";

export default function Home() {
 
  return (
    <div>
      <ul>
        <li>
          <Link href={"/events"}>Events</Link>
        </li>
        <li>
          <Link href={"/associations"}>Associations</Link>
        </li>
        <li >
          <Link className="line-through" href={"/students"}>Students</Link>
        </li>
        <li>
          <Link href={"/tickets"}>Tickets</Link>
        </li>
        <li>
          <Link href={"/createEvent"}>Create events</Link>
        </li>
      </ul>
    </div>
  );
}
