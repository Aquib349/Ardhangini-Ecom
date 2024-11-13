import { AuthProvider } from "./context/auth/auth";
import { GlobalContextProvider } from "./context/global/global";
import AppRoutes from "./route";
import Banner from "./shared/banner";
import Footer from "./shared/footer";
import Navbar from "./shared/navbar";

function App() {
  return (
    <>
      <div className="bg-[#fdf3e3] w-full h-full">
        <AuthProvider>
          <GlobalContextProvider>
            <Banner />
            <Navbar />
            <AppRoutes />
            <Footer />
          </GlobalContextProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
