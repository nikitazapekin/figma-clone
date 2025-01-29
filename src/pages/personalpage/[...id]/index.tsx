

import PersonalInfoComponent from "@/widgets/PersonalInfoComponent/PersonalInfoComponent";
import { GetPersonalDraftsApi } from "@/services/personalDrafts";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parse } from 'cookie';
import ListOfPersonalDrafts from "@/widgets/ListOfPersonalDrafts/ListOfPersonalDrafts";



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
const PersonalPage: React.FC<DraftsPageProps> = ({ drafts, error }) => {

  if (error) {

    return <div>Ошибка загрузки черновиков: {error}</div>;
  }
  return (
    <div >
      <PersonalInfoComponent />
      <ListOfPersonalDrafts drafts={drafts} />
    </div>
  );
}
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

    const { id } = context.params || {};
    if (!id) {
      return {
        props: {
          drafts: [],
          error: 'ID пользователя не найден.',
        },
      };
    }

    const drafts = await GetPersonalDraftsApi(token, Number(id));

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
export default PersonalPage; 