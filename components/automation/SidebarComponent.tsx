import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface Props {
  name: string;
  image: string;
  sidebarSelect: string;
  setSidebarSelect: Dispatch<SetStateAction<string>>;
}

export function SidebarComponent({
  name,
  image,
  sidebarSelect,
  setSidebarSelect,
}: Props) {
  return (
    <button
      onClick={() => {
        setSidebarSelect(name);
      }}
      className={
        'hover:bg-gray-100 flex flex-row space-x-2.5 rounded w-full py-1.5 justify-start items-start px-2 ' +
        (sidebarSelect == name ? 'bg-gray-50' : '')
      }
    >
      <img
        src={image}
        className="my-auto h-[10px] w-[10px] md:h-[15px] md:w-[15px] lg:h-[20px] lg:w-[20px]"
      />
      <p className="text-[11px] md:text-xs lg:text-sm my-auto silka-medium text-gray-700">
        {name}
      </p>
    </button>
  );
}
