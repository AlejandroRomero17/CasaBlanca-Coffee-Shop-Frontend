import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "@/services/adminUserService";
import { User } from "@/types/user";
import EditUserModal from "@/components/dashboard/users/EditUserModal";
import UserTable from "@/components/dashboard/users/UserTable";
import UserSearchBar from "@/components/dashboard/users/UserSearchBar";
import { toast } from "sonner";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setFiltered(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Error inesperado al cargar usuarios";
      toast.error("Error al obtener usuarios", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFiltered(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success("Usuario eliminado correctamente");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Error inesperado al eliminar usuario";
      toast.error("Error al eliminar usuario", {
        description: message,
      });
    }
  };

  const handleUpdate = (data: {
    name: string;
    email: string;
    role: "customer" | "admin";
  }) => {
    if (!editingUser) return;
    const updatedUser: User = { ...editingUser, ...data };
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    toast.success("Usuario actualizado correctamente");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-[#3B2F2F]">
          Gestión de Usuarios
        </h1>
        <UserSearchBar
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <UserTable
        users={filtered}
        onEdit={(user) => setEditingUser(user)}
        onDelete={handleDelete}
        loading={loading}
      />

      <EditUserModal
        open={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleUpdate}
      />
    </div>
  );
}
