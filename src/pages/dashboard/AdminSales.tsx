// src/pages/dashboard/AdminSales.tsx
import { CalendarIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
// import SalesOverviewCards from "@/components/dashboard/sales/SalesOverviewCards";
import SalesOverviewCards from "@/components/dashboard/sales/SalesOverviewCards";
// import SalesTabs from "@/components/dashboard/sales/SalesTabs";
import SalesTabs from "@/components/dashboard/sales/SalesTabs";

const AdminSales = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#4A3520]">Ventas</h1>
        <div className="flex items-center gap-x-2">
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="w-4 h-4" />
            Abril 2023
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      <SalesOverviewCards />
      <SalesTabs />
    </div>
  );
};

export default AdminSales;
