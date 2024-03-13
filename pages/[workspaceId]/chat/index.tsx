import { ChatMenu } from '../../../components/chat/ChatMenu';
import { ChatScreen } from '../../../components/chat/ChatScreen';
import { IssuesScreen } from '../../../components/chat/IssuesScreen';
import { TimelineScreen } from '../../../components/chat/TimelineScreen';
import DashboardLayout from '../../../layouts/Dashboard';
import { PageHead } from '../../../layouts/PageHead';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { LoadingScreen } from '../../../components/Loading';

export default function Chat() {
  const [isLoading, setIsLoading] = useState(true);
  const [chatSelection, setChatSelection] = useState('Chat');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == 'authenticated' && router.isReady) {
      setIsLoading(false);
    }
  }, [status, router.isReady]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Chat · Disperse">
      <DashboardLayout>
        <div className="flex flex-col space-y-2">
          <ChatMenu
            chatSelection={chatSelection}
            setChatSelection={setChatSelection}
          />
          {chatSelection == 'Chat' ? (
            <ChatScreen
              workspaceId={String(router.query.workspaceId)}
              userId={String(session?.user?.id)}
            />
          ) : chatSelection == 'Issues' ? (
            <IssuesScreen />
          ) : (
            <TimelineScreen />
          )}
        </div>
      </DashboardLayout>
    </PageHead>
  );
}
