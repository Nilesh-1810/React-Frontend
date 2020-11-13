import React, { useState } from 'react';
import './App.css';
import InputForm from './inputForm';
import RecordsTable from './recordsTable';
import { makeStyles } from '@material-ui/core/styles';
import { Button} from '@material-ui/core';
import {Provider} from 'react-redux';
import store from './Reducer/store';


const useStyles = makeStyles({
 mainDiv:{
  marginLeft:"5%",
  marginTop:"5%",
  textAlign:"center"
 }
}) 

function App() {
  const  [choise ,setChoise]= useState("table");
  const classes = useStyles();
  return (
    <Provider store={store}>
    <div  className={classes.mainDiv}>
      <div style={{display:"flex"}}>
            <Button  className = {classes.textSpace}variant="contained" onClick={()=>setChoise("form")}  >create</Button>
            <Button  className = {classes.textSpace} style={{marginLeft:"10px", color : "#red"}} variant="contained" onClick={()=>setChoise("table")} >view</Button>
     </div>
     <div style={{marginTop:"20px"}}>
      {choise=="table"? <RecordsTable/>: <InputForm/>}
      </div>
      
     
     
    </div>
    </Provider >
  );
}

export default App;
