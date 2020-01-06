// pages/_app.js
import React from "react";
import {Provider} from "react-redux";
import App from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {makeStore} from "../redux/store";

import withRedux from "next-redux-wrapper";


/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/

// const store = storeConfig()
class MyApp extends App {

    // static async getInitialProps({Component, ctx}) {

    //     // we can dispatch from here too
    //     ctx.store.dispatch({type: 'FOO', payload: 'foo'});

    //     const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    //     return {pageProps};

    // }
    // componentDidMount(){
    //     console.clear()
    //     console.log({props: this.props})
    // }
    // componentDidUpdate(prevProps){
    //     console.log({prevProps, props: this.props})
    // }
    render() {
        const {Component, pageProps, store} = this.props; 
        return (
                <Provider store={store}>
                    <PersistGate persistor={store.__persistor} loading={<Component isPersist={false} {...pageProps} />} >
                        <Component isPersist={true} {...pageProps} />
                    </PersistGate>
                </Provider>
        );
    }

}

export default withRedux(makeStore, {debug: true})(MyApp);