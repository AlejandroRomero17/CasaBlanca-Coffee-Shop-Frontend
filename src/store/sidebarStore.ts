import { create } from "zustand";

interface SidebarStore {
  isSidebarOpen: boolean; // móvil
  isCollapsed: boolean; // escritorio
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: false, // para móvil
  isCollapsed: false, // expandido por defecto
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
