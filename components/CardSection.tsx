// components/CardSection.tsx
"use client";
import { Input } from "@/components/ui/input";

export default function CardSection() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center ml-2 space-x-2">
          <img src="/visa.png" alt="Visa" className="h-6" onError={(e) => (e.currentTarget.style.display = "none")} />
          <img src="/mastercard.png" alt="Mastercard" className="h-6" onError={(e) => (e.currentTarget.style.display = "none")} />
          <img src="/rupay.png" alt="RuPay" className="h-6" onError={(e) => (e.currentTarget.style.display = "none")} />
        </div>
      <label className="block text-gray-700 text-sm mb-1">Card Number</label>
      <div className="flex items-center mb-3">
        <Input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="flex-1"
        />
        
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex-1">
          <label className="block text-gray-700 text-sm mb-1">Expiry Date</label>
          <Input type="text" placeholder="MM/YY" />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 text-sm mb-1">CVV</label>
          <Input type="text" placeholder="123" />
        </div>
      </div>
      <label className="block text-gray-700 text-sm mb-1">Name on Card</label>
      <Input type="text" placeholder="John Doe" />
    </div>
  );
}
