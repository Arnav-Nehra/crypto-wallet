import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { Wallet } from './pages/Wallet';
import { useState } from 'react';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { generateMnemonic } from 'bip39';
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
// defineConfig({
//   plugins: [react(), nodePolyfills()],
// })

function App() {


return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/create-wallet" element={<Wallet></Wallet>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
