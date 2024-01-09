export const ProfileDetails = ({ myProfile, setEditing }) => {
	return (
		<div className="profile-container">
			<section className="profile-card">
				<div className="first-name font-semibold text-xl my-2">
					Name: {myProfile.first_name}
					<span className="last-name"> {myProfile.last_name}</span>
				</div>
				<div className="email font-semibold text-xl my-2">
					<span className="email-indicator">Email: </span>
					{myProfile.email}
				</div>
				<div className="username font-semibold text-xl my-2">
					<span className="username-indicator">Username: </span>
					{myProfile.username}
				</div>
				<div className="user-type font-semibold text-xl my-2">
					{myProfile.is_staff ? (
						<div className="admin">Admin</div>
					) : (
						<div className="concert-goer">Concert Goer</div>
					)}
				</div>
			</section>
			<button
				className="edit-profile-button edit-venue-button bg-slate-300
				hover:cursor-pointer hover:bg-slate-400 
				duration-300 py-2 px-4 font-medium rounded-lg 
				border-2 border-slate-600 my-2"
				onClick={() => {
					setEditing(true)
				}}>
				Edit Profile
			</button>
		</div>
	)
}
