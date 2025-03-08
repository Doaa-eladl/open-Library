import React, { useEffect, useState } from "react";
import Card from "./card";
import axios from "axios";

const Main = () => {
  const [searchWord, setSearchWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [books, setBooks] = useState([]);

  function search() {
    let url;

    if (searchWord != "") {
      const encodedTitle = encodeURIComponent(searchWord);
      url = `https://openlibrary.org/search.json?title=${encodedTitle}&limit=20`;
    } else {
      url = "https://openlibrary.org/search.json?subject=books&limit=20";
    }
    setLoading(true);

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        if (data.docs && data.docs.length > 0) {
          setBooks(data.docs);
          setNoData(false);
        } else {
          setNoData(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    search(); // Fetch books every time the search word changes
  }, [searchWord]);

  return (
    <div className="mainContent">
      <div className="top">
        <div className="left">
          <img src="./images/quote.jpg" alt="quote"></img>
        </div>
        <div className="right">
          <div className="innerRightContent">
            <h1>Find Your book</h1>
            <div className="searchBox">
              <input
                type="text"
                placeholder="search by book name"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyDown={search}
              ></input>
              <i className="fa fa-search"></i>
            </div>
            <img
              src="./images/cartoon-kids-reading-book.png"
              alt="kids read books"
            ></img>
          </div>
        </div>
      </div>
      <hr />
      <div className="bottom">
        {books.length > 0 &&
          !noData &&
          books.map((book, index) => <Card key={index} book={book} />)}
        {loading && <p className="Loadding">Loadding!!!</p>}
        {noData && !loading && <p className="Loadding">No books found!</p>}
      </div>
    </div>
  );
};
export default Main;
