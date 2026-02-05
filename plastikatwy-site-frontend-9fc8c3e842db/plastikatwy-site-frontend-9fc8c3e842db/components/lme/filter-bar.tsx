import { Button, Chip, DateRangePicker } from "@heroui/react"
import { DateValue, CalendarDate } from "@internationalized/date"

interface FilterBarProps {
  dateRange: { start: CalendarDate; end: CalendarDate }
  setDateRange: (range: { start: CalendarDate; end: CalendarDate }) => void
}

export function FilterBar({ dateRange, setDateRange }: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
      <h2 className="text-lg font-medium text-primary mb-4 sm:mb-0">Indicadores de setembro de 2024</h2>
      <div className="flex items-center lg:flex-row gap-2">
        {/* <Button
          variant="bordered"
          className="px-6"
        >
          Comparar com período
        </Button>
        <Button
          color="primary"
          className="px-6"
        >
          Últimos 30 dias
        </Button>
        <Button
          variant="bordered"
          className="px-6"
        >
          Últimos 15 dias
        </Button>
        <Button
          variant="bordered"
          className="px-6"
        >
          Últimos 7 dias
        </Button> */}
        <div className="flex items-end text-foreground flex-col text-right gap-1">
          <label>Período da consulta</label>
          <div className="flex items-center gap-2">
            <Chip radius="sm" size="lg" color="primary">Janeiro/25 - Fevereiro/25</Chip>
          </div>
        </div>
        {/* <DateRangePicker
          value={dateRange}
          label=""
          variant="bordered"
          onChange={(range) => {
            if (range) {
              setDateRange(range);
            }
          }}
          className="max-w-[300px]"
        /> */}
      </div>
    </div>
  )
} 