import React, { useState } from "react";
import HeartIcon from "./Icons/HeartIcon";
import CartIcon from "./Icons/CartIcon";
import TrashIcon from "./Icons/TrashIcon";
import EditIcon from "./Icons/EditIcon";
import axios from 'axios';

const Fragrance = (props) => {
  const [hidden, setHidden] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const AddToCart = async (fragranceId) => {
    try {
      const response = await axios.post('/cart', {
        fragrance_id: fragranceId,
        quantity: 1,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Il y a eu un problème lors de l'ajout au panier:", error);
    }
  };
  const AddToFavorite = async (fragranceId) => {
    try {
      if (isFavorite) {
        await axios.delete(`/favorites/${fragranceId}`);
      } else {
        await axios.post("/favorites", { fragrance_id: fragranceId });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erreur favoris:", error);
    }
  };

  const [isEditing, setIsEditing] = useState(false); 

  return (
    <section className="Card" onClick={() => setHidden(!hidden)}>
      <section className="ImageSection">
        <article id="Icons">
          <HeartIcon  isFavorite={isFavorite}
            onClick={(e) => {
              e.stopPropagation();
              AddToFavorite(props.fragrance.id);
            }} />
          <CartIcon onClick={() => AddToCart(props.fragrance.id)} />
        </article>
        <img src={props.fragrance.image} width="200px" height="150px" alt="" />
      </section>
      <section className={`BookInfo ${hidden ? 'hidden' : ''}`} hidden={hidden}>
        <section>
          <h3>{props.fragrance.name}</h3>
          <p><span>Brand:</span>{props.fragrance.brand?.name}</p>
          <p><span>Release Date:</span> {props.fragrance.release_date}</p>
          <p><span>Genre:</span>{props.fragrance.genre}</p>
          <p><span>Sex:</span> {props.fragrance.sex}</p>
          <p><span>Price:</span> {props.fragrance.price}</p>
          <div>
            <TrashIcon id={props.fragrance.id} setFragrances={props.setFragrances} fragrances={props.fragrances} />
            <EditIcon id={props.fragrance.id} setIsEditing={setIsEditing} />
          </div>
        </section>
      </section>
    </section>
  );
};

export default Fragrance;
