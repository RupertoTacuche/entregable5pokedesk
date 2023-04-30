import { useDispatch } from "react-redux"
import Footer from "../components/Footer" 
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }

  return (
    <section className="min-h-screen grid grid-rows-[1fr_auto]">
        {/*parte superior */}
        <section>
            <article>
                <div>
                    <img src="/images/pokedex.png" alt="" />
                </div>
                <h2>Hola Entrenador!</h2>
                <p>Para poder comenzar, dame tu nombre:</p>           
                <form onSubmit={handleSubmit}>
                    <input id="nameTrainer" type="text" placeholder="Tu nombre..." />
                    <button>Comenzar</button>
                </form>
            </article>
        </section>
        {/* Footer */}
        <Footer/>
    </section>
  )
}

export default Home