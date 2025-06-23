import { StarRating } from "@/components/common/StarRating";
import { ChevronUp } from "lucide-react";

export function ClientHistory() {
  const reviews = [
    {
      title: "Fast Job Product Evaluation Needed for Kids Camera",
      rating: 5.0,
      feedback: "No feedback given",
      freelancer: "Business S.",
      date: "Jun 2005 - Jun 2005",
      price: "$12.50",
    },
    {
      title: "Fast Job Product Evaluation Needed for Kids Camera",
      rating: 5.0,
      feedback:
        "Easy to work with! Clear guidance from the start! Would love to work with you again!",
      freelancer: "Sabrina S.",
      date: "Jun 2005 - Jun 2005",
      price: "$12.50",
    },
    {
      title: "Fast Job Product Evaluation Needed for Kids Camera",
      rating: 5.0,
      feedback:
        "Great experience working on this camera project with children. I love the user-friendly features that make it easy for kids to take pictures and have fun!",
      freelancer: "Adrienne A.",
      date: "Jun 2005 - Jun 2005",
      price: "$12.50",
    },
    {
      title: "Fast Job Product Evaluation Needed for Kids Camera",
      rating: 5.0,
      feedback: "Amazing individual to work with. I highly recommend",
      freelancer: "Sana U.",
      date: "Jun 2005 - Jun 2005",
      price: "$12.50",
    },
    {
      title: "Fast Job Product Evaluation Needed for Kids Camera",
      rating: 5.0,
      feedback: "real done !",
      freelancer: "Sana U.",
      date: "Jun 2005 - Jun 2005",
      price: "$12.50",
    },
  ];

  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Client&#39;s recent history (50)
        </h3>
        <button className="text-green-500 text-sm flex items-center gap-1">
          Jobs in progress
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-muted pb-4 last:border-b-0"
          >
            <h4 className="text-green-500 font-medium mb-2">{review.title}</h4>
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={review.rating} />
              <span className="font-semibold text-foreground">
                {review.rating}
              </span>
              <span className="text-muted-foreground">{review.feedback}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                To freelancer:{" "}
                <span className="text-green-500">{review.freelancer}</span>
              </span>
              <div className="text-right">
                <div>{review.date}</div>
                <div>Fixed-price {review.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="text-green-500 text-sm">View more (5)</button>
    </div>
  );
}
