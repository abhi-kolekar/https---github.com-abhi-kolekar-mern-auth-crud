
import { useEffect, useState } from 'react'
import Usertable from './Usertable'
import {getalluser} from './../services/userService'
const Userslist=()=>{
    const [data,setdata]=useState([]);

    useEffect(()=>{
        getalluser().then(res=>{
            if(res.data.user){
                setdata(res.data.user)
            }
        }).catch(err=>{

        })
    },[])
    console.log(data)
    return (
       
        <>
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive" style={{overflow:'visible'}}>
                        <Usertable userdata={data} />
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default Userslist

