import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import cx from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { useSession } from 'next-auth/react';
import { LinkedinScheduleText } from '../dialogs/ScheduleText';
import { LinkedinPostTextNow } from '../dialogs/PostTextNow';
import { LinkedinTextAvailableTimeSlot } from '../dialogs/TextAvailableTimeSlot';
import { ProUpgradeDialog } from '../../../layouts/upgrade/ProUpgradeDialog';

interface Props {
  workspaceId: string;
  draftId: string;
  postText: string;
  setRefetchTextDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedText: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
  userId: string;
}

async function getOptions(draftId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}linkedin/read/drafttextoptions`,
      {
        params: { draftId: draftId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateOptions(
  draftId: string,
  removeUrlPreview: boolean,
  autoPlugOpen: boolean,
  plugMetric: string,
  plugInputValue: number,
  plugText: string,
  autoReshareOpen: boolean,
  reshareMetric: string,
  reshareInputValue: number,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}linkedin/update/drafttextoptions`,
      null,
      {
        params: {
          draftId: draftId,
          removeUrlPreview: removeUrlPreview,
          autoPlugOpen: autoPlugOpen,
          plugMetric: plugMetric,
          plugInputValue: plugInputValue,
          plugText: plugText,
          autoReshareOpen: autoReshareOpen,
          reshareMetric: reshareMetric,
          reshareInputValue: reshareInputValue,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function TextOptions({
  workspaceId,
  draftId,
  postText,
  setRefetchTextDrafts,
  setSelectedText,
  isPremium,
  userId,
}: Props) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [removeUrlPreview, setRemoveUrlPreview] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const { data: session, status } = useSession();
  const [timeSlotsOpen, setTimeSlotsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [postNowOpen, setPostNowOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const [autoReshareOpen, setAutoReshareOpen] = useState(false);
  const [reshareMetric, setReshareMetric] = useState('Hours');
  const [reshareInputValue, setReshareInputValue] =
    useState<number>(0);

  const [autoPlugOpen, setAutoPlugOpen] = useState(false);
  const [plugMetric, setPlugMetric] = useState('Hours');
  const [plugInputValue, setPlugInputValue] = useState<number>(0);
  const [plugText, setPlugText] = useState('');

  useEffect(() => {
    if (status == 'authenticated') {
      if (draftId) {
        getOptions(draftId).then((value) => {
          setRemoveUrlPreview(value.remove_url_preview);
          setAutoPlugOpen(value.auto_plug);
          setPlugMetric(value.plug_metric);
          setPlugInputValue(value.plug_input_value);
          setPlugText(value.plug_text);
          setAutoReshareOpen(value.auto_reshare);
          setReshareMetric(value.reshare_metric);
          setReshareInputValue(value.reshare_input_value);
          setOptionsLoading(false);
        });
      } else {
        setRemoveUrlPreview(false);
        setAutoPlugOpen(false);
        setPlugMetric('Hours');
        setPlugInputValue(0);
        setPlugText('');
        setOptionsLoading(false);
        setAutoReshareOpen(false);
        setReshareMetric('Hours');
        setReshareInputValue(0);
      }
    }
  }, [draftId, status]);

  useEffect(() => {
    if (draftId && !optionsLoading) {
      updateOptions(
        draftId,
        removeUrlPreview,
        autoPlugOpen,
        plugMetric,
        plugInputValue,
        plugText,
        autoReshareOpen,
        reshareMetric,
        reshareInputValue,
        workspaceId
      );
    }
  }, [
    removeUrlPreview,
    autoPlugOpen,
    plugMetric,
    plugInputValue,
    plugText,
    autoReshareOpen,
    reshareMetric,
    reshareInputValue,
  ]);

  return (
    <div className="flex flex-col mt-6">
      <button
        onClick={(e) => {
          e.preventDefault();
          setOptionsOpen(!optionsOpen);
        }}
        className="flex flex-row space-x-1 justify-start items-start"
      >
        <p className="text-sm silka-medium">Post Options</p>
        {optionsOpen ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto mb-1"
          >
            <path
              d="M4.18179 8.81819C4.00605 8.64245 4.00605 8.35753 4.18179 8.18179L7.18179 5.18179C7.26618 5.0974 7.38064 5.04999 7.49999 5.04999C7.61933 5.04999 7.73379 5.0974 7.81819 5.18179L10.8182 8.18179C10.9939 8.35753 10.9939 8.64245 10.8182 8.81819C10.6424 8.99392 10.3575 8.99392 10.1818 8.81819L7.49999 6.13638L4.81819 8.81819C4.64245 8.99392 4.35753 8.99392 4.18179 8.81819Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto mb-1"
          >
            <path
              d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </button>
      {optionsOpen ? (
        <div className="flex flex-col space-y-6 mt-4">
          {/*
          <button
            onClick={(e) => {
              e.preventDefault();
              setRemoveUrlPreview(!removeUrlPreview);
            }}
            className="flex flex-row space-x-3"
          >
            <CheckboxPrimitive.Root
              id="c1"
              checked={removeUrlPreview}
              className={cx(
                'my-auto flex h-4 w-4 items-center justify-center rounded',
                'radix-state-checked:bg-[#0966C2] radix-state-unchecked:bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-[#0966C2] focus-visible:ring-opacity-75'
              )}
            >
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="h-4 w-4 self-center text-white" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <p className="text-sm silka-medium my-auto text-gray-900">
              Remove URL Preview
            </p>
          </button>
          */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setAutoReshareOpen(!autoReshareOpen);
              }}
              className="flex flex-row space-x-3 justify-start items-start"
            >
              <SwitchPrimitive.Root
                checked={autoReshareOpen}
                className={cx(
                  'group my-auto',
                  'radix-state-checked:bg-[#0966C2]',
                  'radix-state-unchecked:bg-gray-200',
                  'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                  'focus:outline-none focus-visible:ring-0'
                )}
              >
                <SwitchPrimitive.Thumb
                  className={cx(
                    'group-radix-state-checked:translate-x-4',
                    'group-radix-state-unchecked:translate-x-0',
                    'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </SwitchPrimitive.Root>
              <p className="text-sm silka-medium text-gray-900">
                Auto Reshare
              </p>
            </button>
            {autoReshareOpen ? (
              <div className="flex relative flex-col justify-center items-center">
                <div
                  className={
                    'flex flex-col justify-center items-center ' +
                    (isPremium ? '' : 'blur-[2px]')
                  }
                >
                  <h3 className="text-xl text-center silka-semibold text-gray-900">
                    Auto Reshare
                  </h3>
                  <p className="mt-2 text-xs text-center silka-regular text-gray-500">
                    Automically repost the post after a certain metric
                    is hit.
                  </p>
                  <div className="my-auto flex flex-row mt-4 space-x-2 px-2 py-1.5 bg-gray-50 rounded-lg">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setReshareMetric('Hours');
                      }}
                      className={
                        'px-4 py-1 rounded text-xs silka-medium ' +
                        (reshareMetric == 'Hours'
                          ? 'bg-white shadow text-gray-800'
                          : 'text-gray-500')
                      }
                    >
                      Hours
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setReshareMetric('Minutes');
                      }}
                      className={
                        'px-4 py-1 rounded text-xs silka-medium ' +
                        (reshareMetric == 'Minutes'
                          ? 'bg-white shadow text-gray-800'
                          : 'text-gray-500')
                      }
                    >
                      Minutes
                    </button>
                  </div>
                  <input
                    placeholder="#"
                    onChange={(e) => {
                      if (e.target.value.length == 0) {
                        setReshareInputValue(0);
                      } else {
                        let isnum =
                          String(e.target.value).match(/^[0-9]+$/) !=
                          null;
                        if (isnum) {
                          setReshareInputValue(
                            parseInt(e.target.value)
                          );
                        } else {
                          toast.error('Please input numbers..');
                        }
                      }
                    }}
                    value={reshareInputValue}
                    type="text"
                    className="mt-6 text-xs border border-gray-300 focus:ring-0 focus:border-[#0966C2] silka-medium text-gray-900 w-28 rounded"
                  />
                </div>
                {isPremium ? (
                  <></>
                ) : (
                  <div>
                    <DialogPrimitive.Root
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                    >
                      <DialogPrimitive.Trigger asChild>
                        <button className="absolute w-full h-full inset-0 flex justify-center items-center z-10">
                          <button className="flex flex-row bg-[#0966C2] hover:opacity-90 space-x-2 py-2 rounded-lg px-6">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="my-auto"
                            >
                              <path
                                d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                                fill="white"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <p className="silka-medium text-xs my-auto text-white">
                              Upgrade To Pro
                            </p>
                          </button>
                        </button>
                      </DialogPrimitive.Trigger>
                      <ProUpgradeDialog
                        isOpen={isDialogOpen}
                        setIsOpen={setIsDialogOpen}
                        workspaceId={workspaceId}
                        userId={String(session?.user?.id)}
                        userName={String(session?.user?.name)}
                        email={String(session?.user?.email)}
                      />
                    </DialogPrimitive.Root>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setAutoPlugOpen(!autoPlugOpen);
              }}
              className="flex flex-row space-x-3 justify-start items-start"
            >
              <SwitchPrimitive.Root
                checked={autoPlugOpen}
                className={cx(
                  'group my-auto',
                  'radix-state-checked:bg-[#0966C2]',
                  'radix-state-unchecked:bg-gray-200',
                  'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                  'focus:outline-none focus-visible:ring-0'
                )}
              >
                <SwitchPrimitive.Thumb
                  className={cx(
                    'group-radix-state-checked:translate-x-4',
                    'group-radix-state-unchecked:translate-x-0',
                    'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </SwitchPrimitive.Root>
              <p className="text-sm silka-medium text-gray-900">
                Auto Plug
              </p>
            </button>
            {autoPlugOpen ? (
              <div className="flex flex-col justify-center items-center relative">
                <div
                  className={
                    'flex flex-col justify-center items-center ' +
                    (isPremium ? '' : 'blur-[2px]')
                  }
                >
                  <h3 className="text-xl text-center silka-semibold text-gray-900">
                    Auto Plug
                  </h3>
                  <p className="mt-2 text-xs text-center silka-regular text-gray-500">
                    Automatically comment under a post after a certain
                    metric is hit.
                  </p>
                  <div className="my-auto flex flex-row mt-4 space-x-2 px-2 py-1.5 bg-gray-50 rounded-lg">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPlugMetric('Hours');
                      }}
                      className={
                        'px-4 py-1 rounded text-xs silka-medium ' +
                        (plugMetric == 'Hours'
                          ? 'bg-white shadow text-gray-800'
                          : 'text-gray-500')
                      }
                    >
                      Hours
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPlugMetric('Minutes');
                      }}
                      className={
                        'px-4 py-1 rounded text-xs silka-medium ' +
                        (plugMetric == 'Minutes'
                          ? 'bg-white shadow text-gray-800'
                          : 'text-gray-500')
                      }
                    >
                      Minutes
                    </button>
                  </div>
                  <input
                    placeholder="#"
                    onChange={(e) => {
                      if (e.target.value.length == 0) {
                        setPlugInputValue(0);
                      } else {
                        let isnum =
                          String(e.target.value).match(/^[0-9]+$/) !=
                          null;
                        if (isnum) {
                          setPlugInputValue(parseInt(e.target.value));
                        } else {
                          toast.error('Please input numbers..');
                        }
                      }
                    }}
                    value={plugInputValue}
                    type="text"
                    className="mt-6 text-xs border border-gray-300 focus:ring-0 focus:border-[#0966C2] silka-medium text-gray-900 w-28 rounded"
                  />
                  <div className="flex flex-col w-full space-y-2 mt-6">
                    <span className="silka-semibold text-gray-800 text-xs">
                      Plug Comment
                    </span>
                    <textarea
                      value={plugText}
                      onChange={(e) => {
                        e.preventDefault();
                        setPlugText(e.target.value);
                      }}
                      placeholder="Comment text..."
                      className="h-32 border silka-medium focus:ring-0 focus:border-[#0966C2] text-gray-800 text-sm border-gray-300 rounded-lg w-full resize-none"
                    />
                  </div>
                </div>
                {isPremium ? (
                  <></>
                ) : (
                  <div>
                    <DialogPrimitive.Root
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                    >
                      <DialogPrimitive.Trigger asChild>
                        <button className="absolute w-full h-full inset-0 flex justify-center items-center z-10">
                          <button className="flex flex-row bg-[#0966C2] hover:opacity-90 space-x-2 py-2 rounded-lg px-6">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="my-auto"
                            >
                              <path
                                d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                                fill="white"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <p className="silka-medium text-xs my-auto text-white">
                              Upgrade To Pro
                            </p>
                          </button>
                        </button>
                      </DialogPrimitive.Trigger>
                      <ProUpgradeDialog
                        isOpen={isDialogOpen}
                        setIsOpen={setIsDialogOpen}
                        workspaceId={workspaceId}
                        userId={String(session?.user?.id)}
                        userName={String(session?.user?.name)}
                        email={String(session?.user?.email)}
                      />
                    </DialogPrimitive.Root>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-row justify-center items-center mt-8 space-x-5">
        <DialogPrimitive.Root
          open={postNowOpen}
          onOpenChange={setPostNowOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button
              onClick={() => {
                if (!isPremium) {
                  setAutoPlugOpen(false);
                  setAutoReshareOpen(false);
                }
              }}
              className="text-xs hover:opacity-90 text-white bg-[#0966C2] silka-medium px-4 py-1.5 border rounded"
            >
              Post Now
            </button>
          </DialogPrimitive.Trigger>
          <LinkedinPostTextNow
            isOpen={postNowOpen}
            setIsOpen={setPostNowOpen}
            removeUrlPreview={removeUrlPreview}
            autoPlugOpen={autoPlugOpen}
            plugMetric={plugMetric}
            plugInputValue={plugInputValue}
            plugText={plugText}
            autoReshareOpen={autoReshareOpen}
            reshareMetric={reshareMetric}
            reshareInputValue={reshareInputValue}
            postText={postText}
            workspaceId={workspaceId}
            draftId={draftId}
            setRefetchTextDrafts={setRefetchTextDrafts}
            setSelectedText={setSelectedText}
            setOptionsOpen={setOptionsOpen}
            setRemovePreview={setRemoveUrlPreview}
            setAutoPlugOpen={setAutoPlugOpen}
            setAutoRepostOpen={setAutoReshareOpen}
          />
        </DialogPrimitive.Root>
        <DialogPrimitive.Root
          open={scheduleOpen}
          onOpenChange={setScheduleOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button
              onClick={() => {
                if (!isPremium) {
                  setAutoPlugOpen(false);
                  setAutoReshareOpen(false);
                }
              }}
              className="text-xs hover:opacity-90 text-white bg-[#363636] silka-medium px-4 py-1.5 border rounded"
            >
              Schedule Post
            </button>
          </DialogPrimitive.Trigger>
          <LinkedinScheduleText
            isOpen={scheduleOpen}
            setIsOpen={setScheduleOpen}
            workspaceId={workspaceId}
            removeUrlPreview={removeUrlPreview}
            autoPlugOpen={autoPlugOpen}
            plugMetric={plugMetric}
            plugInputValue={plugInputValue}
            plugText={plugText}
            autoReshareOpen={autoReshareOpen}
            reshareMetric={reshareMetric}
            reshareInputValue={reshareInputValue}
            draftId={draftId}
            setRefetchDrafts={setRefetchTextDrafts}
            setSelectedText={setSelectedText}
            timeSlotsOpen={timeSlotsOpen}
            setTimeSlotsOpen={setTimeSlotsOpen}
            postText={postText}
            setOptionsOpen={setOptionsOpen}
            setRemovePreview={setRemoveUrlPreview}
            setAutoPlugOpen={setAutoPlugOpen}
            setAutoRepostOpen={setAutoReshareOpen}
            userId={userId}
          />
        </DialogPrimitive.Root>
      </div>
      <DialogPrimitive.Root
        open={timeSlotsOpen}
        onOpenChange={setTimeSlotsOpen}
      >
        <LinkedinTextAvailableTimeSlot
          workspaceId={workspaceId}
          userId={String(session?.user?.id)}
          draftId={draftId}
          isOpen={timeSlotsOpen}
          setIsOpen={setTimeSlotsOpen}
          setScheduleOpen={setScheduleOpen}
          setSelectedText={setSelectedText}
          setRefetchDrafts={setRefetchTextDrafts}
        />
      </DialogPrimitive.Root>
    </div>
  );
}
