import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth,EmailAuthProvider } from "../../firebase";
//import { toast } from "react-toastify";
import firebase from "firebase";
const Password = () => {
  const [password, setPassword] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    var valid=true;
    // console.log(password);
    var user = auth.currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      currentpassword
    );
   
    await user.reauthenticateWithCredential(credential).catch(err=>{
      valid=false;
      setLoading(false);
      setPassword("");
      setCurrentPassword("");

      return alert(err);
    });
    if( valid){
      
      
      await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        alert("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        alert('Password not updated')
      })
    .catch((err)=> alert(err.message));
 

    }
   
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Change your Password</label>
        <br></br>
        <input
          type="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="form-control"
          placeholder="Enter your current password"
          style={{ width: '30%' }}
          disabled={loading}
          value={currentpassword}
        />

        <hr></hr>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          style={{ width: '30%' }}
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
              <h4>Password Update</h4>
            )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
