import Hero from "../components/shared/Hero"
import { ProductList } from "../components/products/ProductsList";
import '../styles/layout/layout.scss';

export const HomePage = () => {
  return (
    <>
      <Hero
        text='Be proud of your Quirk'
      />
      <section className="post-hero-content-wrapper">
      </section>
      <ProductList />
    </>
  )
}
