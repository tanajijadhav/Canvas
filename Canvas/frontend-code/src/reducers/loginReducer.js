export default function reducer(state={
    login : {
        alertClass : "alert alert-success",
        message : null,
        first : true,
    },
},action){

    switch(action.type){
        case "WRITE_LOGIN" : {
            let obj_key = Object.keys(action.payload)[0]
            return Object.assign({},...state,{
                login : {
                    ...state.login,
                    ...action.payload
                }
            })
        }
    }
    return state
}