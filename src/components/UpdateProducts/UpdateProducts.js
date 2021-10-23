import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateProducts = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, []);

    const handleNameChange = (e) => {
        const updateName = {name: e.target.value, price: product.price, quantity: product.quantity}
        setProduct(updateName)
    }

    const handlePriceChange = e => {
        const updatePrice = {...product}
        updatePrice.price = e.target.value;
        setProduct(updatePrice)
    }

    const handleQuantityChange = e => {
        const updateQuantity = {...product}
        updateQuantity.quantity = e.target.value;
        setProduct(updateQuantity)
    }

    const handleUpdate = e => {
        e.preventDefault()
        fetch(`http://localhost:5000/products/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(product),
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert("Updated successfully")
                setProduct({})
            }
        })
    }

    return (
        <div>
            <h2>Update Product Name: {product?.name} :: Price: {product?.price} Quantity: {product?.quantity}</h2>
            <small>{product?._id}</small>
            <form onSubmit={handleUpdate}>
                <input onChange={handleNameChange} type="text" value={product?.name || ""} required/>
                <br />
                <input onChange={handlePriceChange} type="number" value={product?.price || ""} required/>
                <br />
                <input onChange={handleQuantityChange} type="number" value={product?.quantity || ""} required/>
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateProducts;
