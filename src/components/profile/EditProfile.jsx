import { useState } from "react"
import { editUser } from "../../managers/ProfileManager"

export const EditProfile = ({ token, myProfile, userId, setEditing }) => {
	const [editedUser, setEditedUser] = useState(myProfile)

	const handleChange = (event) => {
		const { name, value } = event.target
		setEditedUser({ ...editedUser, [name]: value })
	}

	const handleSaveChanges = (event) => {
		event.preventDefault()

		const updatedUser = {
			first_name: editedUser.first_name,
			last_name: editedUser.last_name,
			username: editedUser.username,
			email: editedUser.email,
			is_staff: editedUser.is_staff,
			is_superuser: editedUser.is_superuser,
		}
		editUser(updatedUser, token, userId).then(setEditing(false))
	}

	return (
		<form className="edit-profile-form">
			<fieldset className="fieldset">
				<label>First Name:</label>
				<input
					name="first_name"
					value={editedUser.first_name}
					type="text"
					className="first-name-input placeholder:italic
                    placeholder:text-slate-400 block bg-white 
                    w-full border border-slate-300 rounded-md 
                    py-2 pl-9 pr-3 shadow-sm focus:outline-none 
                    focus:border-sky-500 focus:ring-sky-500 
                    focus:ring-1 sm:text-sm my-5"
					onChange={handleChange}
				/>
			</fieldset>
			<fieldset className="fieldset">
				<label>Last Name:</label>
				<input
					name="last_name"
					value={editedUser.last_name}
					type="text"
					className="last-name-input placeholder:italic
                    placeholder:text-slate-400 block bg-white 
                    w-full border border-slate-300 rounded-md 
                    py-2 pl-9 pr-3 shadow-sm focus:outline-none 
                    focus:border-sky-500 focus:ring-sky-500 
                    focus:ring-1 sm:text-sm my-5"
					onChange={handleChange}
				/>
			</fieldset>
			<fieldset className="fieldset">
				<label>Username: </label>
				<input
					name="username"
					value={editedUser.username}
					type="text"
					className="username-input placeholder:italic
                    placeholder:text-slate-400 block bg-white 
                    w-full border border-slate-300 rounded-md 
                    py-2 pl-9 pr-3 shadow-sm focus:outline-none 
                    focus:border-sky-500 focus:ring-sky-500 
                    focus:ring-1 sm:text-sm my-5"
					onChange={handleChange}
				/>
			</fieldset>
			<fieldset className="fieldset">
				<label>Email: </label>
				<input
					name="email"
					value={editedUser.email}
					type="text"
					className="email-input placeholder:italic
                    placeholder:text-slate-400 block bg-white 
                    w-full border border-slate-300 rounded-md 
                    py-2 pl-9 pr-3 shadow-sm focus:outline-none 
                    focus:border-sky-500 focus:ring-sky-500 
                    focus:ring-1 sm:text-sm my-5"
					onChange={handleChange}
				/>
			</fieldset>
			<div>
				<button className="save-button" onClick={handleSaveChanges}>
					Save Changes
				</button>
			</div>
		</form>
	)
}
