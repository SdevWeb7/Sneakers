import { useContext, useEffect, useState } from "react";
import ProductImageSmall from '/images/image-product-1-thumbnail.jpg'
import ProductImage1 from '/images/image-product-1.jpg'
import ProductImage2 from '/images/image-product-2.jpg'
import ProductImage3 from '/images/image-product-3.jpg'
import ProductImage4 from '/images/image-product-4.jpg'
import CartIcon from '../svg/IconCart'
import IconMinus from '/images/icon-minus.svg'
import IconPlus from '/images/icon-plus.svg'
import CartContext from "../hooks/CartContext.jsx";
import Carrousel from "../components/Carrousel.jsx";


function Collections () {
   const {products, setProducts} = useContext(CartContext)
   const [product, setProduct] = useState({
      name: 'collections',
      imageSmall: ProductImageSmall,
      images: [ProductImage1, ProductImage2, ProductImage3, ProductImage4],
      price: 149.00,
      quantity: 0,
   })
   const [productCount, setProductCount] = useState(0)
   const [carrousel, setCarrousel] = useState(false)
   const [carrouselIndex, setCarrouselIndex] = useState(0)


   useEffect(() => {
      let existingProduct = products.find(p => p.name === product.name)

      if (existingProduct) {
         setProductCount(existingProduct.quantity)
      }
   }, [])

   const handleAddCart = () => {
      if (productCount > 0) {
         const updatedProducts = products.map(p => {
            if (p.name === product.name) {
               return { ...p, quantity: productCount };
            }
            return p;
         });

         if (!updatedProducts.some((p) => p.name === product.name)) {
            updatedProducts.push({ ...product, quantity: productCount });
         }
         setProducts(updatedProducts);
      }
   }

   const changeCarrousel = (index) => {
      setCarrouselIndex(index)
   }

   return (
      <>
         {carrousel && <Carrousel isOpenCarrousel={carrousel} setIsOpen={setCarrousel} imageSmall={product.imageSmall} images={product.images} />}

         <div className="product-image">
            <div className="product-image-large" onClick={() => setCarrousel(true)}>
               <img src={product.images[carrouselIndex]} alt="a" />
            </div>
            <div className="product-image-small">
               <div className={`image-small ${carrouselIndex === 0 ? 'selected-img' : ''}`}>
                  <img src={product.images[0]} className={'selected-img'} alt="a" onClick={() => changeCarrousel(0)} />
               </div>
               <div className={`image-small ${carrouselIndex === 1 ? 'selected-img' : ''}`}>
                  <img src={product.images[1]} className={'selected-img'} alt="a" onClick={() => changeCarrousel(1)} />
               </div>
               <div className={`image-small ${carrouselIndex === 2 ? 'selected-img' : ''}`}>
                  <img src={product.images[2]} className={'selected-img'} alt="a"  onClick={() => changeCarrousel(2)} />
               </div>
               <div className={`image-small ${carrouselIndex === 3 ? 'selected-img' : ''}`}>
                  <img src={product.images[3]} alt="a" onClick={() => changeCarrousel(3)} />
               </div>
            </div>
         </div>


         <div className="product-details">
            <p className={'company'}>SNEAKER COMPANY</p>
            <h1>Fall Limited Edition Sneakers</h1>
            <p className={'product-desc'}>These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.</p>

            <div className="product-price">
               <p>${product.price}.00</p>
               <p className={'solde'}>50%</p>
            </div>
            <p className={'old-price'}>${product.price * 2}.00</p>

            <div className="add-cart">
               <div className="product-count">
                  <img src={IconMinus} alt="a" onClick={() => setProductCount(v => v > 0 ? v - 1 : v)} />
                  <p className={'count-value'}>{productCount}</p>
                  <img src={IconPlus} alt="a" onClick={() => setProductCount(v => v + 1)} />
               </div>
               <div className="button-add-cart" onClick={handleAddCart} style={{backgroundColor: productCount > 0 ? 'hsl(26, 100%, 55%)' : 'hsl(25,92%,67%)'}}>
                  <CartIcon style={{transform: 'scale(.7) translateY(-1px)'}} />
                  <p>Add to Cart</p></div>
            </div>
         </div>
      </>
   )
}

export default Collections;