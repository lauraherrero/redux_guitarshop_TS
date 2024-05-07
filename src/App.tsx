import { useEffect, useReducer } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { GuitarItem } from "./components/GuitarItem";
import { Header } from "./components/Header";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {


  const [state, dispatch] = useReducer(cartReducer, initialState);
  //console.log(state);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart])

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => (
            <GuitarItem key={guitar.id} guitar={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
