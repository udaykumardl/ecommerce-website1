import React,{useState ,useEffect,useContext} from 'react'

const AuthContext= React.createContext({
    token: "",
    email: "",
    isLoggedIn: false,
    login: (token,email)=>{},
    logout:()=>{}
})

export const AuthContextProvider =(props)=>{
    const initialToken=localStorage.getItem("token")
    const initialEmail=localStorage.getItem("email")
    const [token, setToken]=useState(initialToken);
    const [email, setEmail]=useState(initialEmail);

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

    const loginHandler =(token, email)=>{
        setToken(token);
        setEmail(email);
        
        localStorage.setItem('token',token);
        localStorage.setItem('email',email)

        // Optionally, you can also save the expiration time in local storage
        const expirationTime = new Date(new Date().getTime() + 5 * 60 * 1000);
        localStorage.setItem('expirationTime', expirationTime.toISOString());
    }

    const logoutHandler= ()=>{
        setToken(null)
        setEmail(null)
        localStorage.removeItem('token');
        localStorage.removeItem('email')
        localStorage.removeItem('expirationTime');
    }

    const contextValue={
      token:token,
      email:email,
      isLoggedIn:userIsLoggedIn,
      login:loginHandler,
      logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>
            {props.children}
           </AuthContext.Provider>
}

export default AuthContext;