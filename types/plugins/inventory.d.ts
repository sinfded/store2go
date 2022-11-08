import '@nuxt/types'

export type ProductData = {
  _id: string
  _rev: string
  sku: string
  name: string
  variant: string
  stock: number
  price: ProductPrice
}

type ProductPrice = {
  retail: number
  wholesale: number
}

type Response = {
  id: string
  ok: boolean
  rev: string
}

export interface InventoryPlugin {
  products: NotWellDefinedObject[]
  sortedProducts: ProductData[]

  createProduct(productData: ProductData): Promise<Response>
  updateProduct(productData: ProductData): Promise<Response>
  getProduct(productId: string): Promise<ProductData>
  getAllProducts(): void
}
