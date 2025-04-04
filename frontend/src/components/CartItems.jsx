import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'

const CartItems = () => {
    const { all_products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    const navigate = useNavigate();

    const handleCheckout = async () => {
        const authToken = localStorage.getItem("auth-token");
    
        if (!authToken) {
            navigate("/signup");
            return;
        }

    // console.log("🛒 Cart Items Before Sending:", cartItems); 
        
    //     const validCartItems = Object.fromEntries(
    //         Object.entries(cartItems).filter(([productId, quantity]) => 
    //             productId.length === 24 && quantity > 0 // ✅ Only allow valid MongoDB ObjectId (24 characters)
    //         )
    //     );

    //     if (Object.keys(validCartItems).length === 0) {
    //         alert("No valid products in the cart.");
    //         return;
    //     }
    
    //     console.log("Sending valid cart items:", validCartItems);
    // console.log(validCartItems)

   

    console.log(cartItems);
    const filteredCartItems = Object.fromEntries(
        Object.entries(cartItems).filter(([id, quantity]) => quantity > 0)
    );

    // const formattedCartItems = Object.fromEntries(
    //     Object.entries(filteredCartItems).map(([key, value]) => [Number(key), value]) // Convert keys to numbers
    // );

    const formattedCartItems = Object.fromEntries(
            Object.entries(filteredCartItems)// Convert keys to numbers
        );
        
    console.log("✅ Sending filtered cart items:", filteredCartItems);
    console.log(formattedCartItems)
    console.log("🛒 Final Cart Data Being Sent:", JSON.stringify(formattedCartItems, null, 2));

    
    
        try {
            const response = await fetch("http://localhost:3000/create-order", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                },
                body: JSON.stringify(formattedCartItems),
            });
    
            const data = await response.json();
            console.log("Checkout Response:", data); // ✅ Debugging log
    
            if (data.success) {
                navigate("/yourorders");
            } else {
                alert("Failed to place order: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Checkout error:", error); // ✅ Log full error
            alert("An error occurred while placing the order. Check the console for details.");
        }
    };
    

    return (
        <div className='cartitems p-4 sm:m-10' >
            <div className="cartitemsFormat grid grid-cols-6 justify-items-center gap-4 py-2 border-b font-semibold">
                <p>Products</p>
                <p className='sm:pl-40' >Title</p>
                <p className='sm:pl-40' >Price</p>
                <p className='sm:pl-20' >Quantity</p>
                <p className='sm:pl-10' >Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_products.map((e) => {
                if (cartItems[e.id] > 0) {
                        return (
                    <div key={e.id}>
                    <div className="individual-item flex justify-around ">
                        <img className='w-24 h-auto object-contain' src={e.image} alt={e.name} />
                        <p className='overflow-clip w-24 text-center' >{e.name}</p>
                        <p className='text-gray-700 font-medium' >${e.new_price}</p>
                        <p>{cartItems[e.id]}</p>
                        <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                        <img className='h-4 w-4 cursor-pointer hover:opacity-70 mt-5' onClick={() => removeFromCart(e.id)} src={remove_icon} alt="Remove" />
                    </div>
                    <hr />
                    </div>
                );
                }
                return null;
            })}
            <div className="cartTotal bg-gray-100 p-6 rounded-lg shadow-md text-center max-w-sm mx-auto mt-6">
                <h1 className="text-lg font-semibold">Subtotal: <span className="text-gray-700">${getTotalCartAmount()}</span></h1>
                <p className="text-gray-600 mt-1">Shipping Charges: <span className="font-medium text-green-600">Free</span></p>
                <hr className="my-2 border-gray-300" />
                <p className="text-xl font-semibold">Total: <span className="text-gray-800">${getTotalCartAmount()}</span></p>
            </div>
            <div> 
                <button onClick={handleCheckout} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                     PROCEED TO CHECKOUT
                </button>
            </div>
        </div>
    )
}

export default CartItems
