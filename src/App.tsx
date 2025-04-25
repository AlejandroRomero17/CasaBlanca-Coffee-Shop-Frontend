import { useEffect, Suspense } from "react";
import AppRoutes from "@/router";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authStore";
import { getProfile } from "@/services/authService";

export default function App() {
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (token) {
      getProfile()
        .then((user) => {
          console.log("[App] Usuario rehidratado:", user);
          setUser(user);
        })
        .catch(() => {
          console.error("[App] Token inválido");
          logout();
        });
    }
  }, [token, setUser, logout]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-16">
          <Spinner size="large" />
        </div>
      }
    >
      <AppRoutes />
    </Suspense>
  );
}
