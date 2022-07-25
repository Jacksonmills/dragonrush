// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const characters = async (req: NextApiRequest, res: NextApiResponse) => {
  const characters = await prisma.character.findMany();
  res.status(200).json(characters);
};

export default characters;
