// import React from 'react'
// import new_collection from '../assets/new_collections'
// import Item from '../components/Item'

// const RelatedProducts = () => {
//   return (
//     <div className='w-full px-4' >
//       <div className="realatedProducts text-center my-6 ">
//         <h1 className='text-2xl font-semibold text-gray-600' >Related Products</h1>
//       </div>
//       <hr className='border-gray-300 my-4' />
//       <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6 ">
//         {new_collection.slice(0,3).map((item, i)=>{
//             return <Item key={i} id= {item.id} name= {item.name} image={item.image} newPrice = {item.new_price} oldPrice = {item.old_price} />  
//         })}
//       </div>
//     </div>
//   )
// }

// export default RelatedProducts

// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// // import all_products from '../assets/all_product';
// import { ShopContext } from '../Context/ShopContext';
// import Item from '../components/Item';

// const RelatedProducts = () => {
//     const { ProductId } = useParams();
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const {all_products} = useContext(ShopContext); 

//     useEffect(() => {
//         const findRelatedProducts = async () => {
//             console.log("Fetching related products for ID:", ProductId);

//             const product = all_products.find(p => p.id === parseInt(ProductId));
//             if (!product) {
//                 console.error("Product not found!");
//                 return;
//             }
//             console.log("Selected product:", product);

//             const currentColor = await getCenterColor(product.image);
//             if (!currentColor) {
//                 console.error("Failed to extract color.");
//                 return;
//             }
//             console.log("Extracted color for selected product:", currentColor);

//             let similarProducts = [];

//             for (const p of all_products) {
//                 if (p.id !== parseInt(ProductId)) {
//                     const productColor = await getCenterColor(p.image);
//                     if (productColor) {
//                         const distance = colorDistance(currentColor, productColor);
//                         similarProducts.push({ ...p, distance });
//                     }
//                 }
//             }

//             similarProducts.sort((a, b) => a.distance - b.distance);
//             setRelatedProducts(similarProducts.slice(0, 5));
//             console.log("Related products found:", similarProducts.slice(0, 5));
//         };

//         findRelatedProducts();
//     }, [ProductId]);

//     const getCenterColor = (imageSrc) => {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.crossOrigin = "Anonymous"; // Prevent CORS issues
//             img.src = imageSrc;

//             img.onload = () => {
//                 const canvas = document.createElement("canvas");
//                 const ctx = canvas.getContext("2d");
//                 canvas.width = img.width;
//                 canvas.height = img.height;

//                 ctx.drawImage(img, 0, 0, img.width, img.height);

//                 const centerX = Math.floor(img.width / 2);
//                 const centerY = Math.floor(img.height / 2);
//                 const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;

//                 const color = { r: pixelData[0], g: pixelData[1], b: pixelData[2] };
//                 console.log(`Extracted color from ${imageSrc}:`, color);
//                 resolve(color);
//             };

//             img.onerror = (error) => {
//                 console.error(`Error loading image: ${imageSrc}`, error);
//                 reject(error);
//             };
//         });
//     };

//     const colorDistance = (color1, color2) => {
//         return Math.sqrt(
//             Math.pow(color1.r - color2.r, 2) +
//             Math.pow(color1.g - color2.g, 2) +
//             Math.pow(color1.b - color2.b, 2)
//         );
//     };

//     return (
//         <div className='w-full px-4'>
//             <div className="relatedProducts text-center my-6">
//                 <h1 className='text-2xl font-semibold text-gray-600'>Related Products</h1>
//             </div>
//             <hr className='border-gray-300 my-4' />
//             <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6">
//                 {relatedProducts.length > 0 ? (
//                     relatedProducts.map((item, i) => (
//                         <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No related products found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RelatedProducts;



//Approach 1

// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';
// import Item from '../components/Item';

// const RelatedProducts = () => {
//     const { ProductId } = useParams();
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [metrics, setMetrics] = useState({ totalScanned: 0, relatedFound: 0, processingTime: 0 });
//     const { all_products } = useContext(ShopContext); 

//     useEffect(() => {
//         const findRelatedProducts = async () => {
//             const startTime = performance.now(); // Start timer

