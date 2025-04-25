import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SalesOverviewCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Ventas Totales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">$245,675</div>
          <p className="text-xs text-gray-500">
            +18.2% respecto al año anterior
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Ticket Promedio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">$8.75</div>
          <p className="text-xs text-gray-500">
            +1.25 respecto al mes anterior
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Clientes Diarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-700">187</div>
          <p className="text-xs text-gray-500">+12% respecto al mes anterior</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOverviewCards;
