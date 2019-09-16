export default function reducer(state={
    announcementFaculty : {
        course_id : null,
        title : null,
        announce_message : null,
        announcement_list : [],
        created_by_list : [],
        alertClass : null,
        first : true,
        success : false,
        message : null,
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                announcementFaculty : {
                    ...state.announcementFaculty,
                    ...action.payload
                }
            })
        }
    }
    return state
}