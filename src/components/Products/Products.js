import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState();
    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    // console.log(products);

    const handleDeleteProduct = (id) => {
        const proceed = window.confirm("Are you sure!!! you want to delete");
        if (proceed) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount) {
                        alert("Successfully Deleted");
                        const remainingProduct = products?.filter(
                            (product) => product._id !== id
                        );
                        setProducts(remainingProduct);
                    }
                });
        }
    };
    return (
        <div>
            <h2>Founded Products: {products?.length}</h2>
            <ul>
                {products?.map((product) => (
                    <li key={product._id}>
                        Name: {product.name} :: Price: {product.price} ::
                        Quantity: {product.quantity}
                        <Link to={`/products/update/${product._id}`}><button>Updated</button></Link>
                        <button
                            onClick={() => handleDeleteProduct(product._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
