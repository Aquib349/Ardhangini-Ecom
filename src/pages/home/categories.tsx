import { Button } from "../../components/ui/button";
// import img1 from "../../assets/img1.jfif";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import { useNavigate } from "react-router-dom";

const Categories: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="categories">
        <div className="main w-[80%] mx-auto mt-12 mb-12">
          <h1 className="text-center text-3xl font-medium">New Products</h1>
          <p className="text-center text-gray-500 pt-4 text-sm">
            Explore our exquisite new collection of sarees, blending traditional
            elegance with contemporary designs. <br /> From vibrant silks to
            graceful cottons, <br /> each piece is crafted to add timeless
            beauty to your wardrobe.
          </p>
          <div className="flex justify-center mt-12">
            <Button onClick={() => navigate("/newcomers")}>
              View More Products
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-10">
            {/* First item */}
            <div className="relative">
              <img
                src={""}
                alt="Yellow Wedding Sarees"
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <figcaption className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 hover:bg-opacity-30 text-white flex flex-col justify-center items-center rounded-lg">
                <h2 className="text-2xl font-semibold pb-2">Top Friday</h2>
                <h3 className="text-xl">Yellow Wedding Sarees</h3>
                <Button
                  variant="outline"
                  className="mt-2 font-semibold bg-transparent text-xs h-8"
                >
                  Buy It Now
                </Button>
              </figcaption>
            </div>

            {/* Second item */}
            <div className="relative">
              <img
                src={img2}
                alt="Red Wedding Sarees"
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <figcaption className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 hover:bg-opacity-30 text-white flex flex-col justify-center items-center rounded-lg">
                <h2 className="text-2xl font-semibold pb-2">Black Friday</h2>
                <h3 className="text-xl">Red Wedding Sarees</h3>
                <Button
                  variant="outline"
                  className="mt-2 font-semibold bg-transparent text-xs h-8"
                >
                  Buy It Now
                </Button>
              </figcaption>
            </div>

            {/* Third item */}
            <div className="relative">
              <img
                src={img3}
                alt="Wedding Sarees"
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <figcaption className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 hover:bg-opacity-30 text-white flex flex-col justify-center items-center rounded-lg">
                <h2 className="text-2xl font-semibold pb-2">10% Off</h2>
                <h3 className="text-xl">Wedding Sarees</h3>
                <Button
                  variant="outline"
                  className="mt-2 font-semibold bg-transparent text-xs h-8"
                >
                  Buy It Now
                </Button>
              </figcaption>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
