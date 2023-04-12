import { useState } from "react";
import {userlogin} from './../services/authService'
import { toast } from 'react-toastify';
import { useNavigate,redirect  } from "react-router-dom";
const Login=()=>{
    const navigate = useNavigate();
    const [formdata,setFormdata]=useState({
        email:'',password:''
    })
    function updatedata(e){
        const {name,value} = e.target;
        setFormdata(prev=>{
            return {...prev,[name]:value}
        })
    }

    const submitform=(e)=>{
        e.preventDefault();
    
       let resp=toast.promise( userlogin(formdata),
                {
                  pending: 'Logging in...',
                  success: 'Login successfully',
                  error: 'User Unauthenticated'
                });   
            resp.then((response) => {
                    if (response.data) {
                        localStorage.setItem("restuser", JSON.stringify(response.data));
                    }
                    navigate('/')
                    console.log(response) 
            }).catch(function (error) {
                    console.log(error) 
                
            });
    }
    return(
        <>
        <div className="row justify-content-center mt-3">
            <h4 className="text-center">Login form</h4>
            <div className="col-md-6">
            <form onSubmit={submitform}>
                <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" name="email" value={formdata.email} onChange={e=>updatedata(e)} required/>
                </div>
                <div className="form-group">
                    <label >Password:</label>
                    <input type="password" className="form-control" name="password" value={formdata.password} onChange={e=>updatedata(e)} required/>
                </div>
                <div className="form-group mt-2">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
                
                </form>
            </div>
        </div>
        </>
    )
}
export default Login;