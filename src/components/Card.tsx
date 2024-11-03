import {useState} from "react"
import nacl from "tweetnacl"


import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Buffer } from "buffer";

export const Card = (): JSX.Element => {
    const [mnemonic, setMnemonic] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);  
    const [pair, setPair] = useState<{ publicKey: string; privateKey: string }[]>([])
    const [toggleStates, setToggleStates] = useState({} as Record<number, boolean>)
    function togglePrivateKey(index: number) {
        setToggleStates(prevStates => ({
            ...prevStates,
            [index]: !prevStates[index]
        }));
    }
    async function copy(text:string,keyType:string){
        await navigator.clipboard.writeText(text).then(()=>alert(`${keyType} copied`)).catch((error)=>console.error(error))
    }
        async function generateWallet(){
            if(mnemonic){
            console.log(mnemonic)
            const seed = mnemonicToSeedSync(mnemonic);
            console.log(seed)
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            console.log(derivedSeed)
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            console.log(secret)
            const keypair = Keypair.fromSecretKey(
                Buffer.from(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
              );
            console.log(keypair)
            const privateKey = Buffer.from(keypair.secretKey).toString("hex");
            const publicKey = keypair.publicKey.toBase58();
            setCurrentIndex(currentIndex + 1)
            setPair([...pair,{"publicKey":publicKey,"privateKey":privateKey}])
            }
            else{
                alert("Please generate Mnemonic")
            }
        }
        return (
            <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-4xl text-black font-bold font-mono dark:text-customred">
                            Seed Phrase
                        </h1>
                        
                        {/* Search Form */}
                        <div className="mt-6">
                            <form className="w-full">
                                <label htmlFor="search" className="sr-only">
                                    Enter your seed Phrase
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="search"
                                        value={mnemonic}
                                        className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Enter your Seed phrase or generate Automatically"
                                    />
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            const mn = await generateMnemonic();
                                            setMnemonic(mn);
                                        }}
                                        className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
    
                    {/* Wallet Generation Button */}
                    <div className="mb-6">
                        <button
                            onClick={generateWallet}
                            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg px-6 py-3 transition-colors"
                        >
                            Create Solana Wallet
                        </button>
                    </div>
    
                    {/* Wallet Cards */}
                    <div className="space-y-4">
                        {pair.map((p, index) => (
                            <div key={index} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-100 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 p-4 md:p-6 sm:w-1/2">
                                <div className="space-y-4">
                                    <h2 className="text-lg font-medium text-black dark:text-white">
                                        Wallet {index + 1}
                                    </h2>
                                    
                                    {/* Public Key Section */}
                                    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                        <span className="min-w-24 text-black dark:text-white">Public Key:</span>
                                        <div className="flex-1 flex items-center gap-2">
                                            <input
                                                className="w-full bg-gray-500 text-white rounded-md p-2 text-sm md:text-base"
                                                value={p.publicKey}
                                                readOnly
                                            />
                                            <button
                                                onClick={() => copy(p.publicKey, "Public Key")}
                                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                                            >
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
    
                                    {/* Private Key Section */}
                                    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                        <span className="min-w-24 text-black dark:text-white">Private Key:</span>
                                        <div className="flex-1 flex items-center gap-2">
                                            <input
                                                className="w-full bg-gray-500 text-white rounded-md p-2 text-sm md:text-base"
                                                value={toggleStates[index] ? p.privateKey : ""}
                                                readOnly
                                            />
                                            <button
                                                onClick={() => togglePrivateKey(index)}
                                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                                            >
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => copy(p.privateKey, "Private Key")}
                                                className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                                            >
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };