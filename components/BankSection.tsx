"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Image from "next/image"; // Adjust the import path as necessary
import sbiImg from "@/components/Images/sbi.png";
import hdfcImg from "@/components/Images/hdfc.png";
import iciciImg from "@/components/Images/icici.png";

const banks = [
    { name: "SBI", img: sbiImg },
    { name: "HDFC", img: hdfcImg },
    { name: "ICICI", img: iciciImg },
];

export default function BankSection() {
    const [selected, setSelected] = useState("SBI");

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <label className="block text-gray-700 text-sm mb-2">Popular Banks</label>
            <div className="flex gap-4 mb-4">
                {banks.map((bank) => (
                    <button
                        key={bank.name}
                        onClick={() => setSelected(bank.name)}
                        className={`flex flex-col items-center justify-center border rounded-lg px-6 py-4 w-28 h-20 transition
              ${selected === bank.name ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-400"}
            `}
                    >
                        <Image
                            src={bank.img}
                            alt={bank.name}
                            className="h-8 mb-2 object-contain"
                            width={100}
                            height={32}
                        />
                        <span className="text-gray-700 text-sm">{bank.name}</span>
                    </button>
                ))}
            </div>
            <label className="block text-gray-700 text-sm mb-1">Select Bank</label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                    {banks.map((bank) => (
                        <SelectItem key={bank.name} value={bank.name}>
                            {bank.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
