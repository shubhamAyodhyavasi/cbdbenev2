import {
    SET_CURRENT_APPOINTMENT,
    UNSET_CURRENT_APPOINTMENT
} from './type'

export const setCurrentAppointment = appointment => ({
    type: SET_CURRENT_APPOINTMENT,
    payload: appointment
})
export const unsetCurrentAppointment = () => ({
    type: UNSET_CURRENT_APPOINTMENT,
})