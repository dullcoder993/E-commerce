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
      <h1 className="text-4xl font-semibold text-orange-400 text-center"> Profile</h1>
    <br/>
      <div className="min-h-screen bg-slate-800 flex justify-center pt-20">
  <div className="w-full max-w-lg bg-slate-900/70 rounded-xl p-8 text-white">

    

    <div className="space-y-4 text-lg">
      <div>
        <span className="text-slate-400">ID</span>
        <p className="font-medium break-all">{user._id}</p>
      </div>

      <div>
        <span className="text-slate-400">Name</span>
        <p className="font-medium">{user.name}</p>
      </div>

      <div>
        <span className="text-slate-400">Email</span>
        <p className="font-medium">{user.email}</p>
      </div>

      <div>
        <span className="text-slate-400">Mobile</span>
        <p className="font-medium">{user.mobile}</p>
      </div>

      <div>
        <span className="text-slate-400">Role</span>
        <p className="font-medium">{user.role}</p>
      </div>

      <div>
        <span className="text-slate-400">Username</span>
        <p className="font-medium">{user.username}</p>
      </div>

      <div>
        <h3 className="text-slate-400"> Address</h3>
        <p className="font-medium">  {user.address}</p>
      </div>
    </div>

  </div>
</div>

    </div>
    </Layout>
  );
};

export default Profile;
