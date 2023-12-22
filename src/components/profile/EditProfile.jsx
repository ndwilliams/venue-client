export const EditProfile = ({
	userId,
	token,
	myProfile,
	Editing,
	setEditing,
}) => {
	const handleChange = (event) => {
		const { name, value } = event.target
		setEditedUser({ ...editedUser, [name]: value })
	}

	const handleSaveChanges = (event) => {
		event.preventDefault()

		const updatedUser = {
			id: myProfile.id,
		}
	}

	return (
		<form className="edit-profile-form">
			<fieldset className="fieldset">
				<label>First Name:</label>
				<input
					name="myProfile.first_name"
					value={myProfile.first_name}
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
					name="myProfile.last_name"
					value={myProfile.last_name}
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
		</form>
	)
}
