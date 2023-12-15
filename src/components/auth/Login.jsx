import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"

export const Login = ({ setToken, setCurrentUserId }) => {
	const username = useRef()
	const password = useRef()
	const navigate = useNavigate()
	const Dialog = useRef()

	const handleLogin = (e) => {
		e.preventDefault()

		const user = {
			username: username.current.value,
			password: password.current.value,
		}

		loginUser(user).then((res) => {
			if ("valid" in res && res.valid) {
				setToken(res.token)
				setCurrentUserId(res.user_id)
				navigate("/")
			} else {
				Dialog.current.showModal()
			}
		})
	}

	return (
		<main>
			<dialog className="dialog dialog--auth" ref={Dialog}>
				<div>Username or Password is not valid</div>
				<button className="close" onClick={() => Dialog.current.close()}>
					Close
				</button>
			</dialog>

			<div
				className={
					"fixed flex justify-center content-around text-center h-screen w-screen bg-cover"
				}>
				<section
					className={
						"grid fixed w-3/4 h-2/5 top-1/4 content-center bg-green-100 border-black bg-opacity-70 border-4 rounded-2xl shadow-md"
					}>
					<form className="my-3 mx-5" onSubmit={handleLogin}>
						<h1 className="text-5xl m-3 pb-3">Venue</h1>
						<h2 className="text-3xl m-2 p-1">Please sign in</h2>
						<fieldset className="mb-4">
							<div className="form-group">
								<label className="label">Username</label>
								<div className="control">
									<input
										id="inputUsername"
										type="text"
										ref={username}
										className="p-1 rounded-md shadow placeholder:italic border border-slate-400 focus:border-sky-500"
										placeholder="Username"
										required
										autoFocus
									/>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<div className="field">
								<label className="label">Password</label>
								<div className="control">
									<input
										id="inputPassword"
										type="text"
										ref={password}
										className="p-1 rounded-md shadow placeholder:italic border border-slate-400 focus:border-sky-500"
										placeholder="Password"
										required
										autoFocus
									/>
								</div>
							</div>
						</fieldset>
						<div className="">
							<div className="">
								<button
									className="outline-1 bg-green-600 transition-color hover:bg-green-400  duration-200 delay-50"
									type="submit">
									Submit
								</button>
							</div>
							<div className="">
								<Link to="/register" className="">
									Not a Concert Goer Yet?
								</Link>
							</div>
						</div>
					</form>
				</section>
			</div>
		</main>
	)
}
