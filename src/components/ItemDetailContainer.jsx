// src/components/ItemDetailContainer.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import mockFetch from '../mocks/asyncMock';
import { toast } from 'react-toastify'; // Importar Toastify
import '../styles/ItemDetailContainer.css'; // Importar estilos

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart(); 

    useEffect(() => {
        const fetchItem = async () => {
            const items = await mockFetch();
            const foundItem = items.find(item => item.id === parseInt(id));
            setItem(foundItem);
            setLoading(false);
        };

        fetchItem();
    }, [id]);

    const handleQuantityChange = (event) => {
        const value = Math.max(1, parseInt(event.target.value) || 1); // Asegurarse de que la cantidad sea al menos 1
        setQuantity(value);
    };

    const handleAddToCart = () => {
        if (item) {
            const itemWithQuantity = { ...item, quantity }; // Añadir la cantidad al objeto del producto
            addToCart(itemWithQuantity); // Añadir el producto al carrito
            toast.success(`${item.title} agregado al carrito!`, { autoClose: 2000 }); // Mostrar el mensaje con Toastify
        }
    };

    if (loading) return <p>Cargando...</p>;

    if (!item) return <p>Producto no encontrado.</p>;

    return (
        <div className="item-detail-container">
            <div className="item-card">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Precio: ${item.price.toFixed(2)}</p> {/* Cambiado a item.price */}
                <img src={item.imgSrc} alt={item.title} />
                
                <div className="quantity-container">
                    <button className="quantity-button" onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
                    <input
                        type="number"
                        className="quantity-input"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <button className="quantity-button" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                
                <button onClick={handleAddToCart}>Añadir al carrito</button>
            </div>
        </div>
    );
};

export default ItemDetailContainer;
