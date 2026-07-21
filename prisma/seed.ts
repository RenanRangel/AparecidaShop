import { PrismaClient, StoreStatus } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {

  await prisma.productFavorite.deleteMany();
  await prisma.storeFavorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.storeCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();


  const categoryNames = [
    "Artigos religiosos",
    "Lembranças e souvenirs",
    "Vestuário",
    "Alimentação",
    "Acessórios",
    "Decoração",
  ];


  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.create({
        data: {
          name,
          slug: name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-"),
        },
      })
    )
  );


  const categoryByName = Object.fromEntries(
    categories.map((category) => [
      category.name,
      category,
    ])
  );


  await prisma.store.create({
    data: {
      name: "Loja São Francisco",
      slug: "loja-sao-francisco",
      description:
        "Terços, imagens e medalhas religiosas.",
      location:
        "Galeria Recreio, Centro - Aparecida",
      whatsapp:
        "12999999999",
      logoInitials:
        "SF",
      coverTone:
        "pine",
      status:
        StoreStatus.APPROVED,
      isVerified:
        true,


      categories:{
        create:[
          {
            categoryId:
            categoryByName["Artigos religiosos"].id
          }
        ]
      },


      products:{
        create:[
          {
            name:
            "Terço em madeira",
            price:
            2500,
            categoryId:
            categoryByName["Artigos religiosos"].id
          },

          {
            name:
            "Imagem Nossa Senhora Aparecida",
            price:
            8900,
            categoryId:
            categoryByName["Artigos religiosos"].id
          }
        ]
      }
    }
  });


  console.log("Seed executado com sucesso!");
}


main()
.then(async()=>{

 await prisma.$disconnect();

})
.catch(async(e)=>{

 console.error(e);

 await prisma.$disconnect();

 process.exit(1);

});