import "./Header.css"
import React, { useState } from 'react';
import { Grid,GridItem} from '@chakra-ui/react'
interface HeaderProps {
    isLogin: boolean; 
    UserName: string;
    loginUserId: string;
  }

function Header(props: HeaderProps) {
    const Logined = props.isLogin
    const UserName = props.UserName
    const loginUserId = props.loginUserId
 
    return (
        <nav className="nav">
            {Logined ?
            
                <Grid templateColumns='repeat(20, 1fr)' gap={0}>
                    <GridItem colStart={2} colSpan={4}   > 
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/">Logout</a></li>
                    </ul> 
                    </GridItem>
                    <GridItem colStart={17} colSpan={4}  >                
                        <a>tsuji.kota@mikilab.doshisha.ac.jp</a>
                    </GridItem>
                </Grid>
            :
            <Grid templateColumns='repeat(20, 1fr)' gap={0}>
            <GridItem colStart={2} colSpan={4}   > 
            <ul>
                <li><a href="/">Login</a>   </li>
                <li><a href="/sign_up">Sign up</a></li>
            </ul> 
            </GridItem>
            </Grid>
            
            }
    
        </nav>
    )
}

export default Header
