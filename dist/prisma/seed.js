"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("12345678", 10);
  console.log(hashedPassword);
  await prisma.admin.upsert({
    where: { username: "neeomdesigns@gmail.com" },
    update: {},
    create: {
      username: "neeomdesigns@gmail.com",
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
