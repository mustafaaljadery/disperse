import axios from 'axios';
import { useState, Dispatch, SetStateAction } from 'react';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  chatData: any;
  setChatData: Dispatch<SetStateAction<any>>;
  userId: string;
  chatMessages: any;
  setChatMessages: Dispatch<SetStateAction<any>>;
  groupMessages: any;
  setGroupMessages: Dispatch<SetStateAction<any>>;
}

async function sendMessageGroup(
  userId: string,
  groupId: string,
  message: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}chat/create/groupmessage`,
      null,
      {
        params: {
          userId: userId,
          groupId: groupId,
          message: message,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function sendMessageChat(
  userId: string,
  chatId: string,
  message: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}chat/create/chatmessage`,
      null,
      {
        params: {
          chatId: chatId,
          message: message,
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function WriteChat({
  chatData,
  setChatData,
  userId,
  chatMessages,
  setChatMessages,
  groupMessages,
  setGroupMessages,
}: Props) {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-row py-1.5 bg-[#F7F7F7] px-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (chatData.type === 'group') {
            setGroupMessages([
              ...groupMessages,
              {
                id: Math.random(),
                content: text,
                user: {
                  id: userId,
                },
              },
            ]);
            sendMessageGroup(userId, chatData.id, text).then(
              (data) => {}
            );
            setText('');
          } else {
            setChatMessages([
              ...chatMessages,
              {
                id: Math.random(),
                content: text,
                user: {
                  id: userId,
                },
              },
            ]);
            sendMessageChat(userId, chatData.id, text).then(
              (data) => {}
            );
            setText('');
          }
        }}
        className="flex-1 flex flex-row space-x-1"
      >
        <input
          className="w-full silka-regular text-sm bg-[#F7F7F7] border-none focus:ring-offset-0 focus:ring-0 focus:border-none"
          placeholder="Write a message..."
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          type="submit"
          disabled={text.length === 0}
          className="my-auto hover:opacity-90 shadow bg-[#FF623D] p-2 rounded"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
