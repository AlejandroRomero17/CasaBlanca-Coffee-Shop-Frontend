import { useEffect } from "react";
import { useAuthStore } from "@store/authStore";
import { useNavigate } from "react-router-dom";

export function useAuthRedirect() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true }); // redirigir a home o dashboard
    }
  }, [token, navigate]);
}
