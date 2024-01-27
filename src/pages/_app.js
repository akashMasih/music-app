import MainWrapper from "../layout/MainWrapper";
import "../styles/globals.css";
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <MainWrapper>
        <Component {...pageProps} />
      </MainWrapper>
    </>

  );
}
