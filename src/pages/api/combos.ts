// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const combos = async (req: NextApiRequest, res: NextApiResponse) => {
  const combos = await prisma.combo.findMany();
  res.status(200).json(combos);
};

export default combos;
