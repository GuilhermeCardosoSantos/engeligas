"use client";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export default function ProductionChartCard({
  title,
  description,
  icon,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}