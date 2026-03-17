export function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string | number;
  trend?: string;
}) {
  return (
    <div className="admin-stat-card">
      <p className="admin-stat-card__label">{label}</p>
      <p className="admin-stat-card__value">{value}</p>
      {trend && <p className="admin-stat-card__trend">{trend}</p>}
    </div>
  );
}
