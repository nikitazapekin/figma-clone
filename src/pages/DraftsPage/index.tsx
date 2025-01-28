/*import styles from "@/app/theme/wrappers.module.scss"
import DraftList from "@/widgets/DraftList/DraftList";

import DraftsService from "@/services/drafts";

export default function DraftsPage() {
  DraftsService.getAllDrafts()
  //console.log(DraftsService.getAllDrafts())
  return (
   <div className={styles.wrapperMax}>
      <DraftList />
   </div>
   
  );
}
*/
/*
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  console.log(posts)
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
  */



//import DraftsService from './DraftsService';
//import DraftsService from "@/services/drafts";


/*
import DraftsService from "@/services/drafts"

export default async function Page() {
  // Запрос на сервере
  const response = await DraftsService.getAllDrafts();
  const posts = response.data;

  return (
    <div>
  {JSON.stringify(posts)}
    </div>
  );
}

*/
/*
import DraftsService from "@/services/drafts"

export default   function Page() {
  // Запрос на сервере
  const handle =async () => {
    let resp = await  DraftsService.getAllDrafts();
    console.log(resp)
  }

  return (
    <div>
 <button onClick={handle}>
  ddfwee
 </button>
    </div>
  );
}
  */

/*
import DraftsService from "@/services/drafts"
import { NextApiRequest, NextApiResponse } from 'next';

// Пример API-метода
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const drafts = await DraftsService.getAllDrafts(); // Получаем данные
    res.status(200).json(drafts.data); // Возвращаем данные
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить черновики' });
  }
}*/
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
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/drafts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${context.req.cookies.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch drafts, status: ${response.status}`);
    }

    const drafts = await response.json();
    return { props: { drafts } };
  } catch (error: unknown) { // указываем тип ошибки как unknown
    console.error('Error fetching drafts:', error);
    // Теперь можно безопасно работать с error, например:
    const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка';
    return { props: { drafts: [], error: errorMessage } };
  }
};

export default DraftsPage;


  /*
  try {
    // Используем DraftsService для получения всех черновиков
    const response = await DraftsService.getAllDrafts();
    const posts = response.data; // Предполагаем, что API возвращает массив черновиков под ключом 'drafts'

    return (
     <>
      
      {JSON.stringify(posts)}
      
      </>
    );
  } catch (error) {
    console.error('Ошибка при загрузке черновиков:', error);
    return <div>Не удалось загрузить черновики. Попробуйте позже.</div>;
  }
 */

/*
export async function getServerSideProps() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;
console.log(response.data)
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
*/

/*
import axios from 'axios';

export default   function DraftPage() {
  
  return (
    <ul>
    fewe
    </ul>
  );
}
*/

/*
import axios from 'axios';

export default async function DraftPage() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const posts = response.data;

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
*/

/*
// pages/drafts.tsx
import axios from 'axios';
import styles from "@/app/theme/wrappers.module.scss";
import DraftList from "@/widgets/DraftList/DraftList";
import { AllDraftsResponse } from '@/services/types';

// Сервис для получения черновиков
const DraftsService = {
  async getAllDrafts(): Promise<AllDraftsResponse> {
    const API_URL = `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}`;
    const response = await axios.get<AllDraftsResponse>(`${API_URL}/drafts`, {
      withCredentials: true,
    });
    return response.data;
  },
};

// Это серверный компонент, который может делать асинхронные запросы
export default async function DraftsPage() {
  // Получаем данные с сервера
  const drafts = await DraftsService.getAllDrafts();
  
  console.log(drafts); // Логируем данные для отладки

  return (
    <div className={styles.wrapperMax}>
      <DraftList   /> 
      {JSON.stringify(drafts)}  
    </div>
  );
}
*/