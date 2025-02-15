import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Home/Header";
import Fragrance from "../Fragrance/Fragrance";


const Cart = () => {
  const [cart, setCart] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastFragrance = currentPage * itemsPerPage;
  const indexOfFirstFragrance = indexOfLastFragrance - itemsPerPage;
  const currentCart = cart.slice(indexOfFirstFragrance, indexOfLastFragrance);
  const totalPages = Math.ceil(cart.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="body">
      <Header />
      <h1 className="title">Your Cart</h1>
      <div id="CardGlobal">
        {currentCart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          currentCart.map((fragrance) => (
            <div key={fragrance.id}>
              <Fragrance fragrance={fragrance} />
              <button
                onClick={() => handleRemove(fragrance.id)}
                className="RemoveButton"
              >
                Remove from Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Prev
        </button>
        <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cart;
