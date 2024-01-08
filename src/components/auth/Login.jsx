import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"

export const Login = ({ setUser }) => {
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

		loginUser(user).then((data) => {
			if ("token" in data && data.valid) {
				setUser(data)
				navigate("/")
			} else {
				Dialog.current.showModal()
			}
		})
	}

	return (
		<main className="bg-gray-100 min-h-screen flex items-center justify-center">
			<dialog className="dialog dialog--auth" ref={Dialog}>
				<div>Username or Password is not valid</div>
				<button className="close" onClick={() => Dialog.current.close()}>
					Close
				</button>
			</dialog>

			<section className="bg-white p-8 py-10 rounded-lg shadow-lg w-1/2">
				<h1 className="text-center text-5xl m-3 pb-3">Venue</h1>
				<form
					className="mx-auto text-center content-center justify-center bg-slate-400
				bg-opacity-70 py-3 rounded-xl border-black border-4 shadow-lg"
					onSubmit={handleLogin}>
					<h2 className="text-4xl my-3">Login</h2>
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
								className="px-1 py-0.5 my-1 bg-green-500 border-black border-2 rounded-lg transition-color hover:bg-green-400 duration-200 delay-75"
								type="submit">
								Submit
							</button>
						</div>
						<div className="text-center">
							<Link
								className="text-black hover:text-green-700 visited:text-black transition-color duration-150 delay-75"
								to="/register">
								Not a Concert Goer Yet?
							</Link>
						</div>
					</div>
				</form>
			</section>
		</main>
	)
}
