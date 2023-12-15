import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"

export const Register = ({ setToken }) => {
	const firstName = useRef()
	const lastName = useRef()
	const email = useRef()
	const username = useRef()
	const password = useRef()
	const verifyPassword = useRef()
	const passwordDialog = useRef()
	const navigate = useNavigate()

	const handleRegister = (e) => {
		e.preventDefault()

		if (password.current.value === verifyPassword.current.value) {
			const newUser = {
				username: username.current.value,
				first_name: firstName.current.value,
				last_name: lastName.current.value,
				email: email.current.value,
				password: password.current.value,
			}

			registerUser(newUser).then((res) => {
				if ("valid" in res && res.valid) {
					setToken(res.token)
					navigate("/")
				}
			})
		} else {
			passwordDialog.current.showModal()
		}
	}

	return (
		<section className="fixed flex content-around justify-center text-center h-screen w-screen bg-cover">
			<form
				className="grid fixed bg-green-100 bg-opacity-70 w-3/4 h-1/2 top-1/4 content-around rounded-xl border-black border-4 shadow-lg"
				onSubmit={handleRegister}>
				<h1 className="text-5xl my-2 -mb-2 p-1">Venue</h1>
				<p className="text-4xl my-3">Create an account</p>

				<label className="label">First Name</label>
				<fieldset className="-m-1">
					<input className="input" type="text" ref={firstName} />
				</fieldset>

				<label className="label">Last Name</label>
				<fieldset className="-m-1">
					<input className="input" type="text" ref={lastName} />
				</fieldset>

				<label className="label">Username</label>
				<fieldset className="-m-1">
					<input className="input" type="text" ref={username} />
				</fieldset>

				<label className="label">Email</label>
				<fieldset className="-m-1">
					<input className="input" type="email" ref={email} />
				</fieldset>

				<label className="label">Password</label>
				<div className="field-body">
					<fieldset className="-m-1">
						<p className="control is-expanded">
							<input
								className="input"
								type="password"
								placeholder="Password"
								ref={password}
							/>
						</p>
					</fieldset>
					<fieldset>
						<p className="control is-expanded">
							<input
								className="input"
								type="password"
								placeholder="Verify Password"
								ref={verifyPassword}
							/>
						</p>
					</fieldset>
				</div>

				<div className="control">
					<button
						className="outline-1 bg-green-600 transition-color hover:bg-green-400 duration-200 delay-50"
						type="submit">
						Submit
					</button>
				</div>
				<div className="control">
					<Link
						to="/login"
						className="outline-1 bg-green-600 transition-color hover:bg-green-400 duration-200 delay-50">
						Cancel
					</Link>
				</div>
			</form>
		</section>
	)
}
