import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthlyData = [
  { name: "Ene", ventas: 12400 },
  { name: "Feb", ventas: 14500 },
  { name: "Mar", ventas: 16800 },
  { name: "Abr", ventas: 15200 },
  { name: "May", ventas: 18900 },
  { name: "Jun", ventas: 21500 },
  { name: "Jul", ventas: 25800 },
  { name: "Ago", ventas: 24200 },
  { name: "Sep", ventas: 22500 },
  { name: "Oct", ventas: 19800 },
  { name: "Nov", ventas: 23400 },
  { name: "Dic", ventas: 28900 },
];

const hourlyData = [
  { hora: "7am", ventas: 450 },
  { hora: "8am", ventas: 980 },
  { hora: "9am", ventas: 1250 },
  { hora: "10am", ventas: 890 },
  { hora: "11am", ventas: 780 },
  { hora: "12pm", ventas: 1450 },
  { hora: "1pm", ventas: 1680 },
  { hora: "2pm", ventas: 1200 },
  { hora: "3pm", ventas: 950 },
  { hora: "4pm", ventas: 1100 },
  { hora: "5pm", ventas: 1350 },
  { hora: "6pm", ventas: 1580 },
  { hora: "7pm", ventas: 1250 },
  { hora: "8pm", ventas: 850 },
];

const SalesTabs = () => {
  return (
    <Tabs defaultValue="monthly">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="monthly">Mensual</TabsTrigger>
          <TabsTrigger value="daily">Diario</TabsTrigger>
          <TabsTrigger value="hourly">Por Hora</TabsTrigger>
        </TabsList>
        <Select defaultValue="year">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year">Último año</SelectItem>
            <SelectItem value="6months">Últimos 6 meses</SelectItem>
            <SelectItem value="3months">Últimos 3 meses</SelectItem>
            <SelectItem value="month">Último mes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TabsContent value="monthly" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
            <CardDescription>
              Tendencia de ventas durante el último año
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Ventas"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#8B5A2B"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="hourly" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Hora</CardTitle>
            <CardDescription>
              Distribución de ventas durante el día
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Ventas"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="ventas" fill="#8B5A2B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="daily">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Diarias</CardTitle>
            <CardDescription>Ventas por día de la semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Seleccione un rango de fechas para ver datos diarios
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SalesTabs;
