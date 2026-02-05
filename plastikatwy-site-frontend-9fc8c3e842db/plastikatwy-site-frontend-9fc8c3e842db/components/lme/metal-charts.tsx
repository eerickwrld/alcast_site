import { Card, CardHeader, CardBody } from "@heroui/react"
import { Line } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import { monthlyChartOptions } from './chart-config'
import { useEffect } from 'react'

interface MetalChartsProps {
  dailyChartData: ChartData<'line'>
  weeklyChartData: ChartData<'line'>
  monthlyChartData: ChartData<'line'>
  chartOptions: ChartOptions<'line'>
}

export function MetalCharts({
  dailyChartData,
  weeklyChartData,
  monthlyChartData,
  chartOptions
}: MetalChartsProps) {

  // Debug log para verificar se os dados estão corretos
  useEffect(() => {
    console.log("MetalCharts - Dados do gráfico mensal:", monthlyChartData);
    console.log("MetalCharts - Opções do gráfico mensal:", monthlyChartOptions);
  }, [monthlyChartData]);

  return (
    <div className="space-y-8">
      {/* Daily Chart */}
      <Card shadow="sm">
        <CardHeader>
          <h3 className="text-primary font-medium">Evolução Diária do Alumínio</h3>
        </CardHeader>
        <CardBody>
          <div className="h-[300px] w-full">
            <Line
              data={monthlyChartData}
              options={monthlyChartOptions}
              key="monthly-chart"
            />
          </div>
        </CardBody>
      </Card>

      {/* Weekly Chart */}
      <Card shadow="sm">
        <CardHeader>
          <h3 className="text-primary font-medium">Evolução Semanal do Alumínio</h3>
        </CardHeader>
        <CardBody>
          <div className="h-[300px] w-full">
            <Line
              data={monthlyChartData}
              options={monthlyChartOptions}
              key="monthly-chart"
            />
          </div>
        </CardBody>
      </Card>

      {/* Monthly Chart */}
      <Card shadow="sm">
        <CardHeader>
          <h3 className="text-primary font-medium">Evolução Mensal do Alumínio (05/2024 - 04/2025)</h3>
        </CardHeader>
        <CardBody>
          <div className="h-[300px] w-full">
            <Line
              data={monthlyChartData}
              options={monthlyChartOptions}
              key="monthly-chart"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
} 