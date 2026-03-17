"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/admin/stat-card";
import { ViewsChart } from "@/components/admin/views-chart";

interface Analytics {
  totalViews: number;
  uniqueVisitors: number;
  topPages: { path: string; count: number }[];
  dailyViews: { date: string; count: number }[];
}

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/admin/analytics?period=30d").then((r) =>
        r.ok ? r.json() : null
      ),
      fetch("/api/admin/subscribers").then((r) =>
        r.ok ? r.json() : { subscribers: [] }
      ),
      fetch("/api/admin/posts").then((r) =>
        r.ok ? r.json() : { posts: [] }
      ),
    ]).then(([analyticsData, subscribersData, postsData]) => {
      if (cancelled) return;
      if (analyticsData) setAnalytics(analyticsData);
      setSubscribers(subscribersData.subscribers || []);
      setPostCount(
        (postsData.posts || []).filter(
          (p: { published: boolean }) => p.published
        ).length
      );
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Dashboard</h1>

      <div className="admin-stats-grid">
        <StatCard
          label="Page views (30d)"
          value={analytics?.totalViews ?? 0}
        />
        <StatCard
          label="Unique visitors (30d)"
          value={analytics?.uniqueVisitors ?? 0}
        />
        <StatCard label="Subscribers" value={subscribers.length} />
        <StatCard label="Published posts" value={postCount} />
      </div>

      {analytics && analytics.dailyViews.length > 0 && (
        <ViewsChart data={analytics.dailyViews} />
      )}

      <div className="admin-grid-2">
        <div className="admin-card">
          <h3 className="admin-card__title">Top pages</h3>
          {analytics?.topPages.length ? (
            <ul className="admin-list">
              {analytics.topPages.slice(0, 5).map((p) => (
                <li key={p.path} className="admin-list__item">
                  <span className="admin-list__label">{p.path}</span>
                  <span className="admin-list__value">{p.count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="admin-empty">No data yet</p>
          )}
        </div>

        <div className="admin-card">
          <h3 className="admin-card__title">Recent subscribers</h3>
          {subscribers.length ? (
            <ul className="admin-list">
              {subscribers.slice(0, 5).map((s) => (
                <li key={s.id} className="admin-list__item">
                  <span className="admin-list__label">{s.email}</span>
                  <span className="admin-list__value">
                    {new Date(s.subscribed_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="admin-empty">No subscribers yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
