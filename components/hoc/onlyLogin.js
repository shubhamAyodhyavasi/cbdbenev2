import { connect } from 'react-redux'
import Router from 'next/router'
import Loader from "../Loader"
const onlyLogin = (PassedComponent) => ({children, ...props }) => {
    if(!props.isPersist){
        return (
            <>
                <Loader />
                <PassedComponent {...props} >children</PassedComponent>
            </>
        )
    }else if(props.user && props.user._id){
        return <PassedComponent {...props} >children</PassedComponent>
    }
    Router.push("/")
    return <div />
}

export default onlyLogin