import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTableRow = ({ user, onEdit, onDelete }: UserTableRowProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b hover:bg-gray-50"
    >
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            ) : (
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <span className="font-medium text-gray-800">{user.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-700">{user.email}</td>
      <td className="px-4 py-3 text-gray-700 capitalize">{user.role}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(user)}
            className="hover:bg-primary/10"
            aria-label="Editar usuario"
          >
            <Pencil className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(user.id)}
            className="hover:bg-red-100"
            aria-label="Eliminar usuario"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </td>
    </motion.tr>
  );
};

export default UserTableRow;
