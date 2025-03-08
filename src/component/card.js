import React, { useState } from "react";
import Modal from "./modal";

const Card = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  if (book.cover_i && book.title && book.author_name) {
    return (
      <>
        <div className="card" onClick={() => setShowModal(true)}>
          <div className="bookImgContainer">
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt="book image"
            />
          </div>
          <p className="bookName">{book.title}</p>
          <div className="author">
            <p>{book.author_name[0]}</p>
          </div>
        </div>
        <Modal
          bookKey={book.key}
          show={showModal}
          author_name={book.author_name}
          onClose={() => setShowModal(false)}
        />
      </>
    );
  }
};
export default Card;
