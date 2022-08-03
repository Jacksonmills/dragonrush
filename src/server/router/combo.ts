import { createRouter } from "./context";
import { z } from "zod";
import { createComboValidator } from "@/shared/create-combo-validator";
import { NotationData } from "@/types";

export const comboRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.combo.findMany();
    },
  })
  .query("getById", {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.combo.findFirst({
        where: { id: input.id },
      });
    },
  })
  .query("getByTag", {
    input: z.object({ tag: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.combo.findMany({
        where: { characterTag: input.tag },
      });
    },
  })
  .mutation("create", {
    input: createComboValidator,
    async resolve({ input, ctx }) {
      return await ctx.prisma.combo.create({
        data: {
          notation: JSON.parse(input.notation) as NotationData,
          damage: input.damage,
          meterGain: input.meterGain,
          worksOn: input.worksOn,
          difficulty: input.difficulty,
          notes: input.notes,
          game: {
            connect: { id: input.gameId }
          },
          character: {
            connect: { id: input.characterId, }
          }
        }
      });
    }
  });
