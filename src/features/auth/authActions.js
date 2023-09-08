import axios from "axios";
import setAuthorizationToken from "../../utils/setAuthorizationToken";

const login = (email, password) => {
    return async (dispatch) => {
        return await axios.post("http://localhost:3001/api/v1/user/login", {
            email,
            password
        }).then((res) => {
            const token = res.data.body.token;

            localStorage.setItem("jwtToken", res.data.body.token);
            
            // set axios header
            setAuthorizationToken(token);
            
            dispatch({
                type: "auth/setCredentials",
                payload: token
            });
        });
    }
}

const getUser = () => {
    return async (dispatch) => { 
        return await axios.post("http://localhost:3001/api/v1/user/profile")
        .then((res) => {
            localStorage.setItem("userConnected", true);

            dispatch({
                type: "auth/setUser",
                payload: { ...res.data.body, isLogged: true }
            });
        });
    }
}

const updateUser = (firstName, lastName) => {
    return async (dispatch) => { 
        return await axios.put("http://localhost:3001/api/v1/user/profile", {
            firstName,
            lastName
        }).then((res) => {
            dispatch({
                type: "auth/setUser",
                payload: { ...res.data.body, isLogged: true, firstName, lastName }
            });
        });
    }
}

const logoutUser = () => {
    return async (dispatch) => { 
        localStorage.removeItem("userConnected");

        dispatch({
            type: "auth/logOut"
        });
    }
}

export {
    login,
    updateUser,
    getUser,
    logoutUser
}