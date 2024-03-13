import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface Props {
  userId: string;
  chatData: any;
  setChatData: Dispatch<SetStateAction<any>>;
}

// function to check data, if date is today, return time, else return date
function checkDate(date: string) {
  const today = new Date();
  const dateToCheck = new Date(date);
  if (
    today.getDate() === dateToCheck.getDate() &&
    today.getMonth() === dateToCheck.getMonth() &&
    today.getFullYear() === dateToCheck.getFullYear()
  ) {
    return dateToCheck.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    return dateToCheck.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }
}

async function chatsAndGroups(userId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}chat/read/chatsandgroups`,
      {
        params: {
          userId: userId,
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function LoadingComponent() {
  return (
    <div className="flex flex-row space-x-3 py-2">
      <div className="my-auto">
        <div className="h-[58px] w-[58px] rounded-full bg-gray-200 animate-pulse" />
      </div>
      <div className="flex-1 flex my-auto flex-col space-y-2">
        <div className="flex flex-row justify-between items-between">
          <div className="h-4 rounded bg-gray-200 animate-pulse w-12" />
          <div className="h-4 rounded bg-gray-200 animate-pulse w-7" />
        </div>
        <div className="flex-1 flex flex-col space-y-1">
          <div className="h-3 rounded bg-gray-200 animate-pulse w-[100%]" />
          <div className="h-3 rounded bg-gray-200 animate-pulse w-[75%]" />
        </div>
      </div>
    </div>
  );
}

interface ComponentProps {
  value: any;
  chatData: any;
  setChatData: Dispatch<SetStateAction<any>>;
}

function ChatComponent({
  value,
  chatData,
  setChatData,
}: ComponentProps) {
  return (
    <button
      onClick={() => {
        setChatData({ type: 'chat', id: value.id });
      }}
      className="flex flex-row hover:opacity-80 space-x-3 py-2"
    >
      <img
        src={value.users[0].image}
        className="h-[58px] w-[58px] rounded-full"
      />
      <div className="flex-1 flex my-auto flex-col justify-start items-start space-y-1">
        <div className="flex flex-row w-full justify-between items-between">
          <p className="silka-semibold text-gray-900 text-base">
            {value.users[0].name}
          </p>
          {value?.messages[0] ? (
            <p className="silka-regular text-gray-600 text-[11px] my-auto">
              {checkDate(value?.messages[0]?.sentAt)}
            </p>
          ) : (
            <></>
          )}
        </div>
        <span
          className={
            'text-xs silka-regular text-gray-400 ' +
            (value?.messages[0]?.conenct ? '' : 'italic')
          }
        >
          {value?.messages[0]?.content
            ? value?.messages[0]?.content
            : 'No messages yet...'}
        </span>
      </div>
    </button>
  );
}

function GroupComponent({
  value,
  chatData,
  setChatData,
}: ComponentProps) {
  return (
    <button
      onClick={() => {
        setChatData({ type: 'group', id: value.id });
      }}
      className="flex flex-row hover:opacity-80 space-x-3 py-2"
    ></button>
  );
}

export function ChatLeft({ userId, chatData, setChatData }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      chatsAndGroups(userId).then((data: any) => {
        setData(data);
        setIsLoading(false);
      });
    }
  }, [userId]);

  return (
    <div className="w-[20%] flex flex-col pr-4">
      {isLoading ? (
        <div className="flex flex-col">
          {[...Array(5)].map((value, index) => {
            return <LoadingComponent key={index} />;
          })}
        </div>
      ) : (
        <>
          {data?.map((value: any) => {
            if (value.type === 'chat') {
              return (
                <ChatComponent
                  key={value.id}
                  value={value}
                  chatData={chatData}
                  setChatData={setChatData}
                />
              );
            } else if (value.type === 'group') {
              return (
                <GroupComponent
                  key={value.id}
                  value={value}
                  chatData={chatData}
                  setChatData={setChatData}
                />
              );
            }
          })}
        </>
      )}
    </div>
  );
}
