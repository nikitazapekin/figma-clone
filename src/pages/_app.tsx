// _app.tsx
import Header from '@/widgets/Header/Header';
import type { AppProps } from 'next/app';
import styles from "../app/theme/wrappers.module.scss";
import "../app/theme/normalize.scss";
import { Provider } from 'react-redux';
import store from "@/pages/store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
      <div className={styles.wrapper}>
          {/*
      
              */}
        <Header />
        <div className={styles.content}>
       
          <Component {...pageProps} />
        </div>
      </div>
              </Provider>
  );
}

export default MyApp;

/* 
import Header from '@/widgets/Header/Header';
import type { AppProps } from 'next/app';
import styles from "../app/theme/wrappers.module.scss"
import "../app/theme/normalize.scss"
import { Provider } from 'react-redux';
import store from "@/pages/store/store"
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <div className={styles.wrapper}>
                    <Header />
                    <div className={styles.content}>
                        {<Component {...pageProps} />}
                    </div>
                </div>
            </Provider>
        </>


    );
}

export default MyApp;
*/