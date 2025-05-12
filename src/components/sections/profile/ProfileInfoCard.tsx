import { useAuthStore } from "@/store/authStore";

export function ProfileInfoCard() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="mb-6 space-y-4">
      <div>
        <p className="text-sm font-medium text-[#3B2F2F]/80">Nombre</p>
        <p className="text-lg text-[#3B2F2F]">{user.name}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-[#3B2F2F]/80">Correo</p>
        <p className="text-lg text-[#3B2F2F]">{user.email}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-[#3B2F2F]/80">Teléfono</p>
        <p className="text-lg text-[#3B2F2F]">
          {user.phone || "No registrado"}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-[#3B2F2F]/80">Rol</p>
        <p className="text-lg text-[#3B2F2F] capitalize">{user.role}</p>
      </div>
    </div>
  );
}
