import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"

export const Login = ({ setToken, setCurrentUserId, setAdminStatus }) => {
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
				setAdminStatus(res.is_staff)
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

			<section className="text-center justify-center">
				<h1 className="text-5xl m-3 pb-3">Venue</h1>
				<form
					className="mx-auto w-2/3 text-center content-center justify-center bg-green-100
				bg-opacity-70 py-3 rounded-xl border-black border-4 shadow-lg"
					onSubmit={handleLogin}>
					<h2 className="text-4xl my-3">Please sign in</h2>
					<fieldset className="m-1">
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
								className="px-1 py-0.5 my-1 bg-green-600 border-black border-2 rounded-lg transition-color hover:bg-green-400 duration-200 delay-50"
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
		</main>
	)
}
