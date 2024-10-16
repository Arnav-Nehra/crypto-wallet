import { Card } from "./Card"

export const SelectWallet = () => {
    return <div className="py-20">

        <div className=" py-5 animate-slidein opacity-0 [--slidein-delay:300ms]">
            <div className="text-center text-gray-700 text-5xl drop-shadow-lg font-bold dark:text-customred">Select Wallet</div>
        </div>

        <div className="flex justify-center">
            <div className="flex justify-center pt-10 py-5 animate-slidein opacity-0 [--slidein-delay:700ms] pr-10">
                <button type="button" className="flex justify-start text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 text-center me-2 mb-2
                 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Solana
                </button>
            </div>

            <div className="flex justify-center pt-10 py-5 animate-slidein opacity-0 [--slidein-delay:700ms] ...">
                <button type="button" className="flex justify-start text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 text-center me-2 mb-2
                 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ethereum
                </button>
            </div>
        </div>
        <Card></Card>
    </div>
}