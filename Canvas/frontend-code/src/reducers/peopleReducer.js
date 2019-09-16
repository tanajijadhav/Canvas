export default function reducer(state={
    people : {
        course : {},
        student : [],
        profressor : {},
        alertClass : null,
        message : null,
        first : true,
        page_count : 0, //lenght of data
        page_number : 1, //gives current page number
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                people : {
                    ...state.people,
                    ...action.payload
                }
            })
        }
    }
    return state
}