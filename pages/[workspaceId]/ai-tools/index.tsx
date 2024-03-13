import DashboardLayout from '../../../layouts/Dashboard';
import { useState, useEffect } from 'react';
import { AiMenu } from '../../../components/aitools/AiMenu';
import { useRouter } from 'next/router';
import { LoadingScreen } from '../../../components/Loading';
import { useSession } from 'next-auth/react';

interface ToolProps {
  value: any;
}

const tools = [
  {
    url: '',
    title: 'Remove Background',
    description: 'Remove the background from an image or a video.',
    image: '',
  },
];

function Tool({ value }: ToolProps) {
  return (
    <div className="w-1/4 p-2">
      <button className="p-4 border rounded w-full"></button>
    </div>
  );
}

export default function AiTools() {
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceId, setWorkspaceId] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated' && router.isReady) {
      setWorkspaceId(router.query.workspaceId);
      setUserId(session.user.id);
      setIsLoading(false);
    }
  }, [router.isReady, status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout>
      <AiMenu
        title="AI Tools"
        workspaceId={workspaceId}
        userId={userId}
        router={router}
      />
      <main className="px-44 mt-10 flex flex-col">
        <div className="flex flex-row flex-wrap w-full">
          {tools.map((tool: any, index: number) => {
            return <Tool value={tool} key={index} />;
          })}
        </div>
      </main>
    </DashboardLayout>
  );
}
