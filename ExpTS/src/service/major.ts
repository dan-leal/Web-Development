import { PrismaClient, Major } from "@prisma/client";

import { CreateMajorDto } from "../types/major";

const prisma = new PrismaClient()

export const createMajor = async (major: CreateMajorDto): Promise<Major> => {
  return prisma.major.create({ data: major });
};

export const getMajors = async (): Promise<Major[]> => {
  return prisma.major.findMany();
}

export const getMajor = async (id: string): Promise<Major | null> => {
  return prisma.major.findUnique({ where: { id } });
}

// export const updateMajor = async (id:string,major: Major): Promise<Major> => {
//   const oldMajorName = await prisma.major.findUnique({
//     where: { id: (id) },
//     select: {
//       name: true,
//     },
//   })
//   const oldMajorCode = await prisma.major.findUnique({
//     where: { id: (id) },
//     select: {
//       code: true,
//     },
//   })
//   const oldMajorDescription = await prisma.major.findUnique({
//     where: { id: (id) },
//     select: {
//       description: true,
//     },
//   })

//   return prisma.major.update({
//     where: { id: id || undefined},
//     data: {
//       name: !oldMajorName?.name,
//       code: !oldMajorCode?.code,
//       description: !oldMajorDescription?.description
//     },
//   })
// }
