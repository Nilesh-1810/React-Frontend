import { INSERT_DATA, DELETE_DATA, UPDATE_DATA } from './submitType';

export const insertData=(userData)=>{
    return{
        userData,
        type: INSERT_DATA
    }
}
export const deleteData=(userData)=>{
    return{
        userData,
        type: DELETE_DATA
    }
}
export const updateData=(userData)=>{
    return{
        userData,
        type: UPDATE_DATA
    }
} 
