import "../styles/profile.css";

export default function Profile() {
  return (
    <>
      <div className="profile-container">
        <h1 className="profile-title">👤 User Profile</h1>

        <div className="profile-card">
          <div className="profile-field">
            <label>Name</label>
            <input type="text" value="John Doe" readOnly />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input type="email" value="john@example.com" readOnly />
          </div>

          <div className="profile-field">
            <label>Account Created</label>
            <input type="text" value="Jan 12, 2025" readOnly />
          </div>

          {/* <button className="edit-btn">Edit Profile</button> */}
        </div>
      </div>
    </>
  );
}
