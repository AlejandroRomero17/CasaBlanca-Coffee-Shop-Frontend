import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SalesOverviewCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$245,675</div>
          <p className="text-xs text-muted-foreground">
            +18.2% respecto al año anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$8.75</div>
          <p className="text-xs text-muted-foreground">
            +1.25 respecto al mes anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Clientes Diarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">187</div>
          <p className="text-xs text-muted-foreground">
            +12% respecto al mes anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOverviewCards;
