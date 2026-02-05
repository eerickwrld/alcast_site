"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { getLocalTimeZone, today } from "@internationalized/date"
import {
  HeroSection,
  FilterBar,
  VariationCards,
  MetalCharts,
  PriceTable,
  dailyChartData,
  weeklyChartData,
  monthlyChartData,
  chartOptions,
  monthlyChartOptions
} from "@/components/lme"
import Footer from "@/components/footer";

export default function LMEPage() {
  // Estado para o range de datas usando o formato correto para o DateRangePicker
  const [dateRange, setDateRange] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone())
  });

  // Sample data for the charts and tables
  const dailyData = {
    previousDate: "02/09/2024",
    previousValue: 2.390_5,
    currentDate: "03/09/2024",
    currentValue: 2.483_5,
    percentageChange: -2.96,
  }

  const weeklyData = {
    previousDate: "Semana 36/2024",
    previousValue: 2.390_5,
    currentDate: "Semana 35/2024",
    currentValue: 2.475_13,
    percentageChange: -3.42,
  }

  const monthlyData = {
    previousDate: "Em 03/2025",
    previousValue: 2657.21,
    currentDate: "Em 04/2025",
    currentValue: 2381.25,
    percentageChange: -10.39,
  }

  const tableData = [
    { day: "01/Setembro", aluminumUSD: "2.230,00", dollarUSD: "4,9954" },
    { day: "02/Setembro", aluminumUSD: "2.228,00", dollarUSD: "5,0969" },
    { day: "Média Semana 22", aluminumUSD: "2.257,38", semanalRate: true, dollarUSD: "4,9954" },
    { day: "Média Mensal", aluminumUSD: "2.181,07", mensalRate: true, dollarUSD: "4,8647" },
  ]

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Indicators Section */}
      <section className="py-8">
        <div className="container px-4 mx-auto md:px-6">
          {/* Date Range and Filters */}
          <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

          {/* Price Variation Cards */}
          <VariationCards 
            dailyData={dailyData} 
            weeklyData={weeklyData} 
            monthlyData={monthlyData} 
          />

          {/* Charts Section */}
          <MetalCharts 
            dailyChartData={dailyChartData} 
            weeklyChartData={weeklyChartData} 
            monthlyChartData={monthlyChartData} 
            chartOptions={chartOptions} 
          />

          {/* Table Section */}
          <PriceTable tableData={tableData} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
