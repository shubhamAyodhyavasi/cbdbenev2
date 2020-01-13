import { connect } from 'react-redux'
import Router from 'next/router'
import Loader from "../Loader"
import projectSettings from "../../constants/projectSettings"
const onlyAmbassador = (PassedComponent) => ({children, ...props }) => {
    if(!props.isPersist){
        return (
            <>
            <script src={`https://maps.googleapis.com/maps/api/js?key=${projectSettings.googleApiKey}&libraries=places`} async defer></script>
                <Loader />
            </>
        )
    }else if(props.ambassadoruser && props.ambassadoruser._id){
        return <PassedComponent {...props} >
            <script src={`https://maps.googleapis.com/maps/api/js?key=${projectSettings.googleApiKey}&libraries=places`} async defer></script>
            children
            </PassedComponent>
    }
    Router.push("/ambassador-portal/login")
    return <div />
}

export default onlyAmbassador