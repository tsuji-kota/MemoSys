import "./Header.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { Grid,GridItem} from '@chakra-ui/react'
interface HeaderProps {
    isLogin: boolean; 
    UserName: string;
    loginUserId: string;
  }


function Header(props: HeaderProps) {
    
    const UserName = props.UserName
    const loginUserId = props.loginUserId
    const clearsession = () => {
    sessionStorage.removeItem('isLogin');
    sessionStorage.removeItem('isLogin_id');
    sessionStorage.removeItem('isLogin_name');
    }
 
    return (
        <nav className="nav">
            {sessionStorage.getItem('isLogin') === 'true' && sessionStorage.getItem('isLogin_name') ==='admin'&& sessionStorage.getItem('isLogin_id')==='1' ?
            
                <Grid templateColumns='repeat(20, 1fr)' gap={0}>
                    <GridItem colStart={2} colSpan={4}   > 
                    <ul>
                        <li><a href="/admin">Admin</a></li>
                        <li><a href="/" onClick={clearsession} >Logout</a></li>
                    </ul> 
                    </GridItem>
                    <GridItem colStart={17} colSpan={4}  >                
                        <a>{sessionStorage.getItem('isLogin_name')}</a>
                    </GridItem>
                </Grid>
            :sessionStorage.getItem('isLogin') === 'true' ?
            <Grid templateColumns='repeat(20, 1fr)' gap={0}>
                    <GridItem colStart={2} colSpan={4}   > 
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/" onClick={clearsession} >Logout</a></li>
                    </ul> 
                    </GridItem>
                    <GridItem colStart={17} colSpan={4}  >                
                        <a>{sessionStorage.getItem('isLogin_name')}</a>
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
