import Header from "./Header";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import axios from "axios";
import Error from "./Error";
// import Error from "./Error"

function Post() {
  const [selectedPost, setSelectedPost] = useState({});
  const [error, setError] = useState(null);
  // const [error404, setError404] = useState(false);
  const { postTitle } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${postTitle}`)
      .then((res) => {
        setSelectedPost(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error("Error response:");
        console.error(err.response.data); // ***
        console.error(err.response.status); // ***
        console.error(err.response.headers); // ***
        setError(err.response.status);
      });
    // .then(() => {
    //   if (error === 404) {
    //     setError404(true);
    //   }
    // });
  }, [postTitle]);

  return (
    <main>
      {error && <Redirect to="Error404" component={Error} />}
      <div className="container">
        <Header />
        <h1>{selectedPost.title}</h1>
        <p>{selectedPost.content}</p>
        <Footer />
      </div>
    </main>
  );
}

export default Post;
