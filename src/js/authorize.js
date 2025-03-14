import {auth} from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";


export function Authorize(){

    // Register 
    const registerUser = async(fullname,email,password)=>{
                
        const defaultprofileimg = "https://static.thenounproject.com/png/65476-200.png";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log(user);
            //FirebaseError: Firebase: Error (auth/operation-not-allowed).
            //You can see register users' datas at Authentication > users

            await updateProfile(user, {
                displayName: fullname, 
                photoURL: defaultprofileimg
              }).then(() => {
                window.location.href = "../index.html";
              });
        } catch (error) {
            console.log("Error Registering user : ", error);
        }
    }

    //Signin
    const loginUser = (email,password)=>{

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // console.log(userCredential.user);

            // set name to localstorage
            setLocalName(userCredential.user);

            window.location.href = "../index.html";
        })
        .catch((error) => {
            console.log("Error logging in : ", error.message);
        });

    }

    //Signout
    const logoutUser = ()=>{
        signOut(auth)
        .then(() => {

            // unset name to localstorage
            unsetLocalName();

            window.location.href = "../signin.html";
          }).catch((error) => {
            console.log("Error Logging out = " , error.message);
          });
          
    }

    //Reset Password
    const resetPassword = async (email,msg)=>{
        try {
           await sendPasswordResetEmail(auth, email);

           msg.textContent = "Password reset email send. Please check your inbox";
           msg.style.color = "green";
           msg.style.fontSize = "11px";

        } catch (error) {
            console.log("Error sending password reset email = " , error.message);

            msg.textContent = `Error : ${error.message}`;
            msg.style.color = "red";
            msg.style.fontSize = "11px";
        }
    }

    //Google Signin
    const googleLogin = ()=>{

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {

            // set name to localstorage
            setLocalName(result.user);

            window.location.href = "../index.html";
        
        }).catch((error) => {
            console.log("Error google logging in = " , error.message);
            
        });
    }
    //Auth Check
    const isLoggedIn = (email,msg)=>{

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                return true;
            } else {
                window.location.href = "../signin.html";
            }
        });
    }

    //Get User Info
    const getUser = (callback)=>{
        // callback("hello");
        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                callback(userdata);
            }
        });
    }

     const setLocalName = (userdata)=>{
        localStorage.setItem("username", userdata.displayName);
     };

     const unsetLocalName = ()=>{
        localStorage.removeItem("username");
     };

    return {registerUser, loginUser, logoutUser, resetPassword, googleLogin, isLoggedIn, getUser};
}