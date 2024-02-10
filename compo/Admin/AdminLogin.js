import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
function AdminLogin() {
    const navigate=useNavigate();
    const initialValue = {email: '',password: "" }
    const [state, setState] = useState(initialValue);
    const handler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const submitData=async()=>{
        const  {email,password }=state
        if (email && password) {
            let result = await fetch('http://localhost:5000/admin-login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            result = await result.json();
            console.log(result)
            if (result.token) {
                  sessionStorage.setItem("email", result.user.email)
                  sessionStorage.setItem("profile", result.user.img)
                  sessionStorage.setItem("token", result.token)
                navigate("/fetch");
            }
            else {
                alert("your email or password is incorrect");
            }
        }
        else {
            alert("All Fields are Required");
        }
        
    }
  return (
    <>
        <div className='container'>
                <div className='row'>
                    <h1 className='text-center text-uppercase'>Admin Login Page</h1>
                   
                    <form>
                        <input type='email' value={state.email}
                            onChange={handler} name='email' placeholder='Your Email ID' className='form-control my-3' />
                        <input type='password' name='password' value={state.password}
                            onChange={handler} placeholder='Password' className='form-control my-3' />
                       
                        <input type='button' className='btn btn-primary' value={"Login"} onClick={submitData} />
                    </form>             
                    <h2 id='res'> </h2> 
                   
                </div>
            </div>
    </>
  )
}

export default AdminLogin
