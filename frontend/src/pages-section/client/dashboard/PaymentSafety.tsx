import { PaymentSafetyCard } from "./components/PaymentSafetyCard";

const paymentSafetyItems = [
  {
    id: 1,
    category: "Payments",
    title: "Everything you need to know about payments",
    illustration: "payment-cards",
  },
  {
    id: 2,
    category: "Payments",
    title: "How to set up your preferred billing method",
    illustration: "billing-setup",
  },
  {
    id: 3,
    category: "Trust & safety",
    title: "Keep yourself and others safe on Upwork",
    illustration: "safety-people",
  },
];

export function PaymentsSafetySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paymentSafetyItems.map((item) => (
        <PaymentSafetyCard key={item.id} {...item} />
      ))}
    </div>
  );
}
