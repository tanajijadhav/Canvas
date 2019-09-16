export default function reducer(state={
    permissionCode : {
        permission_list : []  
    },
},action){
    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                permissionCode : {
                    ...state.permissionCode,
                    ...action.payload
                }
            })
        }
    }
    return state
}