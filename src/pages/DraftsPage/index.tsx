import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { GetAllDraftsApi } from '@/services/drafts';





interface DraftsPageProps {
  drafts: Draft[];
  error?: string;
}
interface Draft {
  id: number;
  title: string;
}
const DraftsPage: React.FC<DraftsPageProps> = ({ drafts, error }) => {
 
  if (error) {
    return <div>Ошибка загрузки черновиков: {error}</div>;
  }

  return (
    <div>
      <h1>Черновики</h1>
      {drafts.length === 0 ? (
        <p>Нет черновиков.</p>
      ) : (
        <ul>

          {JSON.stringify(drafts)}
          {drafts.map((draft) => (
            <li key={draft.id}>
              <h2>{draft.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = parse(context.req.headers.cookie || '');  
    const token = cookies.access_token;  

    if (!token) {
      return {
        props: {
          drafts: [],
          error: 'Токен не найден, необходимо авторизоваться.',
        },
      };
    }
 
    const drafts = await GetAllDraftsApi(token);

    return {
      props: {
        drafts,
      },
    };
  } catch (error: unknown) {
    console.error('Error fetching drafts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка';
    return {
      props: {
        drafts: [],
        error: errorMessage,
      },
    };
  }
};

export default DraftsPage; 