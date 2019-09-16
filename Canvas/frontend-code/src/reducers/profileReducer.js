export default function reducer(state={
    profile : {
        name : null,
        phone_number : null,
        about_me : null,
        city : null,
        country : null,
        company : null,
        school : null,
        hometown : null,
        language : null,
        gender : null,
        profile_pic : null,
        message: null,
        alertClass : "alert alert-success",
        first : true,
    },
},action){

    switch(action.type){
        case "GET_PROFILE" : {
            // console.log("Inside reducer\n",action.payload)
            // console.log({...state,profile:action.payload})
            return {...state,profile:action.payload}
        }
        case "WRITE_PROFILE" : {
            let obj_key = Object.keys(action.payload)[0]
            return Object.assign({},...state,{
                profile : {
                    ...state.profile,
                    ...action.payload
                }
            })
        }
    }
    return state
}