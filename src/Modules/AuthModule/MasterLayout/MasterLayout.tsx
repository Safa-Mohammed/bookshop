  
import { Outlet } from "react-router-dom";
// import NavBar from "../../HomeModule/components/Home/navbar";
// import Categories from "../../HomeModule/components/Home/Categories";
// import Products from "../../HomeModule/components/Home/Products";
// import Featuredbook from "../../HomeModule/components/Home/Featuredbook";
// import Offer from "../../HomeModule/components/Home/Offer";
// import Subscribe from "../../HomeModule/components/Home/Subscribe";
// import Article from "../../HomeModule/components/Home/Article";
import Footer from "../../HomeModule/components/Home/Footer/Footer";
import Header from "../../HomeModule/components/Home/Header";
import Navbar from "../../HomeModule/components/Home/navbar/Navbar";

 
export default function MasterLayout() {
  return (
    <div>
      <div className="d-flex ">
        
        <div className="w-100">
           <Header/>
           <Navbar/>
           {/*
         
          <Categories />
          <Products />
          <Featuredbook/>  
       <Offer />
       <Subscribe />
       <Article/>
        */}
        <Outlet />
        <Footer />
        </div>
      </div>
    </div>
  );
}
