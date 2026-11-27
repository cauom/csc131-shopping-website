import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import App from "./App.tsx";
import Login from './Login.tsx'
import './Navbar.css'

export default function Navbar() {
    return (
        <>
        <BrowserRouter>
            <nav id="nav-bar">
                <ul id="nav-menu">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/login"><li>Login</li></Link>
                </ul>
            </nav>


            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/login" element={<Login/>}/>
            </Routes>

        </BrowserRouter>
        </>
    )
}