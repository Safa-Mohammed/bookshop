 
import Categories from './components/Home/Categories/Categories'
import Featuredbook from './components/Home/FeaturedBook/Featuredbook';
import Landing from './components/Home/Landing'
// import Navbar from './components/Home/navbar/Navbar'
// import { useLocation } from 'react-router-dom';
import Offer from './components/Home/Offer/Offer';
import Subscribe from "./components/Home/Subscribe/Subscribe";
import ArticlesSection from './components/Home/Article/Article';
import Products from './components/Home/ReleaseBook/Products';

export default function Dashbored() {
  // const location = useLocation();

  return (
    <div>
     {/* {location.pathname !== '/dashboard/list-product' && <Navbar />} */}
       
        <Landing  />   
        <Categories/>  
        <Products />  
        <Featuredbook/> 
        <Offer/>
        <Subscribe /> 
        <ArticlesSection/> 
    </div>
  )
}
