import * as DialogPrimitive from '@radix-ui/react-dialog';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import Router from 'next/router';
import { Transition } from '@headlessui/react';
import { clsx } from 'clsx';

interface Props {
  workspaceId: string;
  router: any;
  title: string;
  setRefetchCompositions?: Dispatch<SetStateAction<boolean>>;
  newCompositionOpen: boolean;
  setNewCompositionOpen: Dispatch<SetStateAction<boolean>>;
}

async function createComposition(workspaceId: string, name: string) {
  try {
    toast.loading('Creating Composition...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}editor/create/composition`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          name: name,
        },
      }
    );
    toast.remove();
    toast.success('Successfully Created Composition!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function EditMenu({
  workspaceId,
  router,
  title,
  newCompositionOpen,
  setNewCompositionOpen,
}: Props) {
  const [name, setName] = useState('');

  return (
    <header className="flex flex-col mt-4 md:mt-6 sm:px-1 md:px-6 lg:px-1 xl:px-24 2xl:px-32">
      <div className="flex flex-col space-y-6 px-2 md:px-2 lg:px-4 xl:px-6 2xl:px-8">
        <div className="w-full flex flex-row justify-between items-between">
          <h2 className="silka-semibold text-2xl md:text-3xl">
            {title}
          </h2>
          <DialogPrimitive.Root
            open={newCompositionOpen}
            onOpenChange={setNewCompositionOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="hover:opacity-90 py-1 md:py-1.5 my-auto h-fit px-4 md:px-5 bg-[#363636] border border-[#808080] rounded text-white silka-medium text-[11px] md:text-xs">
                New Composition
              </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal forceMount>
              <Transition.Root show={newCompositionOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <DialogPrimitive.Overlay
                    forceMount
                    className="fixed inset-0 z-20 bg-black/50"
                  />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPrimitive.Content
                    forceMount
                    className={clsx(
                      'fixed z-50',
                      'w-[95vw] max-w-md rounded p-4 md:w-full',
                      'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                      'bg-white',
                      'focus:outline-none focus-visible:ring-0'
                    )}
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        createComposition(workspaceId, name).then(
                          (value) => {
                            Router.push('/edit/' + value?.id);
                          }
                        );
                      }}
                      className="flex w-full flex-col"
                    >
                      <div className="flex flex-row justify-between items-betwen w-full">
                        <h2 className="silka-bold my-auto text-xl text-[#363636]">
                          New Composition
                        </h2>
                        <DialogPrimitive.Close>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="my-auto hover:opacity-80"
                          >
                            <path
                              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                              fill="#363636"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </DialogPrimitive.Close>
                      </div>
                      <div className="mt-5 flex flex-col">
                        <label className="text-[11px] silka-regular text-gray-400">
                          Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          className="rounded text-xs mt-2 silka-regular border border-gray-300 ring-0 focus:border-[#FF623D] focus:ring-0"
                          placeholder="Composition Name..."
                          type="text"
                          required
                        />
                      </div>
                      <div className="flex mt-8 space-x-3 flex-row justify-end items-end">
                        <DialogPrimitive.Close>
                          <button
                            type="submit"
                            className="text-xs silka-medium text-white bg-[#FF623D] px-4 py-1.5 rounded hover:opacity-90"
                          >
                            Create
                          </button>
                        </DialogPrimitive.Close>
                      </div>
                    </form>
                  </DialogPrimitive.Content>
                </Transition.Child>
              </Transition.Root>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
        <div className="flex flex-row space-x-2">
          <Link
            href={'/' + workspaceId + '/edit'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/edit'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#363636]'
                : 'text-[#848484] silka-medium')
            }
          >
            Home
          </Link>
          <Link
            href={'/' + workspaceId + '/edit/tools'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/edit/tools'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#363636]'
                : 'text-[#848484] silka-medium')
            }
          >
            Tools
          </Link>
          <Link
            href={'/' + workspaceId + '/edit/templates'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/edit/templates'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#363636]'
                : 'text-[#848484] silka-medium')
            }
          >
            Templates
          </Link>
        </div>
      </div>
      <hr className="w-full mt-3" />
    </header>
  );
}
