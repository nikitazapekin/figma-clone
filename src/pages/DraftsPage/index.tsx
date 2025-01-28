
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { GetAllDraftsApi } from '@/services/drafts';
import DraftListHeader from '@/features/DraftListHeader/DraftListHeader';
import DraftList from '@/widgets/DraftList/DraftList';
 


interface DraftsPageProps {
  drafts: Draft[];
  error?: string;
}
interface Draft {
 
  ID: number,
  Name: string,
  Description: string,
  Likes: number,
  CreatedAt: string,
  AuthorID: number
}
const DraftsPage: React.FC<DraftsPageProps> = ({ drafts, error }) => {
 
  if (error) {
 
    return <div>Ошибка загрузки черновиков: {error}</div>;
  }

  return (
    <div>
 
        
        <DraftList
        drafts={drafts}
        />
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = parse(context.req.headers.cookie || '');  
    const token = cookies.access_token;  

    if (!token) {
      context.res.writeHead(302, { Location: '/SignIn' });
      context.res.end();
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