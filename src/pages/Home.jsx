import Footer from "../components/Footer" 


const Home = () => {
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
                <div>
                    <input type="text" placeholder="Tu nombre..." />
                    <button>Comenzar</button>
                </div>
            </article>
        </section>
        {/* Footer */}
        <Footer/>
    </section>
  )
}

export default Home