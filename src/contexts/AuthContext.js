import { useReducer, createContext, useEffect } from "react"
import { AuthReducer } from "../Reducers/AuthReducer"
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./Contants"
import setAuthtoken from "../util/setAuthToken"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //Authenticate User
    const loadUser = async () => {
        const token = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        if(token) {
            setAuthtoken(token)
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if(response.data.success) {
                dispatch({type: 'SET_AUTH', payload: {isAuthenticated: true, user: response.data.user}})
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthtoken(null)
            dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, user: null}})
        }
    }

    useEffect(() => loadUser(), [])

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token)
            }
            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return ({success: false, message: error.message})
        }
    }



    //Register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token)
            }
            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return ({success: false, message: error.message})
        }
    }

    //Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, user: null}})
    }

    //data
    const AuthContextData = {authState, loginUser, registerUser, logoutUser}


    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider