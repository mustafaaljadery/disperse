import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import { useState, Dispatch, SetStateAction } from 'react';
import { Scroll } from '../../utils/Scroll';

interface Props {
  category: any;
  setCategory: Dispatch<SetStateAction<any>>;
}

let categories: any = [
  'Autos & Vehicles',
  'Comedy',
  'Education',
  'Film & Animation',
  'Gaming',
  'Howto & Style',
  'Music',
  'News & Politics',
  'Nonprofits & Activism',
  'People & Blogs',
  'Pets & Animals',
  'Science & Technology',
  'Sports',
  'Travel & Events',
];

export function VideoCategoryDropdown({
  category,
  setCategory,
}: Props) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="start"
        sideOffset={5}
        className={cx(
          'flex flex-col h-[300px] radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'rounded-lg py-1 shadow-md w-[470px]',
          'bg-white dark:bg-gray-800'
        )}
      >
        <Scroll>
          <>
            {categories.map((value: any, index: number) => {
              return (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory(value);
                  }}
                  className="w-full focus:ring-0 focus:border-none hover:ring-0"
                  key={index}
                >
                  <DropdownMenuPrimitive.Item className="hover:bg-gray-100 py-1.5 rounded w-full focus:ring-0 focus:border-none">
                    <span className="px-2.5 text-sm silka-regular text-gray-600">
                      {value}
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
              );
            })}
          </>
        </Scroll>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
