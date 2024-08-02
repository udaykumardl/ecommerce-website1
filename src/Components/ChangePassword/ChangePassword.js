import AuthContext from '../../Store/auth-context';
import classes from './ChangePassword.module.css'
import React ,{useRef ,useContext} from 'react';
import { useNavigate } from 'react-router';

const ChangePassword=()=>{
    const navigate=useNavigate();
    const newPasswordInputRef =useRef()
    const authCtx=useContext(AuthContext);

    const submitHandler=event=>{
        event.preventDefault();
        
        const enteredNewPassword=newPasswordInputRef.current.value;
        //add validation

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCyzE7q_jL2tqmuLQQXUYBsDY2OgHdHd0E',{
            method:'POST',
            body:JSON.stringify({
                idToken:authCtx.token,
                password:enteredNewPassword,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => {
            if (res.ok) {
                // Navigate to the homepage or another page
                navigate('/');
                alert('Password Changed Successfully');
            } else {
                throw new Error('Failed to change password');
            }
              // Password changed successfully
              // You might want to redirect or show a success message here
            })
            .catch(error => {
              console.error('Error changing password:', error);
              // Handle error, show error message, etc.
            });
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <h1 className={classes.heading}>Change Password</h1>
            <label className={classes.label} htmlFor='password'>Enter New Password</label><br/>
            <input className={classes.input} type="password" minLength='7' id='password' ref={newPasswordInputRef} /><br/>
            <button type='submit'>Change Password</button><br/>
        </form>
      )
    }

export default ChangePassword;