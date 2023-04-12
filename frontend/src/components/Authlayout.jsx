import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom"
import {getToken, getLoggeduserinfo} from './../services/authService'
import Navbar from './Navbar';
const Authlayout=()=>{
    const navigate = useNavigate();
    const [user,setUser]=useState({isLoggedIn:false, isLoaded:false, email:null});
    
    const getLoggeduser = ()=>{
        
         getLoggeduserinfo().then(res=>{
            if(res.data.user){
                //localStorage.setItem("restuser", JSON.stringify(res.data.user));
            }
            setUser(prev=>{
                return {...prev, isLoggedIn:true, isLoaded:true, email:res.data.user.email,}
            })
        })
        .catch(err=>{
            localStorage.removeItem('restuser');
            navigate('/login')
        })
    }

    useEffect(()=>{
            if(!user.isLoggedIn && getToken()){
                getLoggeduser();
            }else if(!user.isLoaded){
                navigate('/login')
            }
    },[])
    console.log(user)
   
    return(
        <>
        <div className="container-scroller">
        {user.isLoggedIn
            ? <>
               <Navbar /> 
               <div className="container-fluid page-body-wrapper">
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Outlet />
                        </div>
                    </div>
                </div> 
            </>
            : <>
            </>
        }
            
        </div>
        
        </>
    )
}
export default Authlayout;