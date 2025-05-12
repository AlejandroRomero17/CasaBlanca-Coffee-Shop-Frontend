import { Button } from "@/components/ui/button";

interface ProfileTabsProps {
  activeTab: "profile" | "orders";
  onChangeTab: (tab: "profile" | "orders") => void;
}

export function ProfileTabs({ activeTab, onChangeTab }: ProfileTabsProps) {
  return (
    <div className="flex mb-6 border-b border-[#f0e6db]">
      <Button
        variant="ghost"
        className={`rounded-none ${
          activeTab === "profile" ? "border-b-2 border-[#3B2F2F]" : ""
        }`}
        onClick={() => onChangeTab("profile")}
      >
        Perfil
      </Button>
      <Button
        variant="ghost"
        className={`rounded-none ${
          activeTab === "orders" ? "border-b-2 border-[#3B2F2F]" : ""
        }`}
        onClick={() => onChangeTab("orders")}
      >
        Mis Órdenes
      </Button>
    </div>
  );
}
