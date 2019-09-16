export default function reducer(state={
    announcementStudent : {
        announcement_list : [],
        created_by_list : [],
        course_id : null
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                announcementStudent : {
                    ...state.announcementStudent,
                    ...action.payload
                }
            })
        }
    }
    return state
}