// src/components/dashboard/users/UserSearchBar.tsx
import { Input } from "@/components/ui/input";

interface UserSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserSearchBar({ value, onChange }: UserSearchBarProps) {
  return (
    <Input
      placeholder="Buscar usuario..."
      value={value}
      onChange={onChange}
      className="w-full md:w-64"
    />
  );
}
