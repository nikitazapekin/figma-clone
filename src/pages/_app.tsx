 // _app.tsx
 /*
 import Header from '@/widgets/Header/Header';
import type { AppProps } from 'next/app';
import styles from "../app/theme/wrappers.module.scss";
import "../app/theme/normalize.scss";
 

import { useEffect, useState } from 'react';
import Header from '@/widgets/Header/Header';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/pages/store/store';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/check', { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        setIsAuthenticated(false);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Header //isAuthenticated={isAuthenticated}
         />
        <Component {...pageProps} />

        is {isAuthenticated}
      </div>
    </Provider>
  );
}

export default MyApp;
*/
 
import Header from '@/widgets/Header/Header';
import type { AppProps } from 'next/app';
import styles from "../app/theme/wrappers.module.scss";
import "../app/theme/normalize.scss";
import { Provider } from 'react-redux';
import store from "@/pages/store/store";
import { parse } from 'cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
function MyApp({ Component, pageProps }: AppProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get('/api/checkAuth', { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        setIsAuthenticated(false);
      }
    };

    fetchAuthStatus();
  }, []);



    return (
        <Provider store={store}>
            <div className={styles.wrapper}>
             
                <Header isAuthenticated={isAuthenticated} 
                />
                <div className={styles.content}>
                    <Component {...pageProps} />


                    is  {JSON.stringify(isAuthenticated)}
                </div>
            </div>
        </Provider>
    );
} 

export default MyApp;
/*
*/


/*import Header from '@/widgets/Header/Header';
import type { AppProps } from 'next/app';
import styles from "../app/theme/wrappers.module.scss";
import "../app/theme/normalize.scss";
import { Provider } from 'react-redux';
import store from "@/pages/store/store";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <div className={styles.wrapper}>

                <Header />
                <div className={styles.content}>

                    <Component {...pageProps} />
                </div>
            </div>
        </Provider>
    );
}

export default MyApp;
*/