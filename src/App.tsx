import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* arkaplan */}
        <div className="fixed inset-0 bg-linear-to-br from-dark-bg via-black-100 to-dark-bg -z-10" />

        {/* isik huzmesi */}
        <div className="fixed top-20 left-20 size-72 bg-primary-blue/20 rounded-full blur-xl animate-pulse" />
        <div
          className="fixed bottom-20 right-20 size-72 bg-primary-blue/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <Header />

        <main className="flex-1 z-10 relative">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
