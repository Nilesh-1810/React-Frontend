import { Button, TextField } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";
import {connect} from 'react-redux';
import {insertData}  from './Reducer';

//import { Form, Input, InputNumber, Button, Select,DatePicker } from 'antd';
import 'antd/dist/antd.css';


//const { Option } = Select;



const useStyles = makeStyles({
    formContainer:{
        padding: "10px 20px",
       width:"300px",
        marginTop: "2%"
    },
    textSpace:{
        marginTop:"10%",
    }
}) 
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  // const validateMessages = {
  //   required: '${label} is required!',
  //   types: {
  //     email: '${label} is not validate email!',
  //     number: '${label} is not a validate number!',
  //   },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}',
  //   },
  // };
  
  



function InputForm(props){
const classes = useStyles();
const  [firstName ,setFirstName]= useState(); 
const  [lastName ,setLastName]= useState(); 
const  [mobileNo ,setMobileNo]= useState(); 
const  [email ,setEmail]= useState(); 
const  [dob ,setDob]= useState(); 
const  [bio ,setBio]= useState(); 
const  [numberValidation,setNumberValidation]=useState("");
const [firstNameValidation,setFirstNameValidation]=useState("");

const postValue=(e)=>{
    e.preventDefault();
  let mobile=  `${mobileNo}`;
    if(mobile=="" || mobile.length != 10){
        setNumberValidation("true");
        return;
    }else{
        setNumberValidation("");
    }
    // if(firstName=="" ){
    //     setFirstNameValidation("true");
    //     return;
    // }
    // else{
    //     setFirstNameValidation("")
    // }
   
  
  
    let FormData={
        FirstName:firstName,
        LastName:lastName,
        MobileNo:mobileNo,
        Email:email,
        date:dob,
        bio:bio
    };
    axios.post("http://localhost:8080/user",FormData)
    .then((res)=>{
      console.log(res.data.Data); 
      debugger;
      props.insetUserData(res.data)
    })
    .catch((err)=>console.log(err));
    setFirstName("");
    setLastName("");
    setMobileNo("");
    setEmail("");
    setDob("");
    setBio("");
    
};

    const onFinish = (values) => {
      console.log(values);
};

function onChange(date, dateString) {
  console.log(date, dateString);
}
    return(
        
        <div className={classes.formContainer}>
            
        {
      //   <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      //   <Form.Item
      //     name={['user','firstName']} value={firstName}
      //     label="First Name"
      //     rules={[
      //       {
      //         required: true,
              
      //       },
      //     ]}
      //   >
      //     <Input onChange={(e)=>{setFirstName(e.target.value)}} />
          
      //   </Form.Item>

      //   <Form.Item
      //     name={['user','lastName']}
      //     value={lastName}
      //     label="Last Name"
      //     rules={[
      //       {
      //         required: true,
      //       },
      //     ]}
          
      //   >
      //     <Input />
      //   </Form.Item>

      //   <Form.Item
      //     name={['user','mobileNo']} value={mobileNo} label="Mobile No." rules={[
      //       {
      //         required: true,
              
      //       },
      //     ]}
      //   >
      //     <Input />
      //   </Form.Item>

    
      //   <Form.Item
      //     name={['user', 'email']}  label="Email"  value={email} rules={[
      //       {
      //         type: 'email',
      //         required: true
      //       },
      //     ]}
          
      //   >
      //     <Input />
      //   </Form.Item>

        

      //   <Form.Item label="Date of Birth" name={['user', 'dob']} value={['dob']} InputLabelProps={{
      //         shrink: true,
      //         }}
      //   rules={[
      //     {
      //       type: 'date',
            
      //     },
      //   ]}>
      //     <DatePicker onChange={onChange}/>
      //   </Form.Item>

        
    
      //   <Form.Item name={['user', 'bio']} label="Bio">
      //     <Input.TextArea />
      //   </Form.Item>
      //   <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      //     <Button type="primary" variant="contained" htmlType="submit">Submit</Button>
      //   </Form.Item>
      // </Form>
       <form style={{flexDirection:"column", display:"flex"}}  onSubmit={postValue}> 
         <h2>Input Form</h2>
            <TextField id="standard-basic" label="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
            {numberValidation.length >0  && (<p style={{color:"red",padding:"5px 10px"}}>*Name  is Required  </p>)}
            <TextField id="standard-basic" label="Last Name"  value={lastName} onChange={(e)=>{setLastName(e.target.value)}}  />
            <TextField id="standard-basic" label="Mobile No." type="number"  value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}} />
            {numberValidation.length >0  && (<p style={{color:"red",padding:"5px 10px"}}>*number is Required and must be 10 Digit </p>)}
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

         <Button className = {classes.textSpace} variant="contained" color="primary" type="submit">Submit</Button>
    </form> 
    }
    
</div>
    );

}



const mapStatetoProps=(state)=>{
  return{
      userData:state.user
  }
}
const mapDispatchtoProps=(dispatch)=>{
  return{
      insetUserData:function(data){
          dispatch(insertData(data));
      }
  }
}

export default connect(mapStatetoProps,mapDispatchtoProps) (InputForm);

