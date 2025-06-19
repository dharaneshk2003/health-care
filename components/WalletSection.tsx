
"use client";
import { Input } from "@/components/ui/input";
import amazonPayImg from "@/components/Images/amazon_pay.png";
import paytmWalletImg from "@/components/Images/paytm_wallet.png";
import Image from "next/image"; // Adjust the import path as necessary

const wallets = [
    { name: "Amazon Pay", img: amazonPayImg },
    { name: "Paytm Wallet", img: paytmWalletImg },
];

export default function WalletSection() {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex gap-4 mb-4">
                {wallets.map((wallet) => (
                    <button
                        key={wallet.name}
                        className="flex flex-col items-center justify-center border border-gray-200 rounded-lg px-6 py-4 w-40 h-24 hover:border-gray-400 transition"
                    >
                        <Image
                            src={wallet.img}
                            alt={wallet.name}
                            className="h-8 mb-2 object-contain"
                            width={100}
                            height={32}
                        />
                        <span className="text-gray-700 text-sm">{wallet.name}</span>
                    </button>
                ))}
            </div>
            <label className="block text-gray-700 text-sm mb-1">Mobile Number</label>
            <Input
                type="tel"
                placeholder="Enter registered mobile number"
                className="w-full"
            />
        </div>
    );
}
