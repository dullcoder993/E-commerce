import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "/api/v1/customer/getAllUser",
        { withCredentials: true }
      );
      setUsers(res.data.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `/api/v1/customer/c/delete/${userId}`,
        { withCredentials: true }
      );

      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <p className="text-slate-400">Loading users...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      {users.length === 0 ? (
        <p className="text-slate-400">No users found.</p>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-slate-800 p-4 rounded flex justify-between items-center"
            >
              {/* LEFT */}
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-slate-400">{u.email}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    u.role === "admin"
                      ? "bg-orange-600"
                      : "bg-slate-600"
                  }`}
                >
                  {u.role}
                </span>
              </div>

              {/* RIGHT */}
              {u.role !== "admin" && (
                <button
                  onClick={() => deleteUser(u._id)}
                  className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
