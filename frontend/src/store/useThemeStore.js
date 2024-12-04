import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffe", // Set initial theme from localStorage or default to "coffe"
  
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme); // Correctly set the theme in localStorage
    set({ theme }); // Update the theme in Zustand state
  },
}));
