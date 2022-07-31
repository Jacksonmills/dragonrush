import { createRouter } from "./context";
import { z } from "zod";

export const comboRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.combo.findMany();
    },
  });
