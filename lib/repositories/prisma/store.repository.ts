import { prisma } from "@/lib/prisma";
import type { Store } from "@/types";
import type { StoreRepository } from "../types";


function mapStore(store: any): Store {
  return {
    id: store.id,

    slug: store.slug,

    name: store.name,

    category:
      store.categories?.[0]?.category.name ??
      "Sem categoria",

    location: store.location,

    description: store.description,

    logoInitials: store.logoInitials,

    coverTone:
      store.coverTone as "pine" | "marigold" | "sand",

    verified: store.isVerified,

    whatsapp: store.whatsapp ?? undefined,

    instagram: store.instagram ?? undefined,

    openingHours: store.openingHours ?? undefined,

    featured: false,

    shopeeUrl: store.shopeeUrl ?? undefined,
    mercadoLivreUrl: store.mercadoLivreUrl ?? undefined,
    tiktokShopUrl: store.tiktokShopUrl ?? undefined,

  };
}



export class PrismaStoreRepository implements StoreRepository {
  async getStoreForUser(userId: string): Promise<Store | null> {
    const membership = await prisma.storeMember.findFirst({
      where: { userId },
      include: {
        store: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!membership) return null;

    return mapStore(membership.store);
  }

  async getBySlug(slug: string): Promise<Store | null> {

    const store = await prisma.store.findUnique({

      where: {
        slug
      },

      include: {
        categories: {
          include: {
            category: true
          }
        }
      }

    });

    if (!store)
      return null;

    return mapStore(store);

  }


  async getAll(): Promise<Store[]> {

    const stores = await prisma.store.findMany({

      where:{
        status:"APPROVED"
      },

      include:{
        categories:{
          include:{
            category:true
          }
        }
      },

      orderBy:{
        createdAt:"desc"
      }

    });


    return stores.map(mapStore);

  }



  async getById(id:string):Promise<Store|null>{


    const store = await prisma.store.findUnique({

      where:{
        id
      },

      include:{
        categories:{
          include:{
            category:true
          }
        }
      }

    });


    if(!store)
      return null;


    return mapStore(store);

  }



  async getFeatured(limit = 3): Promise<Store[]> {

    const stores = await prisma.store.findMany({

      where: {
        status: "APPROVED"
      },

      include: {
        categories: {
          include: {
            category: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      },

      take: limit

    });

    return stores.map(mapStore);

  }

}