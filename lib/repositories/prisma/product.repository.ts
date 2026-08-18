import { prisma } from "@/lib/prisma";
import type { ProductWithStore } from "@/types";
import type { ProductRepository, CreateProductInput, UpdateProductInput } from "../types";


function mapProduct(product: any): ProductWithStore {
  return {
    storeSlug: product.store?.slug ?? '',
    id: product.id,
    name: product.name,
    description: product.description ?? undefined,
    storeId: product.storeId,
    categoryId: product.categoryId,

    price: product.price,

    imageTone: "sand",

    category: product.category?.name ?? "Sem categoria",
    status: product.status,

    storeName: product.store?.name ?? "Loja não encontrada",
    storeWhatsapp: product.store?.whatsapp ?? undefined,
    images: (product.images ?? [])
  .slice()
  .sort((a: any, b: any) => a.position - b.position)
  .map((img: any) => ({ id: img.id, url: img.url, isCover: img.isCover })),
  };
}



export class PrismaProductRepository
implements ProductRepository {


  async getAll(): Promise<ProductWithStore[]> {

    const products =
      await prisma.product.findMany({

        include:{
          store:true,
          category:true,
          images: true
        },

        orderBy:{
          createdAt:"desc"
        }

      });


    return products.map(mapProduct);

  }



  async getById(id:string)
  :Promise<ProductWithStore|null>{


    const product =
      await prisma.product.findUnique({

        where:{
          id
        },

        include:{
          store:true,
          category:true,
          images: true
        }

      });


    if(!product)
      return null;


    return mapProduct(product);

  }



  async getByStoreId(storeId:string)
  :Promise<ProductWithStore[]>{


    const products =
      await prisma.product.findMany({

        where:{
          storeId
        },

        include:{
          store:true,
          category:true,
          images: true
        },

        orderBy:{
          createdAt:"desc"
        }

      });


    return products.map(mapProduct);

  }



  async getPopular(limit=4)
  :Promise<ProductWithStore[]>{


    const products =
      await prisma.product.findMany({

        take:limit,

        include:{
          store:true,
          category:true,
          images: true
        },

        orderBy:{
          createdAt:"desc"
        }

      });


    return products.map(mapProduct);

  }



  async search(query:string)
  :Promise<ProductWithStore[]>{


    const q=query.trim();


    if(!q)
      return [];


    const products =
      await prisma.product.findMany({

        where:{
          OR:[
            {
              name:{
                contains:q,
                mode:"insensitive"
              }
            },
            {
              store:{
                name:{
                  contains:q,
                  mode:"insensitive"
                }
              }
            },
            {
              category:{
                name:{
                  contains:q,
                  mode:"insensitive"
                }
              }
            }
          ]
        },


        include:{
          store:true,
          category:true,
          images: true
        }

      });


    return products.map(mapProduct);

  }


  async create(input: CreateProductInput): Promise<ProductWithStore> {

    const product = await prisma.product.create({
      data: {
        name: input.name,
        description: input.description || null,
        price: input.price,
        storeId: input.storeId,
        categoryId: input.categoryId,
      },
      include: { store: true, category: true, images: true },
    });

    return mapProduct(product);

  }


  // update/delete usam updateMany/deleteMany com { id, storeId } no where —
  // não é possível um lojista alterar produto de outra loja mesmo que
  // manipule o id na URL/form, porque a query só afeta linha nenhuma se o
  // storeId não bater (count = 0 → devolve null/false).
  async update(id: string, storeId: string, input: UpdateProductInput): Promise<ProductWithStore | null> {

    const result = await prisma.product.updateMany({
      where: { id, storeId },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && { description: input.description || null }),
        ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
        ...(input.price !== undefined && { price: input.price }),
        ...(input.status !== undefined && { status: input.status }),
      },
    });

    if (result.count === 0) return null;

    return this.getById(id);

  }


  async delete(id: string, storeId: string): Promise<boolean> {

    const result = await prisma.product.deleteMany({ where: { id, storeId } });

    return result.count > 0;

  }

}