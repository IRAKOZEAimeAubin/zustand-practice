import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'
import {PRODUCTS_DATA as productsData} from '@/lib/mockData'
import {Button} from '@/components/ui/button'
import {useStore} from '@/store/store'
import {ChangeQtyButtons} from './components/ChangeQtyButtons'
import {Cart} from '@/components/Cart'
import {User} from './components/User'

export default function App() {
  const addProduct = useStore((state) => state.addProduct)
  const cartProducts = useStore((state) => state.products)

  return (
    <main className='space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2'>
      <div className='flex justify-between'>
        <User />
        <Cart />
      </div>
      <h1 className='text-2xl text-foreground font-bold'>Products</h1>
      <div className='space-y-2'>
        {productsData.map((product) => (
          <Card key={product.id}>
            <CardHeader className='font-semibold'>{product.title}</CardHeader>
            <CardContent className='tracking-wider font-medium'>
              {product.price}$
            </CardContent>
            <CardFooter>
              {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQtyButtons productId={product.id} />
              ) : (
                <Button onClick={() => addProduct(product)}>Add To Card</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
