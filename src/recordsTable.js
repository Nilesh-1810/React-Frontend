import MaterialTable from 'material-table';
import React, { forwardRef,useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
import UpdateModel from "./updateModel";
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {insertData, deleteData, updateData}  from './Reducer';



function RecordsTable(props){
    const [users,setUsers]=useState([]);
    const [openModel ,setOpenModel]= useState(false);
    const [updateData,setUpdateData]=useState();
    const fetchUsers=()=>{
        axios.get("http://localhost:8080/user")
        .then((res)=>{
          debugger;
          props.insertUserData(res.data.Data)})
        .catch((err)=>{console.log(err)});
    }
    useEffect(()=>{
        fetchUsers();
    },[]);
    let tableIcons = {
        Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />)
      };
      const handleClose = () => {
        setOpenModel(false);
        setUpdateData();
      };
const  editUser=(data)=>{
    setUpdateData(data);
    setOpenModel(true);
console.log(data);
}
const deleteUser = async(data)=>{
   await axios.post("http://localhost:8080/user/delete",data)
    .then((res)=>{
      debugger;
      props.deleteUserData(res.data.Data)})
    .catch((err)=>{console.log(err)});

   // fetchUsers();

}
     
    return(
        <div>
         {updateData && ( <UpdateModel updateReducer={props.updateUserData} open={openModel} close={handleClose} data={updateData} fetchUsers={fetchUsers} />)}
          
   {props.userData && props.userData.length >0 ? <MaterialTable
   
      title={"user data"}
      columns={[
        {
          title: `First Name`,
          field: "FirstName",
          render:(rowData)=>rowData.FirstName,
        },
        {
          title: "Last Name",
          field: "LastName",
         
        },
        {
          title: "Mobile Number",
          field: "MobileNo",
        },
        {
          title: "Email",
          field: "Email",
        },
        {
          title: "Dob",
          field: "Dob",
         
        },
        {
            title: "bio",
            field: "bio",
           
          },
      ]}
      data={props.userData}
      options={{ sorting: true }}
      icons={tableIcons}
      actions={[
        {
          icon: tableIcons.Edit,
          onClick: (event, rowData) =>editUser(rowData),
        },
        {
            icon: tableIcons.Delete,
            onClick: (event, rowData) =>deleteUser(rowData),
          },
       
      ]}
    />:<h3>No Data Found!!</h3>}
        </div>);
}

const mapStatetoProps=(state)=>{
  debugger;
  return{
      userData:state.user
  }
}
const mapDispatchtoProps=(dispatch)=>{
  // debugger;
  return{
      insertUserData:(data)=>{
          dispatch(insertData(data));
      },

      deleteUserData:(data)=>{
        dispatch(deleteData(data));
      },

      updateUserData:(data)=>{
        dispatch(updateData(data));
      }

  }
}

export default connect(mapStatetoProps,mapDispatchtoProps) (RecordsTable);
