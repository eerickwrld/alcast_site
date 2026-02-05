import { DateValue, CalendarDate } from "@internationalized/date"
import { ChartData, ChartOptions } from "chart.js"

// Interfaces para os dados de variação
export interface VariationData {
  previousDate: string
  previousValue: number
  currentDate: string
  currentValue: number
  percentageChange: number
}

// Interface para os dados da tabela
export interface TableRowData {
  day: string
  aluminumUSD: string
  dollarUSD: string
}

// Interface para as props do FilterBar
export interface FilterBarProps {
  dateRange: { start: CalendarDate; end: CalendarDate }
  setDateRange: (range: { start: CalendarDate; end: CalendarDate }) => void
}

// Interface para as props do VariationCards
export interface VariationCardsProps {
  dailyData: VariationData
  weeklyData: VariationData
  monthlyData: VariationData
}

// Interface para as props do MetalCharts
export interface MetalChartsProps {
  dailyChartData: ChartData<'line'>
  weeklyChartData: ChartData<'line'>
  monthlyChartData: ChartData<'line'>
  chartOptions: ChartOptions<'line'>
}

// Interface para as props do PriceTable
export interface PriceTableProps {
  tableData: TableRowData[]
} 