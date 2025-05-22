import Link from "next/link";

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color?: "green" | "white";
}

export default function ActionCard({
  title,
  description,
  buttonText,
  buttonLink,
  color = "green",
}: ActionCardProps) {
  return (
    <div
      className={`p-6 rounded-md ${
        color === "green" ? "bg-green-600 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p
        className={`text-sm mb-4 ${
          color === "green" ? "text-green-50" : "text-gray-600"
        }`}
      >
        {description}
      </p>
      <button
        className={
          color === "green" ? "text-white border-white hover:bg-green-700" : ""
        }
      >
        <Link href={buttonLink}>{buttonText}</Link>
      </button>
    </div>
  );
}