//             console.log("Fetching related products for ID:", ProductId);
//             const product = all_products.find(p => p.id === parseInt(ProductId));
//             if (!product) {
//                 console.error("Product not found!");
//                 return;
//             }
//             console.log("Selected product:", product);

//             const currentColor = await getCenterColor(product.image);
//             if (!currentColor) {
//                 console.error("Failed to extract color.");
//                 return;
//             }
//             console.log("Extracted color for selected product:", currentColor);

//             let similarProducts = [];
//             let scannedCount = 0;

//             for (const p of all_products) {
//                 scannedCount++;
//                 if (p.id !== parseInt(ProductId)) {
//                     const productColor = await getCenterColor(p.image);
//                     if (productColor) {
//                         const distance = colorDistance(currentColor, productColor);
//                         similarProducts.push({ ...p, distance });
//                     }
//                 }
//             }

//             similarProducts.sort((a, b) => a.distance - b.distance);
//             const selectedProducts = similarProducts.slice(0, 5);

//             setRelatedProducts(selectedProducts);
//             setMetrics({
//                 totalScanned: scannedCount,
//                 relatedFound: selectedProducts.length,
//                 processingTime: performance.now() - startTime, // Calculate processing time
//             });

//             console.log("Related products found:", selectedProducts);
//         };

//         findRelatedProducts();
//     }, [ProductId]);

//     const getCenterColor = (imageSrc) => {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.crossOrigin = "Anonymous";
//             img.src = imageSrc;

//             img.onload = () => {
//                 const canvas = document.createElement("canvas");
//                 const ctx = canvas.getContext("2d");
//                 canvas.width = img.width;
//                 canvas.height = img.height;

//                 ctx.drawImage(img, 0, 0, img.width, img.height);

//                 const centerX = Math.floor(img.width / 2);
//                 const centerY = Math.floor(img.height / 2);
//                 const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;

//                 const color = { r: pixelData[0], g: pixelData[1], b: pixelData[2] };
//                 console.log(`Extracted color from ${imageSrc}:`, color);
//                 resolve(color);
//             };

//             img.onerror = (error) => {
//                 console.error(`Error loading image: ${imageSrc}`, error);
//                 reject(error);
//             };
//         });
//     };

//     const colorDistance = (color1, color2) => {
//         return Math.sqrt(
//             Math.pow(color1.r - color2.r, 2) +
//             Math.pow(color1.g - color2.g, 2) +
//             Math.pow(color1.b - color2.b, 2)
//         );
//     };

//     return (
//         <div className='w-full px-4'>
//             <div className="relatedProducts text-center my-6">
//                 <h1 className='text-2xl font-semibold text-gray-600'>Related Products</h1>
//             </div>
//             <hr className='border-gray-300 my-4' />

//             {/* Metrics Section */}
//             <div className="metrics text-center my-4 p-4 bg-gray-100 rounded-md">
//                 <p><strong>Total Products Scanned:</strong> {metrics.totalScanned}</p>
//                 <p><strong>Related Products Found:</strong> {metrics.relatedFound}</p>
//                 <p><strong>Processing Time:</strong> {metrics.processingTime.toFixed(2)} ms</p>
//             </div>

//             <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6">
//                 {relatedProducts.length > 0 ? (
//                     relatedProducts.map((item, i) => (
//                         <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No related products found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RelatedProducts;

//Approach 2

