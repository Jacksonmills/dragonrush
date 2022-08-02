import { createRouter } from "./context";
import { z } from "zod";

export const gameRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.game.findMany();
    },
  });
