import "./Login.css"

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
                    <input type="email" id="email" name="email" autoComplete="email" required />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" autoComplete="current-password" required />
                </div>
                <button type="submit">Log in</button>
            </form>
        </section>
    </div>
    </>
    )

}