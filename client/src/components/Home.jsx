import Header from "./Header";
import Footer from "./Footer";

function Home() {
  <div>
    <Header />

    <h1>Home</h1>
    <p>
      Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper
      auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet
      justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel
      orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut.
      Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis
      parturient montes nascetur ridiculus mus mauris vitae ultricies.
      Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus.
      Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod
      lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a
      iaculis at erat pellentesque adipiscing.
    </p>

    {/* <%  posts.forEach(function(post){ %>

<h1><%=post.title%></h1>
<p>
<%=post.content.substring(0, 100) + " ..."%>
<a href="/posts/<%=post._id%>">Read More</a>
</p>


<% }) %> */}

    <Footer />
  </div>;
}

export default Home;
