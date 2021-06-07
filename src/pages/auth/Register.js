import React, { useState ,useEffect} from "react";
import {auth} from '../../firebase';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {useSelector} from "react-redux";

const Register = ({history}) => {

    const [email, setEmail] = useState("");
    
  //redirect logged in user from this page
  //user as dependency as may take a few seconds for us to get user
  const {user} =useSelector((state)=>({...state}));
  useEffect(()=>{
    if (user && user.token) history.push('/')
  },[user,history])

    const handleSubmit = async (e) => {
      e.preventDefault()

      
      //handle EMAIL ACTION
      const config={
          url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
          handleCodeInApp:true
      }
      await auth.sendSignInLinkToEmail(email,config);
      toast.success(`Email is sent to ${email}. Please confirm your registration via the link in the email!`)
      //alert(`Email is sent to ${email}. Please confirm your registration via the link in the email!`);


    //save user email in local storage
    window.localStorage.setItem('emailForRegistration',email)

    //clear state
    setEmail("");
  
    };



    const registerForm=()=>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
    <input
      type="email"
      className="form-control"
      value={email}
      placeholder="Your Email"
      onChange={(e) => setEmail(e.target.value)}
      autoFocus
    />
    <br></br>

    <button type="submit" className="btn btn-raised">
      Register
    </button>
    </div>
  </form>



  return (
    <div className="container p-5">
      <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Register</h4>
                <ToastContainer />
                {registerForm()}

                
            </div>   
      </div>
    </div>
  );
};

export default Register;
