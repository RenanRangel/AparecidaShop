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
    externalUrl: product.externalUrl ?? undefined,
    storeShopeeUrl: product.store?.shopeeUrl ?? undefined,
    storeMercadoLivreUrl: product.store?.mercadoLivreUrl ?? undefined,
    storeTiktokShopUrl: product.store?.tiktokShopUrl ?? undefined,
    storeLogoUrl: product.store?.logoUrl ?? undefined,
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


  // Feed público: só produto ATIVO de loja APROVADA. Enquanto a loja está
  // PENDING, os produtos que o lojista já cadastrou ficam "invisíveis" pra
  // qualquer lugar público — e aparecem automaticamente no instante em que
  // um admin aprova a loja, sem precisar de nenhuma ação extra.
  async getAll(): Promise<ProductWithStore[]> {

    const products =
      await prisma.product.findMany({

        where: {
          status: 'ACTIVE',
          store: { status: 'APPROVED' },
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



  // Sem filtro de status de propósito: usado pelo painel do lojista (ver o
  // próprio produto antes da loja ser aprovada) e pela página pública do
  // produto (link já compartilhado continua abrindo).
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



  // Sem filtro de status de propósito: é usado pela página da própria loja
  // (que já checa se a loja existe) e pelo painel do lojista.
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

        where: {
          status: 'ACTIVE',
          store: { status: 'APPROVED' },
        },

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

    /**
   * Um produto aleatório por loja — garante diversidade na home (nunca
   * duas fotos da mesma loja seguidas). Embaralha em memória (Fisher-Yates)
   * e pega o primeiro produto de cada loja distinta. Simples e suficiente
   * pro volume atual; se o catálogo crescer muito, migrar pra amostragem
   * via SQL (ORDER BY random()) é o próximo passo.
   */
    async getRandomOnePerStore(limit = 8): Promise<ProductWithStore[]> {

      const products = await prisma.product.findMany({
        where: {
          status: 'ACTIVE',
          store: { status: 'APPROVED' },
        },
        include: { store: true, category: true, images: true },
      });
  
      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
      }
  
      const seenStores = new Set<string>();
      const picked: typeof products = [];
  
      for (const product of products) {
        if (seenStores.has(product.storeId)) continue;
        seenStores.add(product.storeId);
        picked.push(product);
        if (picked.length >= limit) break;
      }
  
      return picked.map(mapProduct);
  
    }



  async search(query:string)
  :Promise<ProductWithStore[]>{


    const q=query.trim();


    if(!q)
      return [];


    const products =
      await prisma.product.findMany({

        where:{
          status: 'ACTIVE',
          store: { status: 'APPROVED' },
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
        externalUrl: input.externalUrl || null,
      },
      include: { store: true, category: true, images: true },
    });

    return mapProduct(product);

  }


  async update(id: string, storeId: string, input: UpdateProductInput): Promise<ProductWithStore | null> {

    const result = await prisma.product.updateMany({
      where: { id, storeId },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && { description: input.description || null }),
        ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
        ...(input.price !== undefined && { price: input.price }),
        ...(input.status !== undefined && { status: input.status }),
        ...(input.externalUrl !== undefined && { externalUrl: input.externalUrl || null }),
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