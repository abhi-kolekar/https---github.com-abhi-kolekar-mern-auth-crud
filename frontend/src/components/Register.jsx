import { useState } from "react";
import {userregister} from './../services/authService'
import { toast } from 'react-toastify';
import { useNavigate,redirect  } from "react-router-dom";
const Register=()=>{
    const navigate = useNavigate();
    const [formdata,setFormdata]=useState({
        name:'',email:'',password:'',address:'',mobile:'', pic:''
    })
    function updatedata(e){
        const {name,value} = e.target;
        setFormdata(prev=>{
            return {...prev,[name]:value}
        })
    }
    function changeFile(e){
            setFormdata(prev=>{
                return {...prev,pic:e.target.files[0]}
            })
    }
    const submitform=(e)=>{
        e.preventDefault();
        
        const newformData=new FormData();
        newformData.append('name',formdata.name);
        newformData.append('email',formdata.email);
        newformData.append('address',formdata.address);
        newformData.append('password',formdata.password);
        newformData.append('mobile',formdata.mobile);
        newformData.append('pic',formdata.pic)
        /*
        userregister(formData)
            .then(response=>{
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
        */
       let resp=toast.promise( userregister(newformData),
                {
                  pending: 'Submitting...',
                  success: 'User Registered',
                  error: 'Failed'
                });   
            resp.then((response) => {
                    navigate('/login')
                    console.log(response) 
            }).catch(function (error) {
                    console.log(error) 
                
            });
    }
    return(
        <>
        <div className="row justify-content-center mt-3">
            <h4 className="text-center">User registration form</h4>
            <div className="col-md-6">
            <form onSubmit={submitform}>
                <div className="form-group">
                    <label >Name:</label>
                    <input type="text" className="form-control"  name="name" value={formdata.name} onChange={e=>updatedata(e)} required/>
                </div>
                <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" name="email" value={formdata.email} onChange={e=>updatedata(e)} required/>
                </div>
                <div className="form-group">
                    <label >Password:</label>
                    <input type="password" className="form-control" name="password" value={formdata.password} onChange={e=>updatedata(e)} required/>
                </div>
                <div className="form-group">
                    <label >Address:</label>
                    <input type="textarea" className="form-control" name="address" value={formdata.address} onChange={e=>updatedata(e)} required/>
                </div>
                <div className="form-group">
                    <label >Mobile:</label>
                    <input type="number" className="form-control" name="mobile" value={formdata.mobile} onChange={e=>updatedata(e)} required/>
                </div>
                <div className="form-group">
                    <label >Pic:</label>
                    <input type="file" className="form-control" name="pic" required onChange={e=>changeFile(e)}  />
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
export default Register;