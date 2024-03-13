import { ChatLeft } from './ChatLeft';
import { ChatRight } from './ChatRight';
import { useEffect, useState } from 'react';

interface Props {
  workspaceId: string;
  userId: string;
}

export function ChatScreen({ workspaceId, userId }: Props) {
  const [chatData, setChatData] = useState(null);

  // change the height to fit the screen
  return (
    <div className="divide-x w-full flex flex-row">
      <ChatLeft
        userId={userId}
        chatData={chatData}
        setChatData={setChatData}
      />
      <ChatRight
        workspaceId={workspaceId}
        userId={userId}
        chatData={chatData}
        setChatData={setChatData}
      />
    </div>
  );
}
