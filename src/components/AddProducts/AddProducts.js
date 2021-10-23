import React, { useRef } from "react";

const AddProducts = () => {
    const nameRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();

    const handleAddProducts = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const quantity = quantityRef.current.value;
        const newProduct = {name, price, quantity}
        console.log(newProduct)

        fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert("Successfully added the product")
                e.target.reset()
            }
            
        })
    };

    return (
        <div>
            <h1>Please add your Products</h1>
            <form onSubmit={handleAddProducts}>
                <input type="text" ref={nameRef} placeholder="Product Name" required/>
                <br />
                <input type="number" ref={priceRef} placeholder="Product Price" required/>
                <br />
                <input type="number" ref={quantityRef} placeholder="Product Quantity" required/>
                <br />
                <input type="submit" value="Add Product" />
            </form>
        </div>
    );
};

export default AddProducts;
