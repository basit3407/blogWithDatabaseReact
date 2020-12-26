import Header from "./Header";
import Footer from "./Footer";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const { posts, loggedIn, userId } = useSelector(getPosts);

  const history = useHistory();

  if (!loggedIn) history.push("/login");

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
                <Link to={`/user/${userId}/posts/${post._id}`}>Read more</Link>
              </p>
            </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}

const getPosts = (state) => state.auth;