import { createRouter } from "./context";
import { z } from "zod";
import { createCharacterValidator } from "@/shared/create-character-validator";

export const characterRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.character.findMany();
    },
  })
  .query("getById", {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.character.findFirst({
        where: { id: input.id },
      });
    },
  })
  .query("getByTag", {
    input: z.object({ tag: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.character.findFirst({
        where: { tag: input.tag },
        include: {
          game: true,
          combos: true
        }
      });
    },
  })
  .mutation("create", {
    input: createCharacterValidator,
    async resolve({ input, ctx }) {
      return await ctx.prisma.character.create({
        data: {
          name: input.characterName,
          tag: input.tag,
          iconUrl: input.iconUrl,
          renderUrl: input.renderUrl,
          game: {
            connect: { id: input.gameId }
          },
        }
      });
    }
  });
