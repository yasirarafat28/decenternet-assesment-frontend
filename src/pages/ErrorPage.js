import Footer from "../components/inc/Footer";
import Header from "../components/inc/Header";

function ErrorPage() {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <section className="content-section">
          <div className="container" style={{ textAlign: "center" }}>
            <h1>Page not Found</h1>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
