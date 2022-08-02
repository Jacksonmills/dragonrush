// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { characterRouter } from "./character";
import { protectedExampleRouter } from "./protected-example-router";
import { comboRouter } from "./combo";
import { gameRouter } from "./game";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("game.", gameRouter)
  .merge("character.", characterRouter)
  .merge("combo.", comboRouter)
  .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
