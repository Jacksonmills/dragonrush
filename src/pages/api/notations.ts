// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const notations = async (req: NextApiRequest, res: NextApiResponse) => {
  const notations = await prisma.notation.findMany({
    select: {
      id: true,
      inputs: true,
    }
  });
  res.status(200).json(notations);
};

export default notations;
