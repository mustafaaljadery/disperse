import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import cx from 'classnames';
import {
  Fragment,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../../utils/apiUrl';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setRefetchScheduled: Dispatch<SetStateAction<boolean>>;
}

async function getMyTimezone(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}user/read/timezone`, {
      params: { userId: userId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateMyTimezone(userId: string, timezone: number) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}user/update/timezone`,
      null,
      {
        params: {
          timezone: timezone,
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function MyTimezoneDialog({
  isOpen,
  userId,
  setIsOpen,
  setRefetchScheduled,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [timezone, setTimezone] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      getMyTimezone(userId).then((data) => {
        setTimezone(data);
        setIsLoading(false);
      });
    }
  }, [userId]);

  const date = new Date();
  const offset = date.getTimezoneOffset();
  const current_timezone = (parseInt(String(offset)) * -1) / 60;

  return (
    <Transition.Root show={isOpen}>
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
          className={cx(
            'fixed z-50',
            'w-[95vw] max-w-lg rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-1.5">
              <h2 className="silka-semibold text-gray-800 text-xl md:text-2xl">
                My Timezone
              </h2>
              <p className="text-[11px] md:text-xs silka-regular text-gray-400">
                Edit my timezone to fix a time change.
              </p>
            </div>
            {isLoading ? (
              <div className="flex flex-col space-y-2.5 mt-6">
                <div className="bg-gray-200 h-4 w-full animate-pulse rounded" />
                <div className="bg-gray-200 h-4 w-[85%] animate-pulse rounded" />
                <div className="bg-gray-200 g-4 w-[70%] animate-pulse rounded" />
              </div>
            ) : (
              <div className="flex flex-col space-y-8 mt-6 w-full">
                <div className="w-full flex flex-col space-y-1">
                  <label className="text-xs silka-medium">
                    Timezone
                  </label>
                  <div className="flex flex-row space-x-2">
                    <select
                      value={String(timezone)}
                      onChange={(e) => {
                        e.preventDefault();
                        setTimezone(e.target.value);
                      }}
                      className="w-full text-sm silka-regular text-gray-800 focus:ring-0 rounded border-[#E0E0E0] focus:border-[#FF623D] bg-[#F8F8F8]"
                    >
                      <option value="-12">
                        (GMT -12:00) Eniwetok, Kwajalein
                      </option>
                      <option value="-11">
                        (GMT -11:00) Midway Island, Samoa
                      </option>
                      <option value="-10">(GMT -10:00) Hawaii</option>
                      <option value="-9:50">
                        (GMT -9:30) Taiohae
                      </option>
                      <option value="-9">(GMT -9:00) Alaska</option>
                      <option value="-8">
                        (GMT -8:00) Pacific Time (US &amp; Canada)
                      </option>
                      <option value="-7">
                        (GMT -7:00) Mountain Time (US &amp; Canada)
                      </option>
                      <option value="-6">
                        (GMT -6:00) Central Time (US &amp; Canada),
                        Mexico City
                      </option>
                      <option value="-5">
                        (GMT -5:00) Eastern Time (US &amp; Canada),
                        Bogota, Lima
                      </option>
                      <option value="-4:50">
                        (GMT -4:30) Caracas
                      </option>
                      <option value="-4">
                        (GMT -4:00) Atlantic Time (Canada), Caracas,
                        La Paz
                      </option>
                      <option value="-3:50">
                        (GMT -3:30) Newfoundland
                      </option>
                      <option value="-3">
                        (GMT -3:00) Brazil, Buenos Aires, Georgetown
                      </option>
                      <option value="-2">
                        (GMT -2:00) Mid-Atlantic
                      </option>
                      <option value="-1">
                        (GMT -1:00) Azores, Cape Verde Islands
                      </option>
                      <option value="0">
                        (GMT) Western Europe Time, London, Lisbon,
                        Casablanca
                      </option>
                      <option value="+1">
                        (GMT +1:00) Brussels, Copenhagen, Madrid,
                        Paris
                      </option>
                      <option value="+2">
                        (GMT +2:00) Kaliningrad, South Africa
                      </option>
                      <option value="+3">
                        (GMT +3:00) Baghdad, Riyadh, Moscow, St.
                        Petersburg
                      </option>
                      <option value="+3">(GMT +3:30) Tehran</option>
                      <option value="+4">
                        (GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
                      </option>
                      <option value="+4:50">(GMT +4:30) Kabul</option>
                      <option value="+5">
                        (GMT +5:00) Ekaterinburg, Islamabad, Karachi,
                        Tashkent
                      </option>
                      <option value="+5:50">
                        (GMT +5:30) Bombay, Calcutta, Madras, New
                        Delhi
                      </option>
                      <option value="+5:75">
                        (GMT +5:45) Kathmandu, Pokhara
                      </option>
                      <option value="+6">
                        (GMT +6:00) Almaty, Dhaka, Colombo
                      </option>
                      <option value="+6:50">
                        (GMT +6:30) Yangon, Mandalay
                      </option>
                      <option value="+7">
                        (GMT +7:00) Bangkok, Hanoi, Jakarta
                      </option>
                      <option value="+8">
                        (GMT +8:00) Beijing, Perth, Singapore, Hong
                        Kong
                      </option>
                      <option value="+8:75">(GMT +8:45) Eucla</option>
                      <option value="+9">
                        (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo,
                        Yakutsk
                      </option>
                      <option value="+9:50">
                        (GMT +9:30) Adelaide, Darwin
                      </option>
                      <option value="+10">
                        (GMT +10:00) Eastern Australia, Guam,
                        Vladivostok
                      </option>
                      <option value="+10:50">
                        (GMT +10:30) Lord Howe Island
                      </option>
                      <option value="+11">
                        (GMT +11:00) Magadan, Solomon Islands, New
                        Caledonia
                      </option>
                      <option value="+11:50">
                        (GMT +11:30) Norfolk Island
                      </option>
                      <option value="+12">
                        (GMT +12:00) Auckland, Wellington, Fiji,
                        Kamchatka
                      </option>
                      <option value="+12:75">
                        (GMT +12:45) Chatham Islands
                      </option>
                      <option value="+13">
                        (GMT +13:00) Apia, Nukualofa
                      </option>
                      <option value="+14">
                        (GMT +14:00) Line Islands, Tokelau
                      </option>
                    </select>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setTimezone(String(current_timezone));
                      }}
                      className="w-1/2 py-2 my-auto h-max bg-gray-100 hover:bg-gray-200 rounded silka-medium text-gray-700 text-sm"
                    >
                      Auto Detect
                    </button>
                  </div>
                </div>
                <div className="flex flex-row space-x-3 w-full justify-end items-end">
                  <DialogPrimitive.Close>
                    <button className="text-xs hover:opacity-90 px-4 py-1.5 bg-[#363636] text-white silka-medium rounded">
                      Cancel
                    </button>
                  </DialogPrimitive.Close>
                  <DialogPrimitive.Close>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        updateMyTimezone(userId, timezone).then(
                          () => {
                            setRefetchScheduled(true);
                          }
                        );
                        setIsOpen(false);
                      }}
                      className="text-xs hover:opacity-90 px-4 py-1.5 bg-[#FF623D] text-white silka-medium rounded"
                    >
                      Update Timezone
                    </button>
                  </DialogPrimitive.Close>
                </div>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
