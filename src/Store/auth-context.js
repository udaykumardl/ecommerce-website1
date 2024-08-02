import React,{useState ,useEffect} from 'react'

const AuthContext= React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token)=>{},
    logout:()=>{}
})

export const AuthContextProvider =(props)=>{
    const initialToken=localStorage.getItem("token")
    const [token, setToken]=useState(initialToken);
    const userIsLoggedIn = !!token;

    useEffect(()=>{
        if(token){
            const tokenExpiryTime= 5 * 60 * 1000;
            const logoutTimer=setTimeout(()=>{
                logoutHandler();
                alert('Session expired. Please log in again.');
            },tokenExpiryTime);

            // Clear the timer if the component unmounts or if the token changes
            return () => clearTimeout(logoutTimer);
        }
    },[token])

    const loginHandler =()=>{
        setToken(token);
        localStorage.setItem('token',token);

        // Optionally, you can also save the expiration time in local storage
        const expirationTime = new Date(new Date().getTime() + 5 * 60 * 1000);
        localStorage.setItem('expirationTime', expirationTime.toISOString());
    }

    const logoutHandler= ()=>{
        setToken(null)
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    }

    const contextValue={
      token:token,
      isLoggedIn:userIsLoggedIn,
      login:loginHandler,
      logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>
            {props.children}
           </AuthContext.Provider>
}

export default AuthContext;