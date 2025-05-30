import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = await headers();
  const role = headersList.get("role");

  const redirectUrl =
    role === "freelancer" ? "/freelancer/find-work" : "/client";

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={redirectUrl}>Return Home</Link>
    </div>
  );
}
