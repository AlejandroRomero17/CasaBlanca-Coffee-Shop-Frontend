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

const COLORS = ["#8B5A2B", "#A67C52", "#C69C6D", "#D4B996", "#E6CCAF"];

const TopProductsPieChart = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Productos Más Vendidos</CardTitle>
        <CardDescription>Distribución de ventas por producto</CardDescription>
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
                    fill={COLORS[index % COLORS.length]}
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
