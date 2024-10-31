import {useState} from "react"
import nacl from "tweetnacl"


import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Buffer } from "buffer";

export const Card = (): JSX.Element => {
    const [mnemonic, setMnemonic] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);  
    const [pair,setPair]=useState([]as any)
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
                        <input type="text" id="search" value={mnemonic} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Seed phrase or generate Automatically" required />
                            <button type="button"  onClick={async()=>{
                                const mn=await generateMnemonic();
                                setMnemonic(mn);
                            }} 
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate</button>
                             </div>
                         </form>
                     </div>
                 </div>
        </div>
        <div className="ps-28">
            <button onClick={generateWallet} className=" bg-blue-700 text-white rounded-md p-2">Create Solana Wallet</button>
            {pair.map((p, index) => {

                return <div className="pt-4">
                    <a className="block max-w-fit p-6  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div>
                        <div className="flex">
                            <div className="text-lg text-black dark:text-white ">
                                <div className="pb-2">Wallet {index + 1}</div>
                                <div className="flex py-1">
                                    <div className="pr-6">Public Key:</div> <input className=" bg-blue-700 text-white text-lg rounded-md p-2 size-auto"
                                        defaultValue={p.publicKey} />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => copy(p.publicKey, "publicKey")} className="size-8 pl-2 pt-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </div>

                                <div className="flex py-1"><div className="pr-4">Private Key:</div> <input className="bg-gray-500 text-white text-lg rounded-md p-2 size-auto" defaultValue={toggleStates[index] ? p.privateKey : ""} />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => togglePrivateKey(index)} className="size-8 pl-2 pt-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => copy(p.privateKey, "Private Key")} className="size-8 pl-2 pt-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                </div>
            }
            )}
        </div>
    </div>
}





// return <div><li className="flex space-x-3 text-white">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
//                             className="size-6 "><path stroke-linecap="round" stroke-linejoin="round" 
//                             d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" /></svg>
//                                 <span className="paragraph-l font-bold text-xl ">Wallet 1 :<ul>
//                                     <li className="flex space-x-3 text-white ">
//                                         Public Key:
//                                     </li>
//                                     <li className="flex space-x-3 text-white pt-1">
//                                         Private Key:
//                                     </li>
//                                 </ul></span>
                                
//                             </li>     
//                             </div>
