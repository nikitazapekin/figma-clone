import { GetServerSideProps } from 'next';
import React from 'react';
import { parse } from 'cookie';
interface Draft {
  id: number;
  title: string;
}

interface DraftsPageProps {
  drafts: Draft[];
  error?: string;
}

const DraftsPage: React.FC<DraftsPageProps> = ({ drafts, error }) => {
  console.log("Cock" + document.cookie);
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
      return { props: { drafts: [], error: 'Токен не найден, необходимо авторизоваться.' } };
    }

    const response = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/drafts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',  
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch drafts, status: ${response.status}`);
    }

    const drafts = await response.json();
  
    return { props: { drafts } };
  } catch (error: unknown) {
    console.error('Error fetching drafts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка';
    return { props: { drafts: [], error: errorMessage } };
  }
};
export default DraftsPage;