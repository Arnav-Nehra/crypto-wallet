export const Card = (): JSX.Element => {
    return <div className="flex flex-col bg-inherit py-4 px-12">
        <div className="py-4">
            <div className="pl-[116px] pr-[205px] py-8">
                <div className="text-4xl text-black font-bold font-mono dark:text-customred pb-4 ">Seed Phrase</div>
                <div>
                    <form>
                        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Enter your seed Phrase</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Seed phrase or generate Automatically" required />
                            <button type="button" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate/Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="flex flex-col px-20 md:px-10 md:flex-row items-center justify-center gap-6">
            <div>
                <div className="px-9 pt-10 pb-14 bg-customorange rounded-b-lg">
                    <div className="text-white space-y-4 flex">
                        <div className="text-xl font-bold lead-xl bold pt-4">Solana Wallet</div>
                        <div className="pl-4 pb-2">
                        <button type="button" className=" text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Wallet</button>
                        </div>                    
                    </div>
                    
                    <div className="flex justify-between pt-8">
                        <ul className="flex flex-col gap-y-2.5">
                            <li className="flex space-x-3 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                            className="size-6 "><path stroke-linecap="round" stroke-linejoin="round" 
                            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" /></svg>
                                <span className="paragraph-l font-bold text-xl ">Wallet 1 :<ul>
                                    <li className="flex space-x-3 text-white ">
                                        Public Key:
                                    </li>
                                    <li className="flex space-x-3 text-white pt-1">
                                        Private Key:
                                    </li>
                                </ul></span>
                                
                            </li>                                
                        </ul>
                    </div>
                </div>
            </div>
            <div className="">
            <div className="px-9 pt-10 pb-14 bg-custompurple rounded-b-lg">
                    <div className="text-white space-y-4 flex">
                        <div className="text-xl font-bold lead-xl bold pt-4">Solana Wallet</div>
                        <div className="pl-4 pb-2">
                        <button type="button" className=" text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Wallet</button>
                        </div>                    
                    </div>
                    
                    <div className="flex justify-between pt-8">
                        <ul className="flex flex-col gap-y-2.5">
                            <li className="flex space-x-3 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                            className="size-6 "><path stroke-linecap="round" stroke-linejoin="round" 
                            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" /></svg>
                                <span className="paragraph-l font-bold text-xl ">Wallet 1 :<ul>
                                    <li className="flex space-x-3 text-white ">
                                        Public Key:
                                    </li>
                                    <li className="flex space-x-3 text-white pt-1">
                                        Private Key:
                                    </li>
                                </ul></span>
                                
                            </li>                                
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
