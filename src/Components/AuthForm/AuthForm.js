import classes from './AuthForm.module.css'
import {useState ,useRef} from 'react'
import { NavLink } from 'react-router-dom'

const AuthForm= ()=>{
    const emailInputRef=useRef()
    const passwordInputRef= useRef()
    const [logIn, setLogIn]=useState(true);
    const [isLoading, setIsLoading]= useState(false)

    
  const switchAuthModeHandler=(e)=>{
    e.preventDefault();
    setLogIn((prevState)=>!prevState)
  }
  const submitHandler=(event)=>{
    event.preventDefault();

    const enteredEmail= emailInputRef.current.value;
    const enteredPassword= passwordInputRef.current.value;

    //optionmal:Add validtion
    setIsLoading(true);
    if(logIn){

    }else{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsqsl9_BqUHVhNOlO2CjXNG4iSvgRYYDk',
        {
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnsecureToken:true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            setIsLoading(false);
            if(res.ok){

            }else{
                 return res.json().then(data=>{
                    let errorMessage = "Authentication Failed!";
                    if (data && data.error.message && data.error.message) {
                      errorMessage = data.error.message;
                    }
                    alert(errorMessage);
                    
                })
            }
        })
    
    }


}


    return(
        <div className={classes.maindiv}>
            <h1 className={classes.heading}>{logIn?'LogIn':'SignUp'}</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="email" className={classes.label}>Email</label><br/>
                <input type="email" id='email' className={classes.input} required  ref={emailInputRef} />
                <label htmlFor="password" className={classes.label}>Password</label><br/>
                <input type="password" id='password' className={classes.input} required  ref={passwordInputRef}/>
        

                { !isLoading && <button className={classes.button}>{logIn?'LogIn':'Create Account'}</button>}
                { isLoading && <p className={classes.button}>Sending requests...</p>}
                <p className={classes.p} onClick={switchAuthModeHandler}>
                    {logIn?"Create new account":'Login with existing account'}</p>
            </form>
        </div>
    )

}

export default AuthForm;