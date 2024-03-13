import { Dispatch, SetStateAction } from 'react';

interface Props {
  chatSelection: string;
  setChatSelection: Dispatch<SetStateAction<string>>;
}

let selections = [
  {
    name: 'Chat',
  },
  {
    name: 'Issues',
  },
  {
    name: 'Timeline',
  },
];

export function ChatMenu({ chatSelection, setChatSelection }: Props) {
  return (
    <div className="flex flex-col space-y-5 w-full">
      <hr className="w-full" />
      <div className="bg-[#F4F4F4] w-fit flex flex-row space-x-0.5 h-fit py-1 rounded-lg px-1.5">
        {selections.map((selection, index: number) => {
          return (
            <button
              key={index}
              onClick={() => {
                setChatSelection(selection.name);
              }}
              className={
                'text-xs py-0.5 px-3 rounded-lg silka-medium text-gray-600 ' +
                (chatSelection == selection.name
                  ? 'bg-white shadow'
                  : '')
              }
            >
              {selection.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
