import { motion } from "framer-motion";
import IconClose from "../svg/IconClose.jsx";
import { NavLink } from "react-router-dom";
import React, { useEffect, useRef } from "react";

function Menu ({isOpenMenu, handleMenu}) {

   const menuRef = useRef(null)
   const menuVariant = {
      hidden: {x: '-300px'},
      visible: {x: 0}
   }

   useEffect(() => {
      setTimeout(() => {
         document.addEventListener('click', handleOpen)
      }, 100)

      return () => {
         document.removeEventListener('click', handleOpen)
      }
   }, [])

   const handleOpen = (e) => {
      if (!menuRef.current.contains(e.target)) {
         handleMenu()
      }
   }

   return (
         isOpenMenu ? <motion.div ref={menuRef} animate={isOpenMenu ? 'visible' : 'hidden'} initial={'hidden'} exit={'hidden'} variants={menuVariant} transition={{duration: .5, type: 'tween', ease: "easeInOut"}} className="menu">
            <IconClose className={'icon-close'} onClick={handleMenu} />
            <NavLink to={'/'} onClick={() => handleMenu()}>Collections</NavLink>
            <NavLink to={'/women'} onClick={() => handleMenu()}>Women</NavLink>
            <NavLink to={'/men'} onClick={() => handleMenu()}>Men</NavLink>
         </motion.div> : <></>
   )
}

export default Menu;