import React, { useState, useEffect, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../components/Item';

const RelatedProducts = () => {
    const { ProductId } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [metrics, setMetrics] = useState({
        totalProducts: 0,
        numClusters: 3,
        clusterDistribution: [],
        avgColorDistance: 0
    });
    
    const { all_products } = useContext(ShopContext);

    useEffect(() => {
        const findRelatedProducts = async () => {
            console.log("Fetching related products for ID:", ProductId);

            const product = all_products.find(p => p.id === parseInt(ProductId));
            if (!product) {
                console.error("Product not found!");
                return;
            }

            const colorData = await Promise.all(
                all_products.map(async (p) => ({
                    id: p.id,
                    color: await getCenterColor(p.image)
                }))
            );

            const colorTensor = tf.tensor(colorData.map(c => [c.color.r, c.color.g, c.color.b]));
            const k = 3; // Number of clusters
            const { centroids, assignments } = kMeans(colorTensor, k);

            const selectedColor = await getCenterColor(product.image);
            const selectedCluster = findClosestCluster(selectedColor, centroids);

            let similarProducts = [];
            let colorDistances = [];

            colorData.forEach((p, index) => {
                if (assignments[index] === selectedCluster && p.id !== parseInt(ProductId)) {
                    const dist = colorDistance(selectedColor, p.color);
                    similarProducts.push({ ...p, distance: dist });
                    colorDistances.push(dist);
                }
            });

            similarProducts.sort((a, b) => a.distance - b.distance);
            const topProducts = similarProducts.slice(0, 6).map(p => all_products.find(prod => prod.id === p.id));

            setRelatedProducts(topProducts);

            const clusterSizes = new Array(k).fill(0);
            assignments.forEach(c => clusterSizes[c]++);

            setMetrics({
                totalProducts: all_products.length,
                numClusters: k,
                clusterDistribution: clusterSizes,
                avgColorDistance: colorDistances.length > 0
                    ? (colorDistances.reduce((sum, d) => sum + d, 0) / colorDistances.length).toFixed(2)
                    : 0
            });

            console.log("Related products found:", topProducts);
        };

        findRelatedProducts();
    }, [ProductId]);

    const getCenterColor = (imageSrc) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = imageSrc;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height);
                const centerX = Math.floor(img.width / 2);
                const centerY = Math.floor(img.height / 2);
                const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;

                resolve({ r: pixelData[0], g: pixelData[1], b: pixelData[2] });
            };

            img.onerror = (error) => {
                console.error(`Error loading image: ${imageSrc}`, error);
                reject(error);
            };
        });
    };

    const colorDistance = (color1, color2) => {
        return Math.sqrt(
            Math.pow(color1.r - color2.r, 2) +
            Math.pow(color1.g - color2.g, 2) +
            Math.pow(color1.b - color2.b, 2)
        );
    };

    const kMeans = (data, k) => {
        const n = data.shape[0];
        let centroids = data.slice([0, 0], [k, -1]).clone();
        let assignments = new Array(n).fill(0);

        for (let i = 0; i < 10; i++) {
            const distances = tf.sub(tf.expandDims(data, 1), tf.expandDims(centroids, 0))
                .square()
                .sum(2);

            assignments = distances.argMin(1).arraySync();
            const newCentroids = [];

            for (let j = 0; j < k; j++) {
                const clusterPoints = data.gather(assignments.map((a, index) => (a === j ? index : -1)).filter(i => i !== -1));
                newCentroids.push(clusterPoints.mean(0).arraySync());
            }

            centroids = tf.tensor(newCentroids);
        }

        return { centroids: centroids.arraySync(), assignments };
    };

    const findClosestCluster = (color, centroids) => {
        let minDist = Infinity;
        let clusterIndex = -1;

        centroids.forEach((c, index) => {
            const dist = Math.sqrt(
                Math.pow(color.r - c[0], 2) +
                Math.pow(color.g - c[1], 2) +
                Math.pow(color.b - c[2], 2)
            );

            if (dist < minDist) {
                minDist = dist;
                clusterIndex = index;
            }
        });

        return clusterIndex;
    };

    return (
        <div className='w-full px-4'>
            <div className="relatedProducts text-center my-6">
                <h1 className='text-2xl font-semibold text-gray-600'>Related Products</h1>
            </div>
            <hr className='border-gray-300 my-4' />

            {/* Metrics Section */}
            <div className="metrics grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <h2 className="text-lg font-bold text-gray-600">Total Products</h2>
                    <p className="text-xl font-semibold">{metrics.totalProducts}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <h2 className="text-lg font-bold text-gray-600">Clusters (k)</h2>
                    <p className="text-xl font-semibold">{metrics.numClusters}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <h2 className="text-lg font-bold text-gray-600">Avg Color Distance</h2>
                    <p className="text-xl font-semibold">{metrics.avgColorDistance}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <h2 className="text-lg font-bold text-gray-600">Cluster Distribution</h2>
                    <p className="text-lg">{metrics.clusterDistribution.join(', ')}</p>
                </div>
            </div>

            {/* Related Products Grid */}
            <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((item, i) => (
                        <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No related products found.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;



