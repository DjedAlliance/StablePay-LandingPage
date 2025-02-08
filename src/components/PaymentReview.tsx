import React from "react";
import Image from "next/image";
import logo from '@/assets/logo.png';

interface PaymentReviewProps {
    network?: string;
    pay?: number;
    tokenName?: string;
    receive?: number;
    coinName?: string;
}

const PaymentReview: React.FC<PaymentReviewProps> = ({
    network = "Cardano's Milkomeda",
    pay = 250,
    tokenName = "mADA",
    receive = 100,
    coinName = "MOD",
}) => {
    return (
        <div className="flex flex-col">
            <div className="text-sm text-gray-500">Submit Transaction</div>
            <div className="bg-[#1E1E1E] w-80 h-full border border-white rounded">
                <div className="flex items-center m-6 text-amber-500 text-xl font-semibold">
                    <Image src={logo} width={50} height={50} alt="logo" />
                    <h3 className="mx-2">StablePay</h3>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-8 mx-8 font-semibold">
                        <p className="text-gray-500">Network:</p>
                        <p className="">{network}</p>
                    </div>
                    <div className="flex justify-between text-sm mb-8 mx-8 font-semibold">
                        <p className="text-gray-500">You Pay:</p>
                        <p className="">{pay} {tokenName}</p>
                    </div>
                    <div className="flex justify-between text-sm mb-8 mx-8 font-semibold">
                        <p className="text-gray-500">Merchant Receives:</p>
                        <p className="">{receive} {coinName}</p> 
                    </div>
                    <div className="flex items-center mx-12 mb-8">
                        <span>&#128712;</span>
                        <p className="text-[10px] font-bold text-gray-500 ml-2">MOD is Milkomeda's Djed Osiris Dollar, the USD-pegged ADA-backed stablecoin based on the Djed Stablecoin Protocol.</p>
                    </div>
                    <button type="submit" className="bg-amber-600 block mx-auto mb-6 px-16 h-10 text-sm font-semibold">Review Transaction</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentReview;