import "./Header.css"
import React, { useState } from 'react';
interface HeaderProps {
    isLogin: boolean; 
  }

function Header(props: HeaderProps) {
    const Logined = props.isLogin
 
    return (
        <nav className="nav">
            <ul>

                {Logined ?
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/manual">Manual</a></li>
                </ul> 
                :
                <ul>
                    <li><a href="/">Login</a></li>
                    <li><a href="/sign_up">Sign up</a></li>
                </ul>}

            </ul>
        </nav>
    )
}

export default Header
