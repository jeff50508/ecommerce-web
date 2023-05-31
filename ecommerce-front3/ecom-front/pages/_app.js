import { createGlobalStyle } from "styled-components"
import { CartContextProvider } from "../components/CartContext";

const GlobeStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;500;600;700&display=swap');
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans TC', sans-serif;
  }
`;
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobeStyles/>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}

export default MyApp
