interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  bgColor?: string;
}

export default function TestimonialCard({
  quote,
  author,
  position,
  company,
  bgColor = "bg-green-800",
}: TestimonialCardProps) {
  return (
    <div className={`${bgColor} text-white p-6 rounded-md`}>
      <p className="text-sm mb-6">&#34;{quote}&#34;</p>
      <div className="text-xs">
        <p className="font-medium">{author}</p>
        <p className="mt-1">{position}</p>
        <p>{company}</p>
      </div>
    </div>
  );
}
