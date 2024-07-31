import React from 'react'
import { Link } from 'react-router-dom'
import Image from './Image'
import FilterBox from './Filter'

const Productitems = () => {

var data=JSON.parse(localStorage.getItem("productsdata"))

console.log(data)
  return (
    <>
      <div className='flex px-[40px] gap-[30px] py-[13px]'>
        <div className='w-[18vw] fliter-box'><h1 className='font-bold text-[20px] '>FILTER</h1>
        <FilterBox />
        
        </div>
        <div>
<h1 className='font-bold text-[24px]'>Results</h1>
<div className='items-box'>
    {
        data.data.products.map((item)=>{
            return(
                <>
                <div  key={item.asin}>

<Link className="itemsall" to={`/products/${item.asin}`}>
<div className=' '><Image src={item.product_photo} alt={item.product_title}  className="h-44 "  /></div>
<p className='overflow-hidden h-[11vh] w-[100%] text-center'>{item.product_title}</p>
</Link>
                    
                    </div>
                
                </>
            )
        })
    }

</div>
        </div>
      </div>
    </>
  )
}

export default Productitems
