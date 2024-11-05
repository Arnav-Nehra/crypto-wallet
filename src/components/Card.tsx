import { useState } from "react"
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
    async function copy(text: string, keyType: string) {
        await navigator.clipboard.writeText(text).then(() => alert(`${keyType} copied`)).catch((error) => console.error(error))
    }
    async function generateWallet() {
        if (mnemonic) {
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
            setPair([...pair, { "publicKey": publicKey, "privateKey": privateKey }])
        }
        else {
            alert("Please generate Mnemonic")
        }
    }
    return (
        <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex justify-between">
                        <h1 className="text-2xl md:text-4xl text-black font-bold font-mono dark:text-customred">
                            Seed Phrase
                        </h1>
                        <button
                            type="button"
                            onClick={async () => {
                                const mn = await generateMnemonic();
                                setMnemonic(mn);
                            }}
                            className="sm:hidden bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm p-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Generate
                        </button>
                    </div>
                    {/* Search Form */}
                    <div className="mt-6">
                        <form className="w-full">
                            <label htmlFor="search" className="sr-only">
                                Enter your seed Phrase
                            </label>
                            <div className="relative">
                                    <input
                                    type="text"
                                    id="search"
                                    defaultValue={mnemonic}
                                    className="w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Generate your Seed phrase"
                                />
                                <button
                                    type="button"
                                    onClick={async () => {
                                        const mn = await generateMnemonic();
                                        setMnemonic(mn);
                                    }}
                                    className="hidden sm:block absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
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
                        className="w-full sm:w-auto bg-white border-gray-400 border-2 hover:bg-blue-100 dark:bg-gray-200 dark:border-white text-black dark:hover:bg-gray-500 font-medium rounded-lg px-6 py-3 transition-colors"
                    >
                        Create Solana Wallet
                        <img src="https://cdn.worldvectorlogo.com/logos/solana.svg" className=" inline-block h-5 w-5 ml-2" alt="hello" />
                    </button>
                </div>

                {/* Wallet Cards */}
                <div className="space-y-4">
                    {pair.map((p, index) => (
                        <div key={index} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-100 bg-gray-50 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 p-4 md:p-6 w-auto">
                            <div className="space-y-4">

                                <div className="flex justify-between">
                                    <h2 className="text-lg font-medium text-black dark:text-white">
                                        Wallet {index + 1}
                                    </h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 dark:fill-gray-200 dark:hover:fill-gray-400 size-5">
                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                    </svg>
                                </div>

                                {/* Public Key Section */}
                                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                    <span className="min-w-24 text-black dark:text-white">Public Key:</span>
                                    <div className="flex-1 flex items-center gap-2">
                                        <input
                                            className="w-auto sm:w-full bg-white text-black border-black border-2 dark:bg-gray-200 rounded-md p-2 text-sm md:text-base"
                                            value={p.publicKey}
                                            readOnly
                                        />
                                        <button
                                            onClick={() => copy(p.publicKey, "Public Key")}
                                            className="p-2 rounded-md"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 hover:fill-gray-400 dark:fill-white  dark:hover:fill-gray-200">
                                                <path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clip-rule="evenodd" />
                                                <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                                                <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                                            </svg>

                                        </button>
                                    </div>
                                </div>

                                {/* Private Key Section */}
                                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                    <span className="min-w-24 text-black dark:text-white">Private Key:</span>
                                    <div className="flex-1 flex items-center gap-2">
                                        <input
                                            className="w-full  bg-white text-black border-black border-2 dark:bg-gray-200 rounded-md p-2 text-sm md:text-base"
                                            value={toggleStates[index] ? p.privateKey : ""}
                                            readOnly
                                        />
                                        <button
                                            onClick={() => togglePrivateKey(index)}
                                            className="p-2 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 hover:fill-gray-400 dark:fill-white  dark:hover:fill-gray-200">
                                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => copy(p.privateKey, "Private Key")}
                                            className="p-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 hover:fill-gray-400 dark:fill-white  dark:hover:fill-gray-200">
                                                <path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clip-rule="evenodd" />
                                                <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                                                <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
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