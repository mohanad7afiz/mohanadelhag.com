"use client";

export function ViewsChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="admin-chart">
      <h3 className="admin-chart__title">Daily views</h3>
      <div className="admin-chart__bars">
        {data.map((d) => (
          <div key={d.date} className="admin-chart__bar-wrapper">
            <div
              className="admin-chart__bar"
              style={{ height: `${(d.count / max) * 100}%` }}
              title={`${d.date}: ${d.count} views`}
            />
            {data.length <= 14 && (
              <span className="admin-chart__label">
                {d.date.slice(5)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
