import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Header2 from "../../Components/HeaderAfterSignIn";
import Search from "../../Components/Search";
 
function HomePage() {
    const isLoggedIn = localStorage.getItem("accessToken") !== null;

    return (
        <>
            {isLoggedIn ? <Header2 /> : <Header />}
            <Search />
            <Footer />
        </>
    );
}

export default HomePage;
