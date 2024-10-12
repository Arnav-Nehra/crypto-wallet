import { useState } from "react";

export const Header = () => {
    const [dark, setDark] = useState<boolean>(false);

    const darkModeHandler=():void => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    return <div className="bg-customBeige min-h-screen  dark:bg-black">
        <div className="flex justify-between">
            <div className="flex justify-start">
                <div className="py-4 pl-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  fill= "black" className="dark:fill-customorange size-10">
                        <path d="M1 4.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 2H3.25A2.25 2.25 0 0 0 1 4.25ZM1 7.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 5H3.25A2.25 2.25 0 0 0 1 7.25ZM7 8a1 1 0 0 1 1 1 2 2 0 1 0 4 0 1 1 0 0 1 1-1h3.75A2.25 2.25 0 0 1 19 10.25v5.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75v-5.5A2.25 2.25 0 0 1 3.25 8H7Z" />
                    </svg>
                </div>
                <div className="py-4 pl-5 text-4xl text-blue-500 font-bold dark:text-white ">Batwa</div>
            </div>
            <div className="justify-end">
                <div className="py-4 pr-6">
                    <svg onClick={darkModeHandler} xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 dark:fill-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                </div>
            </div>
        </div>

        <div className="py-20">

            <div className=" py-5 animate-slidein opacity-0 [--slidein-delay:300ms]">
                <div className="text-center text-gray-700 text-5xl drop-shadow-lg font-bold dark:text-customred">Introducing Batwa</div>
            </div>

            <div className="animate-slidein opacity-0  [--slidein-delay:300ms] text-center font-bold text-4xl text-gray-700 pt-4 dark:text-customred">
                <div className="pb-5">A Crypto Wallet</div>
                <img loading="lazy" src="../image.png" 
                className="bg-auto pt-15 w-30 h-40 mx-auto" alt="Icon" />
            </div>

            <div className="flex justify-center pt-10 py-5 animate-slidein opacity-0 [--slidein-delay:700ms] ...">
                <button type="button" className="flex justify-start text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2
                 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Let's Get Started <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                </button>
            </div>

        </div>

    </div>
}
