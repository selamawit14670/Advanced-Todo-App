function ProfilePage() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="container">
      <h1>My Profile</h1>

      <div className="task-card">
        <h2>{user?.name}</h2>

        <p>{user?.email}</p>
      </div>
    </div>
  );
}

export default ProfilePage;