import { useEffect, useState } from "react";
import Layout from "./Layout";
import { api } from "./api";
import { getUserProfile, setUserProfile } from "./auth";

function Profile() {
  const [profile, setProfile] = useState(getUserProfile());
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/users/me");
        setProfile(response.data);
        setUserProfile(response.data);
      } catch {
        setError("Unable to load profile");
      }
    };

    load();
  }, []);

  return (
    <Layout>
      <div style={{ padding: "1rem" }}>
        <h2>User Profile</h2>
        {error && <p>{error}</p>}
        {profile && (
          <ul>
            <li>Name: {profile.name}</li>
            <li>Email: {profile.email}</li>
            <li>Role: {profile.role}</li>
            <li>Organization: {profile.org_name}</li>
          </ul>
        )}
      </div>
    </Layout>
  );
}

export default Profile;
