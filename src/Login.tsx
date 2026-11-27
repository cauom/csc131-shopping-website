import "./Login.css"
import axios from 'axios'

export default function Login() {

    return (
    <>
    <div className="page-main">
        <section className="page-card">
            <h1>Welcome back</h1>
            <p>Log in to your account.</p>
            <form className="login-form" action="#" method="post">
                <div className="form-field">
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" name="email" autoComplete="email" required/>
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" autoComplete="current-password" required />
                </div>
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    
                    const email = (document.getElementById("email") as HTMLInputElement)?.value
                    const password = (document.getElementById("password") as HTMLInputElement)?.value
                    console.log(email)
                    console.log(password)

                    axios.post("https://csc131-shopping-website-production.up.railway.app/login",
                        {email, password}
                    )
                    .then(data => console.log(data))
                    .catch(err => console.error(err))
                }}>Log in</button>
            </form>
        </section>
    </div>
    </>
    )

}