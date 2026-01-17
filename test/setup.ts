import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function resetDatabase() {
  await prisma.order.deleteMany({});
  await prisma.income.deleteMany({});
  await prisma.expense.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.user.deleteMany({});
}
