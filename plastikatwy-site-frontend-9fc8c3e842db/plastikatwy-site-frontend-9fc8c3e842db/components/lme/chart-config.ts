import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

// Registrar os componentes Chart.js necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Dados para o gráfico diário
export const dailyChartData: ChartData<'line'> = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
  datasets: [
    {
      label: 'Cotação do Alumínio',
      data: [2290, 2210, 2220, 2215, 2210, 2205, 2230, 2225, 2210, 2225, 2215, 2200, 2210, 2220, 2240, 2250, 2220, 2225, 2220, 2240, 2265, 2270, 2260, 2240, 2205, 2230, 2250, 2240, 2230, 2220],
      borderColor: '#1A408A',
      backgroundColor: '#1A408A',
      borderWidth: 0,
      pointRadius: 0,
      fill: true,
    }
  ]
};

// Dados para o gráfico semanal
export const weeklyChartData: ChartData<'line'> = {
  labels: ['Sem. 29/05', 'Sem. 29/05', 'Sem. 29/05', 'Sem. 29/05', 'Sem. 29/05'],
  datasets: [
    {
      label: 'Cotação do Alumínio',
      data: [2300, 2260, 2200, 2250, 2200],
      borderColor: '#1A408A',
      backgroundColor: '#1A408A',
      borderWidth: 0,
      pointRadius: 0,
      fill: true,
    }
  ]
};

// Dados para o gráfico mensal
export const monthlyChartData: ChartData<'line'> = {
  labels: [
    "5/2024",
    "6/2024",
    "7/2024",
    "8/2024",
    "9/2024",
    "10/2024",
    "11/2024",
    "12/2024",
    "1/2025",
    "2/2025",
    "3/2025",
    "4/2025"
  ],
  datasets: [
    {
      label: 'Mensal do Alumínio',
      data: [
        2565.19,
        2495.05,
        2362.3,
        2334.33,
        2451.67,
        2598.39,
        2583.19,
        2538.43,
        2574.95,
        2653.38,
        2657.21,
        2381.25
      ],
      borderColor: '#6b777d',
      backgroundColor: '#6b777d26',
      borderWidth: 1.4,
      tension: 0.35,
      pointRadius: 3,
      fill: true,
    }
  ]
};

// Configurações comuns para todos os gráficos
export const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1A408A',
      bodyColor: '#333',
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        title: (tooltipItems: any) => {
          return `Dia ${tooltipItems[0].label}`;
        },
        label: (context: any) => {
          return `Alumínio: ${context.parsed.y.toFixed(2)}`;
        }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 2050,
      max: 2300,
      grid: {
        color: 'rgba(200, 200, 200, 0.3)'
      },
      ticks: {
        display: true,
        stepSize: 50,
      }
    },
    x: {
      grid: {
        color: 'rgba(200, 200, 200, 0.3)'
      },
    }
  },
  elements: {
    line: {
      tension: 0.1
    }
  }
};

// Configurações específicas para o gráfico mensal
export const monthlyChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1A408A',
      bodyColor: '#333',
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        title: (tooltipItems: any) => {
          return `${tooltipItems[0].label}`;
        },
        label: (context: any) => {
          return `Alumínio: ${context.parsed.y.toFixed(2)} USD/t`;
        }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 2300,
      max: 2700,
      grid: {
        color: 'rgba(200, 200, 200, 0.3)'
      },
      ticks: {
        display: true,
        stepSize: 100,
      }
    },
    x: {
      grid: {
        color: 'rgba(200, 200, 200, 0.3)'
      },
    }
  },
  elements: {
    line: {
      tension: 0.35
    }
  }
}; 