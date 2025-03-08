import React, { useEffect, useState } from "react";
import axios from "axios";

const Modal = ({ show, bookKey, author_name, onClose }) => {
  const [bookInfo, setBookInfo] = useState();
  function fetchBookData() {
    const url = `https://openlibrary.org${bookKey}.json`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setBookInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    if (show) fetchBookData(); // Fetch book
  }, [show]);

  if (show && bookInfo) {
    return (
      <div className="outer">
        <div className="inner">
          <div className="modalHeader">
            <button onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="bookInfo">
            <img
              src={`https://covers.openlibrary.org/b/id/${bookInfo.covers[0]}-M.jpg`}
              alt=""
            />
            <div className="right">
              <h2>{bookInfo.title}</h2>
              <p className="publishDate">
                publish in: <span>{bookInfo.first_publish_date}</span>
              </p>
              <div className="authers">
                <p>Authers: </p>
                <div className="autherList">
                  {author_name.length > 0 &&
                    author_name.map((auther, index) => (
                      <span key={index}>{auther}</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bookDescription">
            <p>{bookInfo.description}</p>
          </div>
        </div>
      </div>
    );
  }
};
export default Modal;
