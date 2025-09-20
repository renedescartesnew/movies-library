import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Home } from "@/pages/Home";
import { FilmDetail } from "@/pages/MovieDetail";
import { Wishlist } from "@/pages/Wishlist";
import NotFound from "./pages/NotFound";
import './styles/main.scss';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/film/:id" element={<FilmDetail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
