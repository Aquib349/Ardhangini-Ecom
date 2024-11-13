import { Card, CardContent } from "../../components/ui/card";
import img1 from "../../assets/logo-1.jpg";
import img2 from "../../assets/logo-2.jpg";
import img3 from "../../assets/logo-3.jpg";
import img4 from "../../assets/logo-4.jpg";

const Commitment: React.FC = () => {
  const item = [
    { id: 1, name: "Free Shipping", image: img1 },
    { id: 2, name: "Cash On Delivery", image: img2 },
    { id: 3, name: "Make In India", image: img3 },
    { id: 4, name: "Easy Returns And Exchanges", image: img4 },
  ];

  return (
    <>
      <section className="commitment">
        <div className="main py-16">
          <h1 className="text-2xl md:text-3xl text-center font-medium">
            Ardhangini Commitment
          </h1>
          <div className="flex gap-4 justify-center items-center mt-16 flex-wrap">
            {item.map((val) => (
              <Card
                key={val.id}
                className="w-[80%] sm:w-[250px] md:w-[300px] bg-transparent border-none shadow-none"
              >
                <CardContent className="border-none p-0">
                  <div className="images">
                    <img
                      src={val.image}
                      alt={val.name}
                      className="rounded-t-md w-full h-auto"
                    />
                  </div>
                  <p className="text-center py-2 font-medium text-sm md:text-base">
                    {val.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Commitment;
