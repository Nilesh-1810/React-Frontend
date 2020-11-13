import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formContainer:{
  
},
textSpace:{
    
}
}));

export default function UpdateModel(props) {  
const classes = useStyles();
const  [firstName ,setFirstName]= useState(props.data.FirstName); 
const  [lastName ,setLastName]= useState(props.data.LastName); 
const  [mobileNo ,setMobileNo]= useState(props.data.MobileNo); 
const  [email ,setEmail]= useState(props.data.Email); 
const  [dob ,setDob]= useState(props.data.Dob); 
const  [bio ,setBio]= useState(props.data.bio); 

const postValue=async()=>{
   
    let FormData={
        _id:props.data._id,
        FirstName:firstName,
        LastName:lastName,
        MobileNo:mobileNo,
        Email:email,
        date:dob,
        bio:bio
    };
   await  Axios.post("http://localhost:8080/user",FormData)
    .then((res)=>{debugger;props.updateReducer(res.data.data)})
    .catch((err)=>console.log(err));

    setFirstName("");
    setLastName("");
    setMobileNo("");
    setEmail("");
    setDob("");
    setBio("");
   // props.fetchUsers();
    props.close();
};

  return (
    <div>
      <div className={classes.formContainer}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
           
          <form style={{flexDirection:"column", display:"flex"}} > 
         <h2>Input Form</h2>
            <TextField id="standard-basic" label="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
            <TextField id="standard-basic" label="Last Name"  value={lastName} onChange={(e)=>{setLastName(e.target.value)}}  />
            <TextField id="standard-basic" label="Mobile No."  value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}} />
            <TextField id="standard-basic" label="Email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <TextField
                id="date"
                label="Birthday"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                value={dob} onChange={(e)=>{setDob(e.target.value)}}
            />
            <TextareaAutosize className = {classes.textSpace} aria-label="minimum height" rowsMin={3} placeholder="Bio"   value={bio} onChange={(e)=>{setBio(e.target.value)}} />

         <Button className = {classes.textSpace} variant="contained" color="primary" onClick={postValue}>Submit</Button>
    </form>
    
          </div>
        </Fade>
      </Modal>
      </div>
    </div>
  );
}
