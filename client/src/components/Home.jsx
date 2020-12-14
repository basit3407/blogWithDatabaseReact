import Header from "./Header";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home(props) {
  const [posts, setPosts] = useState([]);
  const { handleError } = props;

  const url = "http://localhost:5000/";

  useEffect(() => {
    let isMounted = true;
    axios
      .get(url)
      .then((res) => {
        if (isMounted) {
          setPosts(res.data);
        }
      })
      .catch(() => handleError(500));
    return () => {
      isMounted = false;
    };
  }, [posts, handleError]);

  return (
    <main>
      <Header />
      <div className="container">
        <h1>Home</h1>
        <p>
          Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper
          auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit
          amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum
          leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque
          sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing.
          Magnis dis parturient montes nascetur ridiculus mus mauris vitae
          ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis
          lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at.
          Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus
          mattis molestie a iaculis at erat pellentesque adipiscing.
        </p>

        {posts.map((post, index) => {
          return (
            <div key={index}>
              <h1>{post.title}</h1>
              <p>
                {post.content.substring(0, 100) + " ..."}
                <Link to={"/post/" + post.title}>Read more</Link>
              </p>
            </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}

export default Home;
