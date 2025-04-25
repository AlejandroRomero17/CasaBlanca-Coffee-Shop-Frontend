"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Coffee, Users, ShoppingBag } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-700">
            Ventas Totales
          </CardTitle>
          <DollarSign className="w-6 h-6 text-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">$15,240</div>
          <p className="text-xs text-gray-500">+12.5% respecto al mes pasado</p>
        </CardContent>
      </Card>

      <Card className="p-4 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-700">
            Productos Vendidos
          </CardTitle>
          <Coffee className="w-6 h-6 text-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">1,432</div>
          <p className="text-xs text-gray-500">+8.2% respecto al mes pasado</p>
        </CardContent>
      </Card>

      <Card className="p-4 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-700">
            Clientes
          </CardTitle>
          <Users className="w-6 h-6 text-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">573</div>
          <p className="text-xs text-gray-500">+18.7% respecto al mes pasado</p>
        </CardContent>
      </Card>

      <Card className="p-4 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-700">
            Pedidos Pendientes
          </CardTitle>
          <ShoppingBag className="w-6 h-6 text-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">12</div>
          <p className="text-xs text-gray-500">-3 respecto a ayer</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
