import { z } from "zod";

export const createComboValidator = z.object({
  notation: z.string(),
  damage: z.number().min(0).max(100),
  meterGain: z.number(),
  worksOn: z.string(),
  difficulty: z.string(),
  notes: z.string().max(255),
  gameId: z.string(),
  characterId: z.string(),
});

export type CreateComboInputType = z.infer<typeof createComboValidator>;