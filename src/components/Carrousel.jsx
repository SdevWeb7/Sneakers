import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import IconClose from "../svg/IconClose";
import IconPrevious from '../svg/IconPrevious'
import IconNext from '../svg/IconNext'

const Carrousel = ({isOpenCarrousel, setIsOpen, imageSmall, images}) => {

   const [index, setIndex] = useState(0)
   const previousRef = useRef(null)
   const nextRef = useRef(null)


   if (!isOpenCarrousel) {
      return null
   }

   const closeCarrousel = (e) => {
      let target = e.target
      if (e.target.tagName !== 'IMG' && !nextRef.current.contains(e.target) && !previousRef.current.contains(e.target)) {
         setIsOpen(false)
      }
   }
   const changeCarrousel = (index) => {
      setIndex(index)
   }

   return ReactDOM.createPortal(
      <div className="modal-carrousel" onClick={closeCarrousel}>
         <div className="carrousel" onClick={closeCarrousel}>

            <div className={'close-carrousel'} onClick={closeCarrousel}>
               <IconClose />
            </div>

            <div className="content-carrousel">
               <img src={images[index]} alt="a" />
               <div className="next" ref={nextRef} onClick={() => changeCarrousel(index < 3 ? index + 1 : 0)}>
                  <IconNext />
               </div>
               <div className="previous" ref={previousRef} onClick={() => changeCarrousel(index > 0 ? index - 1 : 3)}>
                  <IconPrevious />
               </div>

               <div className="thumbnails">
                  <div className={index === 0 ? 'selected-img' : ''}>
                     <img className={index === 0 ? 'selected-img' : ''} src={images[0]} alt="a" onClick={() => changeCarrousel(0)} />
                  </div>


                  <div className={index === 1 ? 'selected-img' : ''}>
                     <img className={index === 1 ? 'selected-img' : ''} src={images[1]} alt="a" onClick={() => changeCarrousel(1)} />
                  </div>


                  <div className={index === 2 ? 'selected-img' : ''}>
                     <img className={index === 2 ? 'selected-img' : ''} src={images[2]} alt="a" onClick={() => changeCarrousel(2)} />
                  </div>


                  <div className={index === 3 ? 'selected-img' : ''}>
                     <img className={index === 3 ? 'selected-img' : ''} src={images[3]} alt="a" onClick={() => changeCarrousel(3)} />
                  </div>
               </div>
            </div>

         </div>
      </div>,
      document.body
   );
};

export default Carrousel;