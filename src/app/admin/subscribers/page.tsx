"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/subscribers")
      .then((res) => (res.ok ? res.json() : { subscribers: [] }))
      .then((data) => {
        if (!cancelled) {
          setSubscribers(data.subscribers || []);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return;

    setDeleting(id);
    const res = await fetch(`/api/admin/subscribers?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    }
    setDeleting(null);
  };

  const handleExport = async () => {
    const emails = subscribers.map((s) => s.email).join("\n");
    await navigator.clipboard.writeText(emails);
    alert(`${subscribers.length} emails copied to clipboard`);
  };

  if (loading) {
    return <div className="admin-loading">Loading subscribers...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Subscribers</h1>
        {subscribers.length > 0 && (
          <button onClick={handleExport} className="admin-btn">
            Export emails
          </button>
        )}
      </div>

      <p className="admin-page__subtitle">
        {subscribers.length} total subscriber{subscribers.length !== 1 && "s"}
      </p>

      {subscribers.length === 0 ? (
        <p className="admin-empty">No subscribers yet</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Subscribed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id}>
                  <td>{s.email}</td>
                  <td className="admin-table__date">
                    {new Date(s.subscribed_at).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(s.id)}
                      disabled={deleting === s.id}
                      className="admin-btn admin-btn--danger"
                    >
                      {deleting === s.id ? "Removing..." : "Remove"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
