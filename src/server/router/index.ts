// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { characterRouter } from "./character";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("character.", characterRouter)
  .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
