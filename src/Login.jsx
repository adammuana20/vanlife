import React from "react";

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({
        email: "",
        password: ""
    })

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleChange(e) {
        const { name, value } = e.target

        setLoginFormData(prevUser => ({
            ...prevUser,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input 
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={loginFormData.email}
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={loginFormData.password}
                />
                <button>Log in</button>
            </form>
        </div>
    )
}