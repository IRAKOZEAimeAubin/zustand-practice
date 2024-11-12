import {useStore} from '@/store/store'
import {useShallow} from 'zustand/shallow'
import {Button} from '@/components/ui/button'
import {Minus, Plus} from 'lucide-react'
import {useEffect} from 'react'

type Props = {productId: string}

export function ChangeQtyButtons({productId}: Props) {
  const {getProductById, decrementQty, incrementQty, setTotal} = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decrementQty: state.decrementQty,
      incrementQty: state.incrementQty,
      setTotal: state.setTotal,
    })),
  )

  const product = getProductById(productId)

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc + item.price * item.quantity, 0),
        )
      },
      {fireImmediately: true},
    )
    return unSub
  }, [setTotal])

  return (
    <>
      {product && (
        <div className='flex gap-2 items-center'>
          <Button onClick={() => decrementQty(product.id)} size='icon'>
            <Minus />
          </Button>
          <span>{product.quantity}</span>
          <Button onClick={() => incrementQty(product.id)} size='icon'>
            <Plus />
          </Button>
        </div>
      )}
    </>
  )
}
