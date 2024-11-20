import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Header2 from "../../Components/HeaderAfterSignIn";
import HeroSection from "../../Components/HeroSection";
import About from "../../Components/About";
import Contact from "../../Components/Contact";
import FeaturesSection from "../../Components/FeaturesSection";
import CoursesCatalog from "../../Components/CourseCatalog"; 
 
function HomePage() {
    const isLoggedIn = localStorage.getItem("accessToken") !== null;

    return (
        <>
            {isLoggedIn ? <Header2 /> : <Header />}
            <HeroSection />
            <FeaturesSection />
            <CoursesCatalog />
            <section id="about">
                <About />
            </section>
            <section id="contact">
                <Contact />
            </section>
            <Footer />
        </>
    );
}

export default HomePage;
