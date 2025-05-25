// app/page.tsx or pages/index.tsx
import WalletSection from "@/components/WalletSection";
import BankSection from "@/components/BankSection";
import CardSection from "@/components/CardSection";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 space-y-6">
      <WalletSection />
      <BankSection />
      <CardSection />
    </div>
  );
}
