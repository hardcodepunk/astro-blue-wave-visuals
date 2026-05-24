import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default {
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
};
