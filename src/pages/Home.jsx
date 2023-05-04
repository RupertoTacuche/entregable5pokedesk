import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setNameTrainer(e.target.nameTrainer.value));
    navigate("/pokedex");
  };

  return (
    <section className="min-h-screen grid grid-rows-[1fr_auto]">
      {/*parte superior */}
      <section className="flex justify-center items-center">
        <article>
          <div>
            <img
              className="mx-auto object-cover w-[350px] md:w-[550px] xl:w-auto"
              src="/images/pokedex.png"
              alt=""
            />
          </div>
          <div className=" my-5 md:my-10">
            <h2 className=" text-[#FE1936] text-[25px] md:text-[35px] lg:text-[40px] xl:text-[50px] font-bold text-center font-inter">
              Hello trainer!
            </h2>
            <p className=" text-[18px] md:text-[20px] xl:text-[25px] text-center">
              Give me your name, to start !:
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input
              className="pl-4 w-[70%] md:w-[500px]  lg:w-[600px] h-[60px] shadow-xl"
              id="nameTrainer"
              type="text"
              placeholder="Your Name..."
            />
            <button className="bg-[#D93F3F] text-white h-[60px]  lg:h-[60px] px-5 md:px-14 lg:px-20">
              Start!
            </button>
          </form>
        </article>
      </section>
      {/* Footer */}
      <Footer />
    </section>
  );
};

export default Home;
