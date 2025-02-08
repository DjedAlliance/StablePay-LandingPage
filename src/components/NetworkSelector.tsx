"use client"
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png"

export default function NetworkSelector() {
    const [network, setNetwork] = useState<string>("Cardano's Milkomeda");
    const [token, setToken] = useState<string>("mADA");

    const handleNetwork = (e: React.ChangeEvent<HTMLSelectElement>) => setNetwork(e.target.value);
    const handleToken = (e: React.ChangeEvent<HTMLSelectElement>) => setToken(e.target.value);

    return (
        <div className="flex flex-col">
            <div className="text-sm text-gray-500">Select Network and Token</div>
            <div className="bg-[#1E1E1E] w-80 h-full border border-white rounded">
                <div className="flex items-center m-6 text-amber-500 text-xl font-semibold">
                    <Image src={logo} width={50} height={50} alt="logo" />
                    <h3 className="mx-2">StablePay</h3>
                </div>
                <div>
                    <form>
                        <div className="mx-8 mb-12">
                            <label className="text-gray-500 text-sm">Select Network</label>
                            <select value={network} onChange={handleNetwork} name="network" className="w-full h-8 px-2 text-gray-700 text-sm rounded-md">
                                <option value="Cardano's Milkomeda">Cardano's Milkomeda</option>
                                <option value="Ethereum">Ethereum</option>
                            </select>
                        </div>
                        <div className="mx-8 mb-12">
                            <label className="text-gray-500 text-sm">Select Token</label>
                            <select value={token} onChange={handleToken} name="token" className="w-full h-8 px-2 text-gray-700 text-sm rounded-md">
                                <option value="mADA">mADA</option>
                                <option value="ETC">ETC</option>
                            </select>
                        </div>
                        <button className="bg-amber-600 block mx-auto mb-6 px-16 h-10 text-sm font-semibold">Review Transaction</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
