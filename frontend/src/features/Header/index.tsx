import "./Header.css"
import React, { useState } from 'react';

function Header() {
    const [Logined, setLogined] = useState<boolean>(false)
 
    

    return (
        <nav className="nav">
            <ul>
                {Logined?
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/manual">Manual</a></li>
                </ul>:
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/sign_up">Sign up</a></li>
                </ul>}
                {/* <li><a href="/result">Result</a></li>
                <li><a href="/admin">Admin</a></li> */}
            </ul>
        </nav>
    )
}

export default Header
