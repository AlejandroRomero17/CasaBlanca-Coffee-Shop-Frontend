// src/components/dashboard/SalesBarChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const salesData = [
  { name: "Lun", ventas: 1200 },
  { name: "Mar", ventas: 1900 },
  { name: "Mié", ventas: 1500 },
  { name: "Jue", ventas: 2200 },
  { name: "Vie", ventas: 2800 },
  { name: "Sáb", ventas: 3200 },
  { name: "Dom", ventas: 2500 },
];

const SalesBarChart = () => {
  return (
    <Card className="col-span-1 p-4 bg-white border-none rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4A4A4A]">
          Ventas Semanales
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Ventas diarias de la última semana
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                formatter={(value) => [`$${value}`, "Ventas"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#333" }}
              />
              <Bar dataKey="ventas" fill="#4A90E2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesBarChart;
