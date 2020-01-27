// 
import moment from 'moment'
const getDatesFromArray = (array = [], date) => {
    if(date){
        const filtered = array.filter(el => {
            const elDate = moment(el.bookedFor)
            if(elDate.isSame(moment(date), "day")){
                if(elDate.isSame(moment(), "day")){
                    return elDate.valueOf() > moment().valueOf()  ? true : false
                }
                return true
            }
            return false
        })
        return filtered.map(el => {
            const {
                available, booked, bookedFor
            } = el
            if(available && !booked)
            return {
                ...el,
                date: moment(bookedFor).format("hh:mm a")
            }

            return null
        })
    }
    return []
}

export default getDatesFromArray