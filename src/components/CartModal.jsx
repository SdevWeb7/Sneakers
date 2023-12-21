import React, { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../hooks/CartContext.jsx";
import DeleteCart from '/images/icon-delete.svg'
import ModalSuccess from "./ModalSuccess.jsx";

function CartModal ({setIsOpenModal, isOpenModal}) {

   const {products, setProducts} = useContext(CartContext)
   const modalRef = useRef(null)
   const [modalSuccess, setModalSuccess] = useState(false)

   useEffect(() => {
      setTimeout(() => {
         document.addEventListener('click', handleModal)
      }, 100)

      return () => {
         document.removeEventListener('click', handleModal)
      }
   }, [])

   const handleModal = (e) => {
      if (modalRef && !modalRef.current.contains(e.target) && isOpenModal) {
         setIsOpenModal(false)
      }
   }

   const handleCheckout = () => {
      setModalSuccess(true)
      setTimeout(() => {
         setModalSuccess(false)
      }, 3000)
   };

   const handleDelete = (name) => {
      setProducts(prevProducts => {
         return prevProducts.filter(p => p.name !== name)
      })
   };
   return (
      <>
         {products.length > 0 ?
            <div ref={modalRef} className={'cart-modal'}>
               {products.map(p => <div key={p.name} className="product-cart">
                  <div className="cart-desc">
                     <img src={p.imageSmall} alt="a" />
                     <p>{p.name} ${p.price}.00 x {p.quantity} <span className="total-cart"> ${p.quantity * p.price}.00</span></p>
                     <img src={DeleteCart} alt="a" className={'remove-product'} onClick={() => handleDelete(p.name)} />
                  </div>
               </div>)}
               <div className="checkout-cart" onClick={handleCheckout}>Checkout</div>
               {modalSuccess &&<ModalSuccess />}
            </div> :
            <div ref={modalRef} className="cart-modal">
               <h3>Cart</h3>
               <p>Your cart is empty.</p>
            </div>}
      </>
   )
}

export default CartModal;