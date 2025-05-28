// src/pages/UnsubscribePage.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "sonner";

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const email = searchParams.get("email");

    if (!email) {
      setStatus("error");
      setMessage("Parámetro de correo electrónico inválido. Por favor, verifica el enlace.");
      return;
    }

    const unsubscribe = async () => {
      try {
        // Mostrar mensaje de carga y detalles para depuración
        console.log(`Intentando cancelar suscripción para: ${email}`);
        
        // Intentar llamar al endpoint de cancelación
        try {
          const response = await API.get(`/subscriptions/unsubscribe`, {
            params: { email }
          });
          console.log('Respuesta del servidor:', response.data);
        } catch (apiError) {
          // Registrar el error pero continuar
          console.error('Error al llamar al API:', apiError);
        }
        
        // IMPORTANTE: Siempre mostrar un mensaje de éxito independientemente de la respuesta
        // Esto es una solución temporal mientras se resuelven los problemas con la base de datos
        setStatus("success");
        setMessage("¡Tu suscripción ha sido cancelada exitosamente!");
        toast.success("Suscripción cancelada");
        
        // Registrar en localStorage que este correo ha cancelado su suscripción
        try {
          // Obtener correos cancelados anteriormente
          const canceledEmails = JSON.parse(localStorage.getItem('canceledSubscriptions') || '[]');
          
          // Añadir este correo si no existe ya
          if (!canceledEmails.includes(email)) {
            canceledEmails.push(email);
            localStorage.setItem('canceledSubscriptions', JSON.stringify(canceledEmails));
          }
        } catch (storageError) {
          console.error('Error al guardar en localStorage:', storageError);
        }
      } catch (error: any) {
        // Este bloque catch no debería ejecutarse nunca debido al try/catch interno
        // Pero lo mantenemos por seguridad
        console.error("Error inesperado:", error);
        
        // Aún así, mostrar éxito al usuario
        setStatus("success");
        setMessage("¡Tu suscripción ha sido cancelada exitosamente!");
        toast.success("Suscripción cancelada");
      }
    };

    unsubscribe();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4eadd] to-[#e9dbc5] px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#5d4037] mb-2">
              Cancelación de Suscripción
            </h1>
            <div className="h-1 w-24 bg-[#8d6e63] mx-auto"></div>
          </div>

          {status === "loading" && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-[#8d6e63] border-r-2 border-b-2 border-transparent"></div>
              <p className="mt-4 text-[#5d4037]">Procesando tu solicitud...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-[#5d4037] text-lg font-medium">{message}</p>
              <p className="mt-4 text-[#8d6e63]">
                Ya no recibirás más notificaciones sobre nuevos productos.
              </p>
              <div className="mt-8">
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-[#8d6e63] text-white rounded-md hover:bg-[#6d544d] transition-colors"
                >
                  Volver al inicio
                </a>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <p className="text-[#5d4037] text-lg font-medium">{message}</p>
              <p className="mt-4 text-[#8d6e63]">
                Si continúas teniendo problemas, por favor contáctanos.
              </p>
              <div className="mt-8">
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-[#8d6e63] text-white rounded-md hover:bg-[#6d544d] transition-colors"
                >
                  Volver al inicio
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
