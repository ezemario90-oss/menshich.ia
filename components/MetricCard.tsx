"use client";
type Props = {
  title: string;
  value: string | number;
  delta?: string;
  icon?: JSX.Element;
  color?: string;
};

export default function MetricCard({ title, value, delta, icon, color = "bg-brand-500" }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex-1 min-w-[180px]">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{title}</div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color} text-white`}>
          {icon ?? <span>🏷️</span>}
        </div>
      </div>
      <div className="mt-3 text-2xl font-semibold">{value}</div>
      {delta && <div className="text-sm text-green-600">{delta}</div>}
    </div>
  );
}
"use client";
type Props = {
  title: string;
  value: string | number;
  delta?: string;
  icon?: JSX.Element;
  color?: string;
};

export default function MetricCard({ title, value, delta, icon, color = "bg-brand-500" }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex-1 min-w-[180px]">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{title}</div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color} text-white`}>
          {icon ?? <span>🏷️</span>}
        </div>
      </div>
      <div className="mt-3 text-2xl font-semibold">{value}</div>
      {delta && <div className="text-sm text-green-600">{delta}</div>}
    </div>
  );
}
