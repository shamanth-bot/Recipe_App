import React from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'

class AuthenticationService{

setUpAxiosInterceptors(token,isUserLoggedIn){
    axios.interceptors.request.use(

        (config)=>{
            if (isUserLoggedIn) {
                config.headers.authorization = token
            }
            return config

        }
    )
}

createJWTToken(token) {
    return 'Bearer ' + token
}

registerSuccessfulLoginForJwt(token,isLoggedIn) {
    this.setupAxiosInterceptors(this.createJWTToken(token),isLoggedIn)
}

executeJwtAuthenticationService(username, password) {
    return axios.post(`${API_URL}/authenticate`, {
        username,
        password
    })
}


}

export default new AuthenticationService();
