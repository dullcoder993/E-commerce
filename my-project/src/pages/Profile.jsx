import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout.jsx";
import { data } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/customer/me",
          { withCredentials: true }
        );
        console.log(res.data)
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || !user) return null;

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    
    <Layout>
    <div className="p-6">
      <br/>
      <h1 className="text-4xl font-semibold text-amber-100 text-center"> Profile</h1>
    <br/>
      <div className=" space-y-2 text-orange-700 ">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2"> Id : {user._id}</h1>
          <br/>
          <h1 className="text-3xl font-bold text-white mb-2">Name : {user.name}</h1>
          <br/>
          <h1 className="text-3xl font-bold text-white mb-2">E-mail : {user.email}</h1>
          <br/>
          <h1 className="text-3xl font-bold text-white mb-2">Mobile : {user.mobile}</h1>
          <br/>
          <h1 className="text-3xl font-bold text-white mb-2">Role : {user.role}</h1>
          <br/>
          <h1 className="text-3xl font-bold text-white mb-2">Address : {user.address}</h1>
          <br/>
          <h1 className="text-3xl font-bold text-white mb-2">Username : {user.username}</h1>
          <br/>
      
      
    </div>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;
