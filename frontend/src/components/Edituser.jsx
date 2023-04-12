
import { useEffect, useState } from 'react'
import {updateuser, getuser} from './../services/userService'
import { toast } from 'react-toastify';
import { useNavigate,useParams,redirect  } from "react-router-dom";


const Edituser=()=>{
    const params=useParams();
    const navigate = useNavigate();
    const [loaded,setLoaded]=useState(false);
    const [formdata,setFormdata]=useState({
        _id:'', name:'',email:'',address:'',mobile:'', pic:''
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
        newformData.append('mobile',formdata.mobile);
        newformData.append('pic',formdata.pic)
    
       let resp=toast.promise(updateuser(params.id, newformData),
                {
                  pending: 'Submitting...',
                  success: 'User updated',
                  error: 'Failed'
                });   
            resp.then((response) => {
                    //navigate('/login')
                    console.log(response) 
            }).catch(function (error) {
                    console.log(error) 
                
            });
    }
    const getData=()=>{
        let resp=toast.promise(getuser(params.id),
        {
            pending: 'fetching...',
            success: 'Data fetched',
            error: 'Failed'
        });   
        resp.then((response) => {
            setLoaded(true);
            setFormdata((prev)=>{
                return {...prev, ...response.data.user}
            });
                console.log(response) 
        }).catch(function (error) {
                
            
        });
    }
    useEffect(()=>{
        console.log('1') 
        if(loaded===false){
            getData();
        }
        //
    },[])
    
    return (
       
        <>
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive" style={{overflow:'visible'}}>
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
                            <label >Address:</label>
                            <input type="textarea" className="form-control" name="address" value={formdata.address} onChange={e=>updatedata(e)} required/>
                        </div>
                        <div className="form-group">
                            <label >Mobile:</label>
                            <input type="number" className="form-control" name="mobile" value={formdata.mobile} onChange={e=>updatedata(e)} required/>
                        </div>
                        <div className="form-group">
                            <label >Pic:</label>
                            <input type="file" className="form-control" name="pic"  onChange={e=>changeFile(e)}  />
                        </div>
                        <div className="form-group mt-2">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default Edituser

