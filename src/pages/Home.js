import { Link } from "react-router-dom";
import Footer from "../components/inc/Footer";
import Header from "../components/inc/Header";

function Home() {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <section className="content-section">
          <div
            className="container"
            style={{ textAlign: "center", height: "60vh" }}
          >
            <h1>Simple Book Records</h1>
            <p>
              This application will be used to records book with its
              information.{" "}
            </p>

            <p className="nav-item">
              <Link to={`/books`}>Click Here</Link> to start
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
