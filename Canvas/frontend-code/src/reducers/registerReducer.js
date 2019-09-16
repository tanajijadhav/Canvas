export default function reducer(state={
    register : {
        alertClass : "alert alert-success",
        message : null,
        first : true,
    },
},action){

    switch(action.type){
        case "WRITE_REGISTER" : {
            let obj_key = Object.keys(action.payload)[0]
            return Object.assign({},...state,{
                register : {
                    ...state.register,
                    ...action.payload
                }
            })
        }
    }
    return state
}