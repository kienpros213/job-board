import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const password = '1529164'

const prisma = new PrismaClient()
async function main() {
  const kien = await prisma.user.upsert({
    where: { email: 'kien1529164@gmail.com' },
    update: {},
    create: {
      email: 'kien1529164@gmail.com',
      username: 'kien1529164',
      password: await bcrypt.hash(password, 10),
    },
  })
  const trung = await prisma.user.upsert({
    where: { email: 'trung1529164@gmail.com' },
    update: {},
    create: {
      email: 'trung1529164@gmail.com',
      username: 'trung1529164',
      password: await bcrypt.hash(password, 10)
    },
  })

  const updateKienPost = await prisma.user.update({
    where: {
        user_id: 1,
      },
      data: {
        posts: {
            create: [{
              title: "lmao React",
              description:"lmao description",
              location: "lmao",      
              salary: "10000000",
            }]
          }
      },
      include: {
        posts: true,
      },
  })

  const updateTrungPost = await prisma.user.update({
    where: {
        user_id: 2,
      },
      data: {
        posts: {
            create: [{
              title: "lmao ThreeJS",
              description:"lmao description",
              location: "lmao",      
              salary: "20000000",
            }]
          }
      },
      include: {
        posts: true,
      },
  })
  console.log({ kien, trung, updateKienPost, updateTrungPost })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
