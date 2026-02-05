import { Card, CardHeader, CardBody, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react"
import { Printer } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface TableRowData {
  day: string
  aluminumUSD: string
  dollarUSD: string
}

interface PriceTableProps {
  tableData: TableRowData[]
}

export function PriceTable({ tableData }: PriceTableProps) {
  return (
    <div className="mt-8">
      <Card shadow="sm">
        <CardHeader className="justify-between">
          <h3 className="text-primary font-medium">Tabela de informações diárias de Setembro de 2024</h3>
          <Button 
            variant="light" 
            startContent={<Printer className="h-4 w-4" />}
            size="sm"
          >
            Imprimir
          </Button>
        </CardHeader>
        <CardBody>
          <Table 
            removeWrapper 
            aria-label="Tabela de cotações LME"
          >
            <TableHeader>
              <TableColumn>Dia</TableColumn>
              <TableColumn>Alumínio USD/t</TableColumn>
              <TableColumn>Dólar (USD)</TableColumn>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow 
                  key={index}
                  className={twMerge(
                    "hover:bg-white transition-all duration-100",
                    row.semanalRate && "hover:bg-gray-200 bg-gray-200 text-primary rounded-lg",
                    row.mensalRate && "bg-primary hover:bg-primary text-white rounded-lg",
                  )}
                >
                  <TableCell className="rounded-l-lg">{row.day}</TableCell>
                  <TableCell>{row.aluminumUSD}</TableCell>
                  <TableCell className="rounded-r-lg">{row.dollarUSD}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
} 