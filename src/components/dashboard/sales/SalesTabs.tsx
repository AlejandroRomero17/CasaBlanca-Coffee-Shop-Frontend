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
          <TabsTrigger value="monthly" className="text-[#4A4A4A]">
            Mensual
          </TabsTrigger>
          <TabsTrigger value="daily" className="text-[#4A4A4A]">
            Diario
          </TabsTrigger>
          <TabsTrigger value="hourly" className="text-[#4A4A4A]">
            Por Hora
          </TabsTrigger>
        </TabsList>
        <Select defaultValue="year" className="text-[#4A4A4A]">
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
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-[#4A4A4A]">
              Ventas Mensuales
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Tendencia de ventas durante el último año
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
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
                    stroke="#4A90E2"
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
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-[#4A4A4A]">
              Ventas por Hora
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Distribución de ventas durante el día
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="hora" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Ventas"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="ventas" fill="#4A90E2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="daily">
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-[#4A4A4A]">
              Ventas Diarias
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Ventas por día de la semana
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-0">
            <p className="text-muted-foreground">
              Seleccione un rango de fechas para ver datos diarios
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SalesTabs;
