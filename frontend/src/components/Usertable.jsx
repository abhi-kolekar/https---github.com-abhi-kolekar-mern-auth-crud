import { useState,useEffect,useRef } from "react";
import { useNavigate,Link } from "react-router-dom"
import {deleteuser} from './../services/userService'
import { toast } from 'react-toastify';
const tableHead = {
    _id: "Id",
    name: "Name",
    email: "Email",
    address: "Address",
    mobile: "Mobile",
    photo: "Photo",
    action: "Actions"
};

const Usertable=({userdata})=>{
    
    const navigate =useNavigate();
    const [collection, setCollection] = useState([])
    


    const handleClick=(event,id)=>{
        if(event.detail===2){
            navigate(`${id}`)
        }
    }

    const removedata=async(id)=>{
        console.log(id)
        try{
            await deleteuser(id)
                .then(res=>{
                    console.log(res)
                })
                .catch((err)=>{
                    console.log(err)
                })
        }catch(err){
            console.log(err)
        }
        let resp=toast.promise(deleteuser(id),
                {
                  pending: 'User Deleting...',
                  success: 'User Deleted',
                  error: 'Failed'
                });   
            resp.then((response) => {
                    let userlist= collection.filter((obj)=> obj._id != id)
                    setCollection(userlist)
                    console.log(response) 
            }).catch(function (error) {
                    console.log(error) 
            });
    }

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
        if(keyD==='action'){
                return (<>
                    <td key={i} onClick={(e)=>handleClick(e,key._id)}>
                        <Link  to={`/users/${key._id}/edit`} className="btn btn-warning">Edit</Link> | 
                        <button className="btn btn-danger" onClick={e=>removedata(key._id)}>Remove</button>
                    </td>
                </>);
        }
      
        if(keyD==='photo'){
            return (<>
                <td key={i}>
                   <img src={`http://localhost:8000/${key[keyD]}`} width={50} />
                </td>
            </>);
        }
        return <td key={i}>{key[keyD]}</td>;
        });
    
        return <tr key={index}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        // return all values(not key) from json object in to array 
        return Object.values(tableHead).map((title, index) => (
          <td key={index}>{title}</td>
        ));
    };
    useEffect(()=>{
        setCollection(userdata)
    },[userdata])
    console.log(collection)
    return(
        <>
        <table className="table table-striped table-bordered" >
            <thead>
                <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
        </table>
        </>
    )
}
export default Usertable;


