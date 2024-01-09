import { useState } from "react"
import { editUser } from "../../managers/ProfileManager"

export const EditProfile = ({ myProfile, setEditing }) => {
	const [editedUser, setEditedUser] = useState(myProfile)

	const handleChange = (event) => {
		const { name, value } = event.target
		setEditedUser({ ...editedUser, [name]: value })
	}

	const handleSaveChanges = async (event) => {
		event.preventDefault()

		const updatedUser = {
			first_name: editedUser.first_name,
			last_name: editedUser.last_name,
			username: editedUser.username,
			email: editedUser.email,
			is_staff: editedUser.is_staff,
			is_superuser: editedUser.is_superuser,
		}
		await editUser(updatedUser)
		setEditing(false)
	}

	return (
		<form className="edit-profile-form content-center text-center mx-auto">
			<fieldset className="fieldset">
				<label className="my-2 font-semibold text-lg">First Name:</label>
				<input
					name="first_name"
					value={editedUser.first_name}
					type="text"
					className="first-name-input placeholder:italic
                    placeholder:text-slate-400 block bg-slate-200
                    w-1/2 border-black border-2 rounded-lg 
                    py-1 px-2 shadow-sm focus:outline-none 
                    focus:border-sky-500 focus:ring-blue-800 
                    focus:ring-1 m-auto my-2 text-lg text-center"
					onChange={handleChange}
				/>
			</fieldset>
			<fieldset className="fieldset">
				<label className="my-2 font-semibold text-lg">Last Name:</label>
				<input
					name="last_name"
					value={editedUser.last_name}
					type="text"
					className="last-name-input placeholder:italic
                    placeholder:text-slate-400 block bg-slate-200
                    w-1/2 border-black border-2 rounded-lg 
                    py-1 px-2 shadow-sm focus:outline-none 
                    focus:border-sky-500 focus:ring-blue-800 
                    focus:ring-1 m-auto my-2 text-lg text-center"
					onChange={handleChange}
				/>
			</fieldset>
			<fieldset className="fieldset">
				<label className="my-2 font-semibold text-lg">Username: </label>
				<input
					name="username"
					value={editedUser.username}
					type="text"
					className="username-input placeholder:italic
                    placeholder:text-slate-400 block bg-slate-200
                    w-1/2 border-black border-2 rounded-lg 
                    py-1 px-2 shadow-sm focus:outline-none 
                    focus:border-sky-500 focus:ring-blue-800 
                    focus:ring-1 m-auto my-2 text-lg text-center"
					onChange={handleChange}
				/>
			</fieldset>
			<fieldset className="fieldset">
				<label className="my-2 font-semibold text-lg">Email: </label>
				<input
					name="email"
					value={editedUser.email}
					type="text"
					className="placeholder:italic
                    placeholder:text-slate-400 block bg-slate-200
                    w-1/2 border-black border-2 rounded-lg 
                    py-1 px-2 shadow-sm focus:outline-none 
                    focus:border-sky-500 focus:ring-blue-800 
                    focus:ring-1 m-auto my-2 text-lg text-center"
					onChange={handleChange}
				/>
			</fieldset>
			<div>
				<button
					onClick={handleSaveChanges}
					className="save-button bg-amber-600 py-1 px-2 text-lg placeholder:text-center
					placeholder:text-gray-600 rounded-lg hover:cursor-pointer 
					text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50 my-3">
					Save Changes
				</button>
			</div>
		</form>
	)
}
