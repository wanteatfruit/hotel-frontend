import Footer from "./Footer";
import NavBar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar isLoggedIn='true' />
      <main>{children}</main>
      <Footer />
    </>
  );
}
