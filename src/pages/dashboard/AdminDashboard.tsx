// src/pages/dashboard/AdminDashboard.tsx
import StatsCards from "@/components/dashboard/cards/StatsCards";
import SalesBarChart from "@/components/dashboard/charts/SalesBarChart";
import TopProductsPieChart from "@/components/dashboard/charts/TopProductsPieChart";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#4A3520]">Dashboard</h1>
        <span className="text-sm text-muted-foreground">
          Última actualización: Hoy, 10:30 AM
        </span>
      </div>

      {/* Tarjetas de métricas */}
      <StatsCards />

      {/* Gráficas */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <SalesBarChart />
        </Card>
        <Card className="col-span-1">
          <TopProductsPieChart />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
