import { z } from "zod";

export const createCharacterValidator = z.object({
  name: z.string(),
  tag: z.string().length(3, { message: "Tag must be 3 characters long." }),
  iconUrl: z.string(),
  renderUrl: z.string(),
  gameId: z.string()
});

export type CreateCharacterInputType = z.infer<typeof createCharacterValidator>;