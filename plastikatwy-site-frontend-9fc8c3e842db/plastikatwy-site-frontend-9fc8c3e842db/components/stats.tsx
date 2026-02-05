import { twMerge } from "tailwind-merge"

interface StatsProps {
  stats?: {
    title_stats_1: string;
    title_stats_2: string;
    title_stats_3: string;
    title_stats_4: string;
    description_stats_1: string;
    description_stats_2: string;
    description_stats_3: string;
    description_stats_4: string;
  }
}

export default function Stats({ stats: statsData }: StatsProps) {
  // Usar dados da API se disponíveis, senão usar dados estáticos
  const stats = statsData ? [
    {
      icon: "/images/stat-icon-tonnage.svg",
      value: statsData.title_stats_1,
      description: statsData.description_stats_1,
    },
    {
      icon: "/images/stat-icon-space.svg",
      value: statsData.title_stats_2,
      description: statsData.description_stats_2,
    },
    {
      icon: "/images/stat-icon-years.svg",
      value: statsData.title_stats_3,
      description: statsData.description_stats_3,
    },
    {
      icon: "/images/stat-icon-employees.svg",
      value: statsData.title_stats_4,
      description: statsData.description_stats_4,
    },
  ] : []

  return (
    <section className="bg-light-blue">
      <div className="container px-4 py-8 md:py-16 md:px-6">
        <div className="grid grid-cols-1 gap-8 metric-grid md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={twMerge(
                'metric-card flex items-center justify-center flex-col gap-2 text-center',
                index === 0 && "border-b lg:items-start lg:border-b-0 lg:border-r lg:border-gray-300",
              )}
            >
              <div
                className={twMerge(
                  'flex items-center justify-center gap-2',
                  index !== 0 && "flex-col",
                )}
              >
                <img
                  src={stat.icon || "/placeholder.svg"}
                  alt=""
                  className={twMerge(
                    index === 0 ? "w-10 h-10" : "w-6 h-6"
                  )}
                  aria-hidden="true"
                />
                <div
                  className={twMerge(
                    "font-bold text-primary",
                    index === 0 ? "text-3xl lg:text-left" : "text-2xl"
                  )}
                >
                  {stat.value}
                </div>
              </div>
              <p
                className={twMerge(
                  "text-primary max-w-[225px]",
                  index === 0 && "lg:text-left",
                )}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
