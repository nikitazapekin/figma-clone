import { GetServerSideProps } from 'next';
import React from 'react';

interface Draft {
  id: number;
  title: string;
}

interface DraftsPageProps {
  drafts: Draft[];
  error?: string;
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
 
   const token = context.req.cookies.access_token;
  //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzgwNzAwMjgsInVzZXJfaWQiOjh9.TAjMGgVMgnlnyVfWPBiS-RLngFjY8JE9rkwuoFGHotA"
   console.log("TOKEN", token)
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzgwNzMzNjQsInVzZXJfaWQiOjE4fQ.g9fi8mTdkBaMJZnA_nvqJTjzAL-1td7yxj55oMbzrdc"
    // Если токен не найден, возвращаем ошибку
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
    console.log(drafts)
    return { props: { drafts } };
  } catch (error: unknown) {
    console.error('Error fetching drafts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка';
    return { props: { drafts: [], error: errorMessage } };
  }
};

export default DraftsPage;
