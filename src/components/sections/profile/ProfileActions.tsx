import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export function ProfileActions() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate("/profile/edit")}
      >
        Editar Perfil
      </Button>
      <Button
        variant="destructive"
        className="w-full"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}
