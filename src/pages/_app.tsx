
import Header from '@/widgets/Header/Header';
import type { AppProps } from 'next/app';
import styles from "../app/theme/wrappers.module.scss"
import "../app/theme/normalize.scss"
function MyApp({ Component, pageProps }: AppProps) {
    return (
       <>
       <div className={styles.wrapper}>

       <Header />
       <div className={styles.content}>

                {<Component {...pageProps} />}
       </div>
       </div>
       </>
        

    );
}

export default MyApp;