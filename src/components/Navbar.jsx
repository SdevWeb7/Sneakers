import React, { useContext, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import Logo from '/images/logo.svg'
import Cart from '../svg/IconCart'
import Avatar from '/images/image-avatar.png'
import CartModal from "./CartModal.jsx";
import { debounce } from "./debounce.jsx";
import IconBurger from "../svg/IconBurger";
import Menu from "./Menu.jsx";
import { AnimatePresence } from "framer-motion";
import CartContext from "../hooks/CartContext.jsx";


function Navbar () {

   const [isOpenCart, setIsOpenCart] = useState(false)
   const [isOpenMenu, setIsOpenMenu] = useState(false)
   const [windowWidth, setWindowWidth] = useState(window.innerWidth)
   const {products} = useContext(CartContext)

   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth)
      };
      const debounceResize = debounce(handleResize, 15);
      window.addEventListener('resize', debounceResize);

      return () => {
         window.removeEventListener('resize', debounceResize);
      };
   }, [])

   const handleOpenCart = () => {
      setIsOpenCart(v => !v)
   }
   const handleMenu = () => {
      setIsOpenMenu(v => !v)
   }

   return (
      <header className={'header'}>
         <AnimatePresence>
         {isOpenMenu && <Menu isOpenMenu={isOpenMenu} handleMenu={handleMenu} />}
         </AnimatePresence>
         {windowWidth <= 590 && <IconBurger className={'burger'} onClick={handleMenu} alt="a" />}

         <nav className={'navbar'}>
            {windowWidth > 312 && <NavLink className={'logo'} to={'#'} style={{borderColor: 'transparent'}}><img src={Logo} alt=""/></NavLink>}
            {windowWidth >= 590 && <><NavLink to={'/'}>Collections</NavLink>
               <NavLink to={'/women'}>Women</NavLink>
               <NavLink to={'/men'}>Men</NavLink></>}
         </nav>

         <div className="cart-avatar">
            {products.length > 0 && <div className="number-product">{products.length}</div>}
            <Cart className={"cart-img"} alt="a" onClick={handleOpenCart} />
            <img className={'avatar-img'} src={Avatar} alt="a" width={30} height={30} />
            {isOpenCart && <CartModal setIsOpenModal={setIsOpenCart} isOpenModal={isOpenCart} />}
         </div>
      </header>
   )
}

export default Navbar;