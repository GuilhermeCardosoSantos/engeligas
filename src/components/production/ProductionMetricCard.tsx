"use client";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  tone?:
    | "default"
    | "green"
    | "yellow"
    | "red"
    | "orange"
    | "blue";
};

export default function ProductionMetricCard({
  title,
  value,
  subtitle,
  icon,
  tone = "default",
}: Props) {
  const tones = {
    default:
      "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-300",
    green:
      "bg-green-500/10 text-green-500",
    yellow:
      "bg-yellow-500/10 text-yellow-500",
    red:
      "bg-red-500/10 text-red-500",
    orange:
      "bg-orange-500/10 text-orange-500",
    blue:
      "bg-blue-500/10 text-blue-500",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h3 className="mt-3 text-2xl font-bold text-gray-800 dark:text-white/90">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tones[tone]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}