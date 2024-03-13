import axios from 'axios';
import { WriteChat } from './WriteChat';
import { ChatHistory } from './ChatHistory';
import { ChatHeader } from './ChatHeader';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  workspaceId: string;
  userId: string;
  chatData: any;
  setChatData: Dispatch<SetStateAction<any>>;
}

export function ChatRight({
  workspaceId,
  userId,
  chatData,
  setChatData,
}: Props) {
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [groupMessages, setGroupMessages] = useState<any>([]);

  return (
    <div className="w-[80%] flex flex-col">
      <ChatHeader workspaceId={workspaceId} userId={userId} />
      <ChatHistory
        userId={userId}
        chatData={chatData}
        setChatData={setChatData}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        groupMessages={groupMessages}
        setGroupMessages={setGroupMessages}
      />
      <WriteChat
        chatData={chatData}
        setChatData={setChatData}
        userId={userId}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        groupMessages={groupMessages}
        setGroupMessages={setGroupMessages}
      />
    </div>
  );
}
