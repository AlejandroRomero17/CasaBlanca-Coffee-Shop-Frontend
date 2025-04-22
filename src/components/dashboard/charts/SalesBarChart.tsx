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
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Ventas Semanales</CardTitle>
        <CardDescription>Ventas diarias de la última semana</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${value}`, "Ventas"]}
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
              />
              <Bar dataKey="ventas" fill="#8B5A2B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesBarChart;
