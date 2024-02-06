import React from "react";
import './login.css'

// let x = document.getElementById("log-in")
// let y = document.getElementById("sign-up")
// let z = document.getElementById("btn")

// function signUp() {
//     x.style.left = "-400px";
//     y.style.left = "50px";
//     z.style.left = "110px";
// }

// function log() {
//     x.style.left = "50px";
//     y.style.left = "450px";
//     z.style.left = "0px";
// }

export default function Login() {
    return (
        <div className="hero">
            <div className="form-box">
                <div className="button-box">
                    <div id="btn"></div>
                    <button type="button" className="toggle-btn" onClick={log}>Log In</button>
                    <button type="button" className="toggle-btn" onClick={signUp}>Sign Up</button>
                </div>
            </div>
            <div className="social"> 

            </div>
            <form action="" id="log-in" className="input-group">
                <input 
                className="input-field"
                type="email"
                placeholder="example@email.com"
                name="email"
                // value={}
                required
                />

                <input 
                className="input-field"
                type="password"
                placeholder="Enter Your Password"
                name="password"
                // value={}
                required
                />
                <button type="submit" className="submit-btn">Log In</button>
            </form>

            <form action="" id="sign-up" className="input-group">
                <input 
                className="input-field"
                type="email"
                placeholder="example@email.com"
                name="email"
                // value={}
                required
                />

                <input 
                className="input-field"
                type="password"
                placeholder="Enter Your Password"
                name="password"
                // value={}
                required
                />

                <input 
                className="input-field"
                type="password"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                // value={}
                required
                />
                <button type="submit" className="submit-btn">Sign Up</button>
            </form>
        </div>
    )
}