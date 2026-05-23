import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/NavBar";


export default function HomePage(){

  return(

    <>

      <Navbar />

     <HeroSection />

      <div className="px-10">

        <FeaturedProperties />

      </div>

      <Footer />

    </>

  );

}