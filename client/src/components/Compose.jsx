import Header from "./Header";
import Footer from "./Footer";

function Compose() {
  return (
    <div>
      <Header />
      <form className="">
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" type="text" name="postTitle"></input>
          <label>Post</label>
          <textarea
            className="form-control"
            name="postBody"
            rows="5"
            cols="30"
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit" name="button">
          Publish
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Compose;
