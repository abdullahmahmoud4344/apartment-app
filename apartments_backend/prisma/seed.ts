import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const apartmentsToCreate = 50;

  for (let i = 0; i < apartmentsToCreate; i++) {
    const id = i + 1;
    const unitName = `${faker.word.adjective()} ${faker.word.noun()}`;
    const unitNumber = faker.number.int({ min: 1, max: 500 });
    const project = faker.company.name();
    const price = parseFloat(
      faker.commerce.price({ min: 100000, max: 500000 }),
    );

    const apartment = await prisma.apartment.upsert({
      where: { id },
      update: {},
      create: {
        unitName,
        unitNumber,
        project,
        price,
        images: Array.from({
          length: faker.number.int({ min: 1, max: 5 }),
        }).map(
          () =>
            `${process.env.BASE_URL!.replace('localhost', 'api')}/uploads/apart1.jpeg`,
        ),
      },
    });

    console.log(
      `✅ Created apartment ${apartment.unitName} #${apartment.unitNumber}`,
    );
  }

  console.log(`🏠 Seeded ${apartmentsToCreate} apartments with images`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
