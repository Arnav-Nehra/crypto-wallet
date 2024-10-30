import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { Wallet } from './pages/Wallet';

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
