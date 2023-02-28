import Nav from "./nav";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: any) {
    return (
      <>
        <Header />
        <div>
            <Nav />
            <main>{children}</main>
            <Footer />
        </div>
      </>
    )
  }