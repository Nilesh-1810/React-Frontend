import { INSERT_DATA, DELETE_DATA, UPDATE_DATA } from './submitType';

const initialState={
    user:[]
//    firstName:"",
//    lastName:"",
//      MobileNo:"",
//         Email:"",
//         date:"",
//         bio:""
}

const formReducer=(state=initialState,action)=>{
    console.log("in form Reducer >>action :"+ JSON.stringify(action,null,2));
        switch (action.type){
            case INSERT_DATA : return{
                ...state,
                user:action.userData
            }

            case DELETE_DATA : 
            state.user=state.user.filter((data)=>data._id!=action.userData._id)
            return{
                ...state
            }

            case UPDATE_DATA : 
            state.user=state.user.map((data)=>{
                if(data._id==action.userData._id)
                {
                    console.log("Update data reducer");
                    data=action.userData;
                    return data;
                }
                return data;
            });
            return{
                ...state,
            }
            
            
            default: return state;
        }
}
export default formReducer;