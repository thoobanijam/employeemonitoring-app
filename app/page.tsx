import Image from "next/image";
import LandingPage from "./Components/LandingPage";
import Map from "./Components/Map";
import PowerfullFeatures from "./Components/PowerfullFeatures";
import WhoBenefit from "./Components/WhoBenefit";
import Footer from "./Components/Footer";


export default function Home() {
  return (
    <div className="   ">
  <LandingPage/>
  <Map/>
  <PowerfullFeatures/>
  <WhoBenefit/>
  <Footer/>
    </div>
  );
}
