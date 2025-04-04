// import React, { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import dropdown_icon from '../assets/dropdown_icon.png'
// import Item from '../components/Item'
// import Footer from '../components/Footer'

// const ShopCategory = (props) => {
//   const {all_products} = useContext(ShopContext)
//   return (
//     <div className='banner'>
//       <div>
//       <img src={props.banner} alt="banner" />
//       </div>
//       <div className="itemSort m-4">
//         <p>
//           <span>
//             Showing 1-12 items 
//           </span>
//           Out of 36 prodcuts
//         </p>
//       </div>
//       <div className='m-4'>
//         Sort by <img src={dropdown_icon} alt="" />
//       </div>
//       <div className="items grid-cols-3">
//         {all_products.map((item, i)=>{
//           if(props.category==item.category){
//             return <Item key={i} id= {item.id} name={item.name} image = {item.image} oldPrice = {item.old_price} newPrice = {item.new_price} />
//           }
//           else{
//             return null;
//           }
//         })}
//       </div>
//       <Footer/>
//     </div>
    
//   )
// }

// export default ShopCategory

import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../assets/dropdown_icon.png';
import Item from '../components/Item';
import Footer from '../components/Footer';

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  const itemsPerPage = 12; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products based on category
  const filteredProducts = all_products.filter(item => item.category === props.category);

  // Calculate the indexes for slicing the array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Banner Section */}
      <div className="w-full">
        <img src={props.banner} alt="banner" className="w-full h-[300px] object-cover" />
      </div>

      {/* Sorting Section */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-100">
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}
          </span> 
          &nbsp;out of {filteredProducts.length} products
        </p>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-gray-700">Sort by</span>
          <img src={dropdown_icon} alt="Sort" className="w-4 h-4" />
        </div>
      </div>

      {/* Display Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {currentItems.map((item) => (
          <Item 
            key={item.id} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            oldPrice={item.old_price} 
            newPrice={item.new_price} 
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 py-6">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1} 
          className={`px-4 py-2 bg-gray-200 rounded-lg text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}
        </span>
        <button 
          onClick={nextPage} 
          disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)} 
          className={`px-4 py-2 bg-gray-200 rounded-lg text-gray-700 ${currentPage === Math.ceil(filteredProducts.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShopCategory;


