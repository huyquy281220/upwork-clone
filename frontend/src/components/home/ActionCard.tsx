import Link from "next/link";

interface ActionCardProps {
  title: string;
  buttonText: string;
  buttonLink: string;
}

export default function ActionCard({
  title,
  buttonText,
  buttonLink,
}: ActionCardProps) {
  return (
    <div className="p-6 rounded-md bg-[#14a800] text-gray-900 cursor-pointer group hover:bg-white">
      <h3 className="font-bold text-white text-3xl mb-2 group-hover:text-[#14a800]">
        {title}
      </h3>
      <button className="mt-4">
        <Link
          href={buttonLink}
          className="text-lg font-semibold text-white group-hover:text-[#14a800]"
        >
          {buttonText}
        </Link>
      </button>
    </div>
  );
}
