import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          Could not find the requested resource
        </p>
        <div className="space-x-4">
          <Link
            href="/client/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Client Dashboard
          </Link>
          <Link
            href="/freelancer/find-work"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Find Work
          </Link>
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
