import { Card, CardHeader, CardBody, Divider } from "@heroui/react"

interface VariationData {
  previousDate: string
  previousValue: number
  currentDate: string
  currentValue: number
  percentageChange: number
}

interface VariationCardsProps {
  dailyData: VariationData
  weeklyData: VariationData
  monthlyData: VariationData
}

export function VariationCards({ dailyData, weeklyData, monthlyData }: VariationCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Daily Variation Card */}
      <Card shadow="sm">
        <CardHeader className="justify-center">
          <h3 className="text-center text-primary font-medium">Variação Diária do Alumínio</h3>
        </CardHeader>
        <Divider />
        <CardBody className="pb-6 pt-4">
          <div className="flex justify-between w-[80%] mx-auto mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Em {dailyData.previousDate}</p>
              <p className="font-medium">{dailyData.previousValue.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Em {dailyData.currentDate}</p>
              <p className="font-medium">{dailyData.currentValue.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <span
              className={`text-lg font-medium ${dailyData.percentageChange > 0 ? "text-success" : "text-danger"
                }`}
            >
              {dailyData.percentageChange > 0 ? "+" : ""} {dailyData.percentageChange.toFixed(2)} %
            </span>
          </div>
        </CardBody>
      </Card>

      {/* Weekly Variation Card */}
      <Card shadow="sm">
        <CardHeader className="justify-center">
          <h3 className="text-center text-primary font-medium">Variação Semanal do Alumínio</h3>
        </CardHeader>
        <Divider />
        <CardBody className="pb-6 pt-4">
          <div className="flex justify-between w-[80%] mx-auto mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">{weeklyData.previousDate}</p>
              <p className="font-medium">{weeklyData.previousValue.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">{weeklyData.currentDate}</p>
              <p className="font-medium">{weeklyData.currentValue.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <span
              className={`text-lg font-medium ${weeklyData.percentageChange > 0 ? "text-success" : "text-danger"
                }`}
            >
              {weeklyData.percentageChange > 0 ? "+" : ""} {weeklyData.percentageChange.toFixed(2)} %
            </span>
          </div>
        </CardBody>
      </Card>

      {/* Monthly Variation Card */}
      <Card shadow="sm">
        <CardHeader className="justify-center">
          <h3 className="text-center text-primary font-medium">Variação Mensal do Alumínio</h3>
        </CardHeader>
        <Divider />
        <CardBody className="pb-6 pt-4">
          <div className="flex justify-between w-[80%] mx-auto mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">{monthlyData.previousDate}</p>
              <p className="font-medium">{monthlyData.previousValue.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">{monthlyData.currentDate}</p>
              <p className="font-medium">{monthlyData.currentValue.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <span
              className={`text-lg font-medium ${monthlyData.percentageChange > 0 ? "text-success" : "text-danger"
                }`}
            >
              {monthlyData.percentageChange > 0 ? "+" : ""} {monthlyData.percentageChange.toFixed(2)} %
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  )
} 