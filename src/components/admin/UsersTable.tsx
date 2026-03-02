"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck } from "react-icons/fi";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  createdAt: string;
}

const ROLES = ["ADMIN", "EDITOR", "VIEWER"] as const;

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const { data: session } = useSession();
  const currentUserId = (session?.user as { id?: string })?.id;

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<string>("VIEWER");

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState<string>("VIEWER");

  const resetAddForm = () => {
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("VIEWER");
    setShowAddForm(false);
    setError("");
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail, password: newPassword, role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers([...users, data]);
      resetAddForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditPassword("");
    setError("");
  };

  const handleEdit = async (id: string) => {
    setError("");
    setLoading(true);

    try {
      const body: Record<string, string> = { name: editName, email: editEmail, role: editRole };
      if (editPassword) body.password = editPassword;

      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(users.map((u) => (u.id === id ? data : u)));
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) return;
    setError("");

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-navy-500 hover:bg-navy-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Created</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {showAddForm && (
              <tr className="bg-blue-50/50">
                <td className="px-6 py-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Full name"
                    className="input-field text-sm"
                    required
                  />
                </td>
                <td className="px-6 py-3">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Email address"
                    className="input-field text-sm"
                    required
                  />
                </td>
                <td className="px-6 py-3">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="input-field text-sm"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-3">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Password"
                    className="input-field text-sm"
                    required
                  />
                </td>
                <td className="px-6 py-3 text-right space-x-2">
                  <button
                    onClick={handleAdd}
                    disabled={loading || !newName || !newEmail || !newPassword}
                    className="text-green-600 hover:text-green-700 disabled:opacity-50"
                    title="Save"
                  >
                    <FiCheck className="w-5 h-5 inline" />
                  </button>
                  <button onClick={resetAddForm} className="text-gray-400 hover:text-gray-600" title="Cancel">
                    <FiX className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            )}

            {users.map((user) =>
              editingId === user.id ? (
                <tr key={user.id} className="bg-yellow-50/50">
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="input-field text-sm"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="input-field text-sm"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="input-field text-sm"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="password"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      placeholder="New password (optional)"
                      className="input-field text-sm"
                    />
                  </td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      disabled={loading}
                      className="text-green-600 hover:text-green-700 disabled:opacity-50"
                      title="Save"
                    >
                      <FiCheck className="w-5 h-5 inline" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600" title="Cancel">
                      <FiX className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-secondary-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-secondary-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "ADMIN"
                          ? "bg-red-100 text-red-700"
                          : user.role === "EDITOR"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => startEdit(user)}
                      className="text-secondary-400 hover:text-navy-500 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4 inline" />
                    </button>
                    {currentUserId !== user.id && (
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="text-secondary-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-secondary-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
