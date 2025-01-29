import Header from '@/widgets/Header/Header';
import type { AppProps } from 'next/app';
import styles from "../app/theme/wrappers.module.scss";
import "../app/theme/normalize.scss";
import { Provider } from 'react-redux';
import store from "@/pages/store/store";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';



interface RespTypes {
  isAuthorized: boolean,
  message: string

}

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter()
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        await axios.get<RespTypes>('/api/checkAuth', { withCredentials: true });
        setIsAuthenticated(true)


      } catch (error) {
        setIsAuthenticated(false)
        router.push("/SignIn")
      }
    };

    fetchAuthStatus();
  }, [isAuthenticated]);

  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        <Header isAuthenticated={isAuthenticated} />
        <div className={styles.content}>
          <Component {...pageProps} />

        </div>
      </div>


    </Provider>
  );
}

export default MyApp;
