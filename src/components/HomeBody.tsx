import { useNavigate } from "react-router-dom"
export const HomeBody = (): JSX.Element => {
    const navigate = useNavigate();   
    return <div className="py-20">

        <div className=" py-5 animate-slidein opacity-0 [--slidein-delay:300ms]">
            <div className="text-center text-gray-700 text-5xl drop-shadow-lg font-bold dark:text-customred">Introducing Batwa</div>
        </div>

        <div className="animate-slidein opacity-0  [--slidein-delay:300ms] text-center font-bold text-4xl text-gray-700 pt-4 dark:text-customred">
            <div className="pb-5">A Crypto Wallet</div>
            <img loading="lazy" src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=035"
                className="bg-auto pt-15 w-30 h-40 mx-auto" alt="Icon" />
        </div>

        <div className="flex justify-center pt-10 py-5 animate-slidein opacity-0 [--slidein-delay:700ms] ...">
            <button onClick={()=>{navigate("/create-wallet")}} type="button" className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-100 flex justify-start text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2
                 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Let's Get Started <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>

    </div>
}