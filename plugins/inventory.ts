import PouchDB from 'pouchdb'
import PouchDBAuthentication from 'pouchdb-authentication'
import { Plugin, Context } from '@nuxt/types'
import { ProductData } from '~/types/plugins/inventory'

PouchDB.plugin(PouchDBAuthentication)

const db = new PouchDB('http://localhost:3001/store2go', {
  skip_setup: true,
})
const local = new PouchDB('store2go_inventory_local')
export class InventoryPlugin {
  products: NotWellDefinedObject[] = []

  constructor(private context: Context) {}

  get sortedProducts(): ProductData[] {
    return this.products.map((product: NotWellDefinedObject) => {
      return product.doc
    })
  }

  async createProduct(productData: ProductData) {
    const data = {
      sku: productData.sku,
      name: productData.name,
      variant: productData.variant,
      stock: productData.stock * 1,
      price: {
        retail: productData.price.retail * 1,
        wholesale: productData.price.wholesale * 1,
      },
    }
    const newProduct = await db.post(data)

    return newProduct
  }

  async updateProduct(productData: ProductData) {
    console.log(productData)
    const newProduct = await db.put(productData)

    return newProduct
  }

  async getProduct(productId: string) {
    const product = await db.get(productId)

    return product
  }

  getAllProducts() {
    try {
      db.allDocs({ include_docs: true }).then(
        (result: NotWellDefinedObject) => {
          this.products = result.rows
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
}

const inventoryPlugin: Plugin = function (context, inject) {
  inject('inventory', new InventoryPlugin(context))
}

export default inventoryPlugin
