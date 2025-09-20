import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header-simple";
import { Home } from "@/pages/Home";
import { FilmDetail } from "@/pages/MovieDetail-simple";
import { Wishlist } from "@/pages/Wishlist-simple";
import { WishlistProvider } from "@/contexts/WishlistContext";
import NotFound from "./pages/NotFound-simple";
import './styles/main.scss';

const App = () => (
  <WishlistProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </WishlistProvider>
);

export default App;
