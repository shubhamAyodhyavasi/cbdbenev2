import Moment from 'moment'
import * as MomentRange from 'moment-range'
const moment = MomentRange.extendMoment(Moment);
export const getValidValue = value => (value && value.trim() !== "" && value.trim() !== "not found") ? value : ""

export const getName = doctor => {
  const {
    basic
  } = doctor
  if (!basic)
    return "No Name"

  const {
    name_prefix,
    name,
    credential
  } = basic
  const nameVal = getValidValue(name)
  const name_prefixVal = getValidValue(name_prefix)
  const credentialVal = getValidValue(credential)

  const wholeName = `${name_prefixVal} ${nameVal}  ${credentialVal}`

  if (wholeName.trim() === "")
    return "No Name"

  return wholeName
}

export const getSlug = doctor => {
  return doctor._id
  // const {
  //   basic
  // } = doctor
  // if (!basic)
  //   return "no-slug"

  // const {
  //   name_prefix,
  //   name,
  //   credential
  // } = basic
  // var nameVal = getValidValue(name);
  // nameVal = nameVal.replace(" ", "-");
  // const wholeName = `${nameVal}`
  
  // if (wholeName.trim() === "")
  //   return "No Name"

  // return wholeName
}



export const getAddress = doctor => {
  const {
    address
  } = doctor
  if (!address)
    return ""
  if (address.length < 1)
    return ""

  const {
    address_1,
    address_2,
    city,
    country_name,
    postal_code,
    telephone_number
  } = address[0]
  const address_1Val = getValidValue(address_1)
  const address_2Val = getValidValue(address_2)
  const cityVal = getValidValue(city)
  const country_nameVal = getValidValue(country_name)
  const postal_codeVal = getValidValue(postal_code)
  const telephone_numberVal = getValidValue(telephone_number)
  const wholeAddress = [
    address_1Val,
    address_2Val,
    cityVal,
    country_nameVal,
    postal_codeVal,
    telephone_numberVal,
  ].filter(el => (el && el.trim() !== "")).join(", ")

  return wholeAddress
}

export const getTaxonomy = doctor => {
  const {
    taxonomies
  } = doctor
  if (!taxonomies )
    return ""
  if(taxonomies.length < 1)
    return ""
  const {
    desc
  } = taxonomies[0]
  return getValidValue(desc)
}


export const removeDublecatVale = (originalArray,key) =>{
  var newArray = [];
     var lookupObject  = {};
     for(var i in originalArray) {
        lookupObject[originalArray[i][key]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
}

export const getAppointmentsOfDate = (appointments = [], date)=> 
  appointments.filter(el => moment(el.bookedFor).isSame(date, "day"))

export const getDoctorTimeLine = ({
  timeSlot,
  allAppointments,
  date
}) => {
  const appointment = getAppointmentsOfDate(allAppointments, date)
  if(appointment.length < 1){
    return {
      status: false
    }
  }
  const moments = appointment.map(el => moment(el.bookedFor))
  const max = moment.max(moments).format("HH")
  const min = moment.min(moments).format("HH")
  const day_start = moment().startOf('day').hours(parseInt(min))
  const day_end = moment().startOf('day').hours(parseInt(max))
  const day = moment.range(day_start, day_end)
  // console.clear()
  // console.log({
  //   day: Array.from(day.by('minutes', {step: timeSlot})).map(el => el.format("HH:mm"))
  // })
  return {
    status: true,
    dates: Array.from(day.by('minutes', {step: timeSlot}))
  }
}