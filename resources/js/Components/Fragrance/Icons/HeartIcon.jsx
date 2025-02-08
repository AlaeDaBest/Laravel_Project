import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const HeartIcon = () => {
  const [liked, setLiked] = useState(false);
  function like(){
    setLiked(!liked)
  }
  return (
    <div onClick={like}>
      {liked ? (
        <AiFillHeart color="black" size={24} />
      ) : (
        <AiOutlineHeart color="black" size={24} />
      )}
    </div>
  );
};

export default HeartIcon;
