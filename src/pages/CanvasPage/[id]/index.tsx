import { GetServerSideProps } from 'next';
import Canvas from '@/widgets/Canvas/Canvas';
import styles from '@/app/theme/wrappers.module.scss';

interface DraftPageProps {
    id: string;
}

const DraftPage: React.FC<DraftPageProps> = ({ id }) => {
    return (
        <div className={styles.wrapperMax}>
            <Canvas id={id} />
          
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    return {
        props: { id }, 
    };
};

export default DraftPage;


/* import Canvas from "@/widgets/Canvas/Canvas";
import styles from "@/app/theme/wrappers.module.scss"
export default function CanvasPage() {
    return (
        <div className={styles.wrapperMax}  >
            <Canvas />
        </div>
    );
}


export async function getServerSideProps(context) {
    const { id } = context.params;
    return {
        props: { id }, // Передаем id в компонент
    };
}

const DraftPage = ({ id }) => {
    return <div>Draft ID: {id}</div>;
};

export default DraftPage; */