import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import { Scroll } from '../utils/Scroll';

interface Props {
  chatData: any;
  setChatData: Dispatch<SetStateAction<any>>;
  userId: string;
  chatMessages: any;
  setChatMessages: Dispatch<SetStateAction<any>>;
  groupMessages: any;
  setGroupMessages: Dispatch<SetStateAction<any>>;
}

async function getChatMessages(chatId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}chat/read/chatmessages`,
      {
        params: {
          chatId: chatId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getGroupMessages(groupId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}chat/read/groupmessages`,
      {
        params: {
          groupId: groupId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface ChatProps {
  value: any;
  userId: string;
}

function Chat({ value, userId }: ChatProps) {
  return (
    <div
      className={
        'flex ' +
        (value?.user?.id == userId
          ? 'flex-row-reverse'
          : 'flex-row space-x-2')
      }
    >
      <img
        className="h-[28px] rounded-full w-[28px] my-auto"
        src={value.user.image}
      />
      <div
        className={
          'flex px-3 h-fit max-w-[400px] my-auto rounded-lg py-1 flex-col ' +
          (value?.user?.id == userId
            ? 'bg-[#F89172] mr-2'
            : 'bg-gray-100')
        }
      >
        <p
          className={
            'text-sm silka-medium break-all ' +
            (value?.user?.id == userId
              ? 'text-white'
              : 'text-gray-800')
          }
        >
          {value.content}
        </p>
      </div>
    </div>
  );
}

export function ChatHistory({
  chatData,
  setChatData,
  userId,
  chatMessages,
  setChatMessages,
  groupMessages,
  setGroupMessages,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (chatData?.id) {
      if (chatData.type == 'chat') {
        getChatMessages(chatData.id).then((data) => {
          setChatMessages(data.messages);
          setIsLoading(false);
        });
      } else {
        getGroupMessages(chatData.id).then((data) => {
          setGroupMessages(data.messages);
          setIsLoading(false);
        });
      }
    }
  }, [chatData?.id]);

  return (
    <div className="flex-1">
      <div className="flex flex-col h-full justify-end pb-3 space-y-3">
        {isLoading ? (
          <div></div>
        ) : (
          <>
            {chatData.type == 'chat' ? (
              <>
                {chatMessages.map((value: any, index: number) => {
                  return (
                    <Chat userId={userId} value={value} key={index} />
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}
