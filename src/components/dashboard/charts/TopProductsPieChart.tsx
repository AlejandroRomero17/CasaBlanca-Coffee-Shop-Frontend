// src/components/dashboard/charts/TopProductsPieChart.tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const productData = [
  { name: "Café Espresso", value: 35 },
  { name: "Cappuccino", value: 25 },
  { name: "Latte", value: 20 },
  { name: "Pasteles", value: 15 },
  { name: "Otros", value: 5 },
];

// Nuevos colores actualizados para un aspecto más moderno
const COLORS = ["#FF6347", "#4CAF50", "#FF9800", "#2196F3", "#9C27B0"];

const TopProductsPieChart = () => {
  return (
    <Card className="col-span-1 p-4 bg-white border-none rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4A4A4A]">
          Productos Más Vendidos
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Distribución de ventas por producto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {productData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} // Colores nuevos para cada sección
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProductsPieChart;
