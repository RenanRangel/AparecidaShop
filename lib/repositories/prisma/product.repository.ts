import { prisma } from "@/lib/prisma";
import type { ProductWithStore } from "@/types";
import type { ProductRepository } from "../types";


function mapProduct(product: any): ProductWithStore {

  return {
    id: product.id,

    name: product.name,

    storeId: product.storeId,

    price:
      product.price !== null
        ? product.price / 100
        : null,

    imageTone: "sand",

    category:
      product.category?.name ??
      "Sem categoria",

    storeName:
      product.store?.name ??
      "Loja não encontrada",
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
        }

      });


    return products.map(mapProduct);

  }

}