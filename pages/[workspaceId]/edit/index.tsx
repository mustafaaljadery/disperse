import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
import { PageHead } from '../../../layouts/PageHead';
import DashboardLayout from '../../../layouts/Dashboard';
import { EditMenu } from '../../../components/edit/EditMenu';
import Router, { useRouter } from 'next/router';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';

const dropdownOptions = [
  {
    icon: '',
    name: 'Edit',
  },
  {
    icon: '',
    name: 'Copy Transcript',
  },
  {
    icon: '',
    name: 'Delete',
  },
];

async function getCompositions(workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/compositions`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function deleteComposition() {
  try {
  } catch (e) {
    console.log(e);
  }
}

async function copyTranscript() {
  try {
  } catch (e) {
    console.log(e);
  }
}

function formatAMPM(date: any) {
  // This is to display 12 hour format like you asked
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export default function Edit() {
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState('');
  const [refetchCompositions, setRefetchCompositions] =
    useState(false);
  const [compositions, setCompositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoverOptions, setHoverOptions] = useState(false);
  const [newCompositionOpen, setNewCompositionOpen] = useState(false);
  const [optionsEnter, setOptionsEnter] = useState(false);

  useEffect(() => {
    if (router.query.workspaceId) {
      setWorkspaceId(router.query.workspaceId as string);
      getCompositions(router.query.workspaceId as string).then(
        (value) => {
          setCompositions(value);
          setIsLoading(false);
        }
      );
    }
  }, [router.isReady]);

  useEffect(() => {
    if (refetchCompositions) {
      getCompositions(workspaceId).then((data) => {
        setCompositions(data);
        setRefetchCompositions(false);
      });
    }
  }, [refetchCompositions]);

  return (
    <PageHead title="Edit · Disperse">
      <DashboardLayout>
        <EditMenu
          workspaceId={workspaceId}
          title="Edit"
          router={router}
          setRefetchCompositions={setRefetchCompositions}
          newCompositionOpen={newCompositionOpen}
          setNewCompositionOpen={setNewCompositionOpen}
        />
        <main className="px-3 md:px-6 lg:px-4 xl:px-32 2xl:px-44 mt-10">
          <div className="flex px-2.5 w-full flex-col space-y-1.5">
            <h1 className="silka-semibold text-[#363636]">
              Compositions
            </h1>
            <p className="text-xs silka-regular text-gray-400">
              Edit videos and clips for short-form content.
            </p>
          </div>
          <div className="mt-4 w-full flex flex-row flex-wrap">
            {isLoading ? (
              <div className="w-full mt-8 flex flex-col justify-center items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin"
                >
                  <g clipPath="url(#clip0_1405_2)">
                    <path
                      d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                      fill="#FF623D"
                    />
                    <path
                      d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                      fill="#FF623D"
                    />
                    <path
                      d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                      fill="#FF623D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1405_2">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            ) : (
              <>
                {compositions?.length == 0 ? (
                  <div className="mt-14 flex flex-col w-full justify-center items-center">
                    <div className="bg-[#F6E7E3] p-3 rounded-full">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1593_2)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 0.25H5C3.74 0.25 2.532 0.75 1.641 1.641C0.75 2.532 0.25 3.74 0.25 5C0.25 7.977 0.25 12.023 0.25 15C0.25 16.26 0.75 17.468 1.641 18.359C2.532 19.25 3.74 19.75 5 19.75H15C16.26 19.75 17.468 19.25 18.359 18.359C19.25 17.468 19.75 16.26 19.75 15C19.75 11.854 19.75 8 19.75 8C19.75 7.586 19.414 7.25 19 7.25C18.586 7.25 18.25 7.586 18.25 8C18.25 8 18.25 11.854 18.25 15C18.25 15.862 17.908 16.689 17.298 17.298C16.689 17.908 15.862 18.25 15 18.25H5C4.138 18.25 3.311 17.908 2.702 17.298C2.092 16.689 1.75 15.862 1.75 15C1.75 12.023 1.75 7.977 1.75 5C1.75 4.138 2.092 3.311 2.702 2.702C3.311 2.092 4.138 1.75 5 1.75H12C12.414 1.75 12.75 1.414 12.75 1C12.75 0.586 12.414 0.25 12 0.25Z"
                            fill="#FF623D"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.4692 13.4124C19.4692 13.4124 17.4252 11.7784 15.9512 10.5994C14.8092 9.68437 13.1502 9.82537 12.1782 10.9194C9.9242 13.4544 5.4392 18.5004 5.4392 18.5004C5.1642 18.8094 5.1922 19.2844 5.5022 19.5594C5.8112 19.8344 6.2862 19.8064 6.5612 19.4964C6.5612 19.4964 11.0452 14.4514 13.2992 11.9154C13.7412 11.4184 14.4952 11.3544 15.0142 11.7704L18.5312 14.5844C18.8552 14.8424 19.3272 14.7904 19.5862 14.4674C19.8442 14.1434 19.7922 13.6714 19.4692 13.4124Z"
                            fill="#FF623D"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.0047 12.443C11.0047 12.443 8.34771 10.0281 6.72771 8.55505C5.75171 7.66805 4.28271 7.59805 3.22771 8.39005C2.06271 9.26305 0.549708 10.398 0.549708 10.398C0.218708 10.646 0.151708 11.1171 0.399708 11.4481C0.647708 11.7791 1.11871 11.8461 1.44971 11.5981C1.44971 11.5981 2.96271 10.4631 4.12771 9.59005C4.60671 9.23005 5.27471 9.26105 5.71871 9.66505L9.99471 13.5531C10.3017 13.8311 10.7767 13.8091 11.0547 13.5031C11.3327 13.1961 11.3107 12.721 11.0047 12.443Z"
                            fill="#FF623D"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.4088 0.46975C17.1158 0.17675 16.6408 0.17675 16.3478 0.46975L12.8128 4.00475C12.6718 4.14575 12.5928 4.33675 12.5928 4.53575V6.65675C12.5928 7.07075 12.9288 7.40675 13.3428 7.40675H15.4638C15.6628 7.40675 15.8538 7.32775 15.9948 7.18675L19.5298 3.65175C19.8228 3.35875 19.8228 2.88375 19.5298 2.59075L17.4088 0.46975ZM16.8788 2.06075L17.9388 3.12075L15.1538 5.90675H14.0928V4.84575L16.8788 2.06075Z"
                            fill="#FF623D"
                          />
                          <path
                            d="M7.5 6C8.32843 6 9 5.32843 9 4.5C9 3.67157 8.32843 3 7.5 3C6.67157 3 6 3.67157 6 4.5C6 5.32843 6.67157 6 7.5 6Z"
                            fill="#FF623D"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1593_2">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h2 className="text-xl mt-5 silka-semibold text-gray-900">
                      Start by creating a composition
                    </h2>
                    <p className="mt-2 silka-regular text-xs text-gray-400">
                      A composition allows you to edit your contenet
                      and get it production ready!
                    </p>
                    <button
                      onClick={() => {
                        setNewCompositionOpen(true);
                      }}
                      className="mt-5 px-5 py-1.5 bg-[#FF623D] text-xs silka-medium text-white rounded hover:opacity-90"
                    >
                      Create composition
                    </button>
                  </div>
                ) : (
                  <>
                    {compositions
                      ?.sort((a: any, b: any) => {
                        return (
                          //@ts-ignore
                          new Date(b?.created_at) -
                          //@ts-ignore
                          new Date(a?.created_at)
                        );
                      })
                      .map((value: any) => {
                        return (
                          <div className="p-2.5 w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4">
                            <button
                              onClick={() => {
                                if (!hoverOptions) {
                                  Router.push('/edit/' + value?.id);
                                }
                              }}
                              className="flex hover:bg-[#F5F1F0] hover:border-[#FF623D] w-full p-4 border border-gray-200 flex-row justify-between items-between space-x-2 rounded-lg"
                            >
                              <div className="flex flex-row space-x-3.5">
                                {value?.fileFound ? (
                                  <img
                                    className="h-[36px] my-auto w-[36px] rounded"
                                    src={value?.thumbnail}
                                  />
                                ) : (
                                  <svg
                                    width="24"
                                    height="30"
                                    viewBox="0 0 16 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="my-auto"
                                  >
                                    <path
                                      d="M10.5 4.75V0.0639999C11.013 0.174 11.486 0.425 11.866 0.806L14.694 3.634C15.074 4.014 15.326 4.487 15.436 5H10.75C10.612 5 10.5 4.888 10.5 4.75ZM15.5 6.5V16.75C15.5 18.267 14.267 19.5 12.75 19.5H2.75C1.233 19.5 0 18.267 0 16.75V2.75C0 1.233 1.233 0 2.75 0H9V4.75C9 5.715 9.785 6.5 10.75 6.5H15.5ZM8.5 14.75C8.5 14.336 8.164 14 7.75 14H4.75C4.336 14 4 14.336 4 14.75C4 15.164 4.336 15.5 4.75 15.5H7.75C8.164 15.5 8.5 15.164 8.5 14.75ZM11.5 11.75C11.5 11.336 11.164 11 10.75 11H4.75C4.336 11 4 11.336 4 11.75C4 12.164 4.336 12.5 4.75 12.5H10.75C11.164 12.5 11.5 12.164 11.5 11.75ZM11.5 8.75C11.5 8.336 11.164 8 10.75 8H4.75C4.336 8 4 8.336 4 8.75C4 9.164 4.336 9.5 4.75 9.5H10.75C11.164 9.5 11.5 9.164 11.5 8.75Z"
                                      fill="#FF623D"
                                    />
                                  </svg>
                                )}
                                <div className="flex my-auto flex-col space-y-0.5">
                                  <p className="text-sm text-start silka-medium text-[#363636]">
                                    {value.name?.length > 24
                                      ? value.name?.substring(0, 24) +
                                        '...'
                                      : value?.name}
                                  </p>
                                  <span className="text-[10px] text-start silka-regular text-gray-500">
                                    {formatAMPM(
                                      new Date(value?.created_at)
                                    ) +
                                      ' ' +
                                      new Date(
                                        value?.created_at
                                      ).getMonth() +
                                      '/' +
                                      new Date(
                                        value?.created_at
                                      ).getDate() +
                                      '/' +
                                      new Date(
                                        value?.created_at
                                      ).getFullYear()}
                                  </span>
                                </div>
                              </div>
                              <DropdownMenuPrimitive.Root>
                                <DropdownMenuPrimitive.Trigger
                                  asChild
                                >
                                  <button
                                    onMouseEnter={() =>
                                      setOptionsEnter(true)
                                    }
                                    onMouseLeave={() =>
                                      setOptionsEnter(false)
                                    }
                                    onClick={() => {}}
                                    className="my-auto p-1 rounded hover:bg-gray-50"
                                  >
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </button>
                                </DropdownMenuPrimitive.Trigger>

                                <DropdownMenuPrimitive.Portal>
                                  <DropdownMenuPrimitive.Content
                                    align="center"
                                    sideOffset={5}
                                    className={clsx(
                                      'w-36 rounded-lg px-1.5 py-1 shadow-md md:w-56',
                                      'bg-white'
                                    )}
                                  >
                                    <div className="flex flex-col space-y-0.5">
                                      <button className="flex flex-row space-x-2">
                                        <p></p>
                                      </button>
                                      <button className="flex flex-row space-x-2">
                                        <p></p>
                                      </button>
                                      <button className="flex flex-row space-x-2">
                                        <p></p>
                                      </button>
                                    </div>
                                  </DropdownMenuPrimitive.Content>
                                </DropdownMenuPrimitive.Portal>
                              </DropdownMenuPrimitive.Root>
                            </button>
                          </div>
                        );
                      })}
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </DashboardLayout>
    </PageHead>
  );
}
