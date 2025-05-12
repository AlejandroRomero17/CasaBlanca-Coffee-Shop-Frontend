import { useState } from "react";
import { ProfileTabs } from "./ProfileTabs";
import { ProfileInfoCard } from "./ProfileInfoCard";
import { OrderList } from "./orders/OrderList";
import { ProfileActions } from "./ProfileActions";

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  return (
    <div className="flex justify-center px-4 pt-20 pb-16">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-semibold text-center text-[#3B2F2F] mb-6">
          Mi Perfil
        </h1>

        <ProfileTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        {activeTab === "profile" ? (
          <>
            <ProfileInfoCard />
            <ProfileActions />
          </>
        ) : (
          <OrderList />
        )}
      </div>
    </div>
  );
}
