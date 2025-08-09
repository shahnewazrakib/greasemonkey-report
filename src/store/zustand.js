import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools((set) => ({
    data: null,
    rating: {
      engine: 0,
      fluid: 0,
      gearbox: 0,
      differential: 0,
      suspension: 0,
      brake: 0,
      tyre: 0,
      exhaust: 0,
      light: 0,
      interior: 0,
      exterior: 0,
      chassis: 0,
    },

    setData: (data) => set({ data }),
    setRating: (part, rating) =>
      set((state) => ({
        rating: { ...state.rating, [part]: rating },
      })),
  }))
);
