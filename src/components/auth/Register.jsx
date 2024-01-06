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
	const is_staff_checkbox = useRef()
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
				is_staff: is_staff_checkbox.current.checked,
			}

			registerUser(newUser).then((res) => {
				if (res && res.token) {
					setToken(res.token)
					navigate("/login")
				}
			})
		} else {
			passwordDialog.current.showModal()
		}
	}

	return (
		<main>
			{/* <dialog className="dialog dialog--auth" ref={passwordDialog}>
				<div>Passwords do not match up</div>
				<button
					className="close"
					onClick={() => passwordDialog.current.close()}>
					Close
				</button>
			</dialog> */}

			<section className="text-center justify-center">
				<h1 className="text-5xl m-4 p-4">Venue</h1>

				<form
					className="mx-auto w-2/3 text-center content-center justify-center bg-green-100
				bg-opacity-70 py-3 rounded-xl border-black border-4 shadow-lg"
					onSubmit={handleRegister}>
					<h2 className="text-4xl my-3">Create an account</h2>
					<label className="">First Name</label>
					<fieldset className="m-1">
						<input className="input rounded-md" type="text" ref={firstName} />
					</fieldset>

					<label className="label">Last Name</label>
					<fieldset className="m-1">
						<input className="input rounded-md" type="text" ref={lastName} />
					</fieldset>

					<label className="label">Username</label>
					<fieldset className="m-1">
						<input className="input rounded-md" type="text" ref={username} />
					</fieldset>

					<label className="label">Email</label>
					<fieldset className="m-1">
						<input className="input rounded-md" type="email" ref={email} />
					</fieldset>

					<label className="label">Password</label>
					<div className="field-body">
						<fieldset className="m-1">
							<p className="control is-expanded p-2">
								<input
									className="input rounded-md"
									type="password"
									ref={password}
								/>
							</p>
						</fieldset>
						<label className="label">Verify Password</label>
						<fieldset>
							<p className="control is-expanded p-2">
								<input
									className="input rounded-md"
									type="password"
									ref={verifyPassword}
								/>
							</p>
						</fieldset>
						<label className="label">Are You Staff?</label>
						<fieldset className="m-1">
							<input
								className="rounded-md"
								type="checkbox"
								ref={is_staff_checkbox}
							/>
						</fieldset>
					</div>

					<div className="control">
						<button
							className="outline-1 px-1 py-0.5 my-1 bg-green-600 border-black border-2 rounded-lg transition-color hover:bg-green-400 duration-200 delay-50"
							type="submit">
							Submit
						</button>
					</div>
					<div className="control">
						<Link
							to="/login"
							className="outline-1 px-1 py-0.5 my-1 border-black border-2 rounded-lg bg-green-600 transition-color hover:bg-green-400 duration-200 delay-50">
							Cancel
						</Link>
					</div>
				</form>
			</section>
		</main>
	)
}
