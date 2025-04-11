import Hero from "../components/shared/Hero"
import { ProductList } from "../components/products/ProductsList";
import '../styles/layout/layout.scss';

export const HomePage = () => {
  return (
    <>
      <Hero
        title='Display your Quirks'
        text='Whit our disassembled tech art'
      />
      <ProductList />
    </>
  )
}
