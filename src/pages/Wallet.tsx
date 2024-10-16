import { Header } from "../components/Header"
import { SelectWallet } from "../components/SelectWallet"

export const Wallet = ():JSX.Element =>{
    return <div  className="bg-customBeige min-h-screen  dark:bg-black"> 
        <Header></Header>
        <SelectWallet></SelectWallet>
    </div>
}