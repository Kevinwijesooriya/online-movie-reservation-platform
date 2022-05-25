import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



const UserManagement = () => {
    const state = useContext(GlobalState);
    const [token] = state.token
    const [users,setUsers]=useState([]);
    const [cb,setCB]=useState(true);
    const [onEdit,setOnEdit]=useState(false);
    const [role,setRole]=useState();

    useEffect(() => {
        const getUsers =async()=>{
            if(cb){
                try {
                    const res = await axios.get('http://localhost:5010/api/admin/getusers', {
                    headers: {Authorization: token}
                })
                    setUsers(res.data);
                } catch (error) {
                    console.log(error);
                }
                setCB(false);
            }
          
        }
        getUsers();
    
    }, [token,cb])

    const updateUser =async(id)=>{
        try {
            const res2 = await axios.get(`http://localhost:5010/api/admin/userUpdate/${id}`, {
                headers: {Authorization: token}
            });
            console.log(res2);
            setCB(true);
            setOnEdit(false);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser =async(id)=>{
        console.log(id);
        try {
           
            const res3 = await axios.delete(`http://localhost:5010/api/admin/deleteuser/${id}`, {
                headers: {Authorization: token}
            });
            console.log(res3);
            setCB(true);
        } catch (error) {
            console.log(error);
        }
    }

    const onediteHnler=(id,role)=>{
        
    }

    const handleRole=(e)=>{
        setRole(e.target.value);
    }

   

  return (
    <>
      <ToastContainer/>
      <div className='history-page formBody'>
      <h1>User Management</h1>
      <br/>
      <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Date of Created</th>
                        <th>name</th>
                        <th>Phone</th>
                        <th>Role
                        </th>
                        <th></th>
                        <th></th>
                   

                    </tr>
                </thead>
                <tbody>
               {
                   
                    users.map(items => (
                        <tr key={items._id}>
                            <td>{items._id}</td>
                            <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                            <td>{items.name}</td>
                            <td>{items.phone}</td>
                            <td>{onEdit?<>

                                <select name="role" value={role} onChange={handleRole} >
                                    <option value='0'>Customer</option>
                                    <option value='1'>Admin</option>
                                    <option value='2'>Super Admin</option>
                                    
                                </select>

                            <br/>
                                <button onClick={onediteHnler} className='btn btn-outline-success'>Update</button>
                            
                            </>:items.role===0?<>Customer</>:items.role===1?<>Admin</>:items.role===2?<>Super Admin</>:<>Not Provided</>}</td>
                            <td>
                            <button onClick={onediteHnler(items._id,items.role)} className='btn btn-outline-warning'>Edit</button> 
                            </td>
                            <td><button onClick={""} className='btn btn-outline-danger'>Delete</button></td>
                        </tr>
                    ))
                
               }
                     
                    
                  
                    
                  
                    
                </tbody>
            </table>

      </div>
      
    
    
    </>
  )
}

export default UserManagement