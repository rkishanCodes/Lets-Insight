import React from "react";
import { AuthProvider } from "../context/AuthContext"; // Import AuthProvider
import HeaderHome from "../components/Header/HeaderHome";
import About from "../components/Home/About";
import { useTheme } from "../context/ThemeContext";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import FooterHome from "../components/Footer/FooterHome";

const Home = () => {
  const { theme } = useTheme();
  return (
    <div className={`theme-${theme}`}>
      <AuthProvider>
        <HeaderHome />
        <Hero />
      </AuthProvider>

      <Features />
      <About />
      <FooterHome />
    </div>
  );
};

export default Home;
