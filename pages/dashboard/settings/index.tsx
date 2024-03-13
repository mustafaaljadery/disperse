import { useRouter } from 'next/router';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { LoadingScreen } from '../../../components/Loading';
import { DashboardTopbar } from '../../../layouts/DashboardTopbar';
import Link from 'next/link';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as LabelPrimitive from '@radix-ui/react-label';
import cx from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DeleteAccountDialog } from '../../../components/dashboard/DeleteAccountDialog';
import { apiUrl } from '../../../utils/apiUrl';
import Image from 'next/image';
import { PageHead } from '../../../layouts/PageHead';
import toast from 'react-hot-toast';

async function getUserInfo(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}user/read/userinfo`, {
      params: { userId: userId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function checkImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export default function DashboardActivity() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const [verifiedEmail, setVerifiedEmail] = useState(false);

  // Email Preferences
  const [weeklyAnalytics, setWeeklyAnalytics] = useState(true);
  const [promotionsAndSales, setPromotionsAndSales] = useState(true);
  const [workspaceErrors, setWorkspaceErrors] = useState(true);
  const [newTeammembers, setNewTeammembers] = useState(true);

  async function handlePersonalInfoSubmit(e: any) {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${apiUrl()}user/update/personalinformation`,
        null,
        {
          params: {
            userId: session?.user?.id,
            name: name,
            email: email,
            username: username,
            timezone: selectedTimezone,
          },
        }
      );
      toast.success('Successfully updated!', {
        className: 'silka-medium text-[#363636] text-sm',
      });
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdateAvatar() {
    try {
      const imageResult = checkImage(avatarUrl);
      //@ts-ignore
      if (imageResult) {
      } else {
        toast.error('Invalid Image Url', {
          className: 'silka-medium text-gray-900 text-sm',
          duration: 4000,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleEmailPreferences() {
    try {
      const result = await axios.post(
        `${apiUrl()}user/update/emailpreferences`,
        null,
        {
          params: {
            userId: session?.user?.id,
            weeklyAnalytics: weeklyAnalytics,
            promotionsAndSales: promotionsAndSales,
            workspaceErrors: workspaceErrors,
            newTeammembers: newTeammembers,
          },
        }
      );
      toast.success('Preferences updated!', {
        className: 'silka-medium text-[#363636] text-sm',
      });
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  const date = new Date();
  const offset = date.getTimezoneOffset();
  const current_timezone = (parseInt(String(offset)) * -1) / 60;

  useEffect(() => {
    if (status == 'authenticated') {
      getUserInfo(String(session?.user.id)).then((value) => {
        setUserInfo(value);
        setName(value.name);
        setEmail(value.email);
        setUsername(value.username);
        setSelectedTimezone(value.timezone);
        setWeeklyAnalytics(value.email_weekly_analytics);
        setVerifiedEmail(value.verifiedEmail);
        setPromotionsAndSales(value.email_promotions_and_sales);
        setWorkspaceErrors(value.email_workspace_errors);
        setNewTeammembers(value.email_new_teammembers);
        setIsLoading(false);
      });
    }
  }, [status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead
      title="User Settings · Disperse"
      description="Customize your Disperse profile."
    >
      <>
        <DashboardTopbar pathname={pathname} userInfo={userInfo} />
        <main className="flex flex-col justify-center items-center">
          <div className="w-[90%] lg:w-[70%] 2xl:w-3/5 mt-6 lg:mt-12 flex flex-col lg:flex-row lg:space-x-5">
            <div className="flex flex-col space-y-2 w-full lg:w-1/5">
              <Link
                href="/dashboard/settings"
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname == '/dashboard/settings'
                    ? 'silka-medium bg-gray-100'
                    : 'silka-regular text-gray-900')
                }
              >
                General
              </Link>
              <Link
                href="/dashboard/settings/billing"
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname == '/dashboard/settings/billing'
                    ? 'silka-medium'
                    : 'silka-regular text-gray-900')
                }
              >
                Billing
              </Link>
              <Link
                href="/dashboard/settings/tokens"
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname == '/dashboard/settings/tokens'
                    ? 'silka-medium'
                    : 'silka-regular text-gray-900')
                }
              >
                Tokens
              </Link>
            </div>
            <div className="flex flex-col w-full lg:w-4/5">
              <div className="flex flex-col space-y-1">
                <h1 className="text-sm text-gray-900 lg:text-base silka-semibold">
                  General
                </h1>
                <p className="silka-regular text-xs lg:text-sm">
                  Personal account settings for{' '}
                  <span className="silka-medium">Max Aljadery</span>.
                </p>
              </div>
              <div className="mt-8 border rounded-lg border-[#] p-6 flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 flex flex-row space-x-3">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-0.5"
                  >
                    <path
                      d="M16.8618 12.878L13.4473 9.46349C12.935 8.95121 12.2766 8.68292 11.5449 8.68292L6.56932 8.68309C5.8621 8.68309 5.17901 8.95139 4.66691 9.46366L1.2524 12.8782C0.935282 13.1953 0.764648 13.6342 0.764648 14.0733C0.764648 14.5368 0.935461 14.9513 1.2524 15.2928L2.20361 16.244C2.52073 16.5611 2.95965 16.7563 3.42311 16.7563C3.88656 16.7563 4.30114 16.5855 4.61826 16.244L5.00853 15.8537V18.2927C5.00853 19.2439 5.76458 20 6.71579 20H11.3743C12.3255 20 13.0815 19.2439 13.0815 18.2927L13.0813 15.8536L13.4716 16.2438C13.7887 16.561 14.2277 16.7561 14.6911 16.7561C15.1546 16.7561 15.5692 16.5853 15.8863 16.2438L16.8375 15.2926C17.5204 14.6097 17.5204 13.5366 16.8618 12.878L16.8618 12.878ZM15.8131 14.244L14.8619 15.1952C14.7644 15.2926 14.6179 15.2926 14.5204 15.1952L12.8863 13.561C12.6668 13.3416 12.374 13.2927 12.0815 13.3902C11.8132 13.5122 11.618 13.7805 11.618 14.0731V18.2926C11.618 18.4389 11.5205 18.5365 11.374 18.5365H6.73994C6.59363 18.5365 6.49598 18.439 6.49598 18.2926V14.0731C6.49598 13.7805 6.32516 13.5122 6.03252 13.3902C5.93504 13.3414 5.83738 13.3414 5.76423 13.3414C5.56908 13.3414 5.37395 13.4146 5.25195 13.5609L3.61783 15.195C3.52034 15.2925 3.37386 15.2925 3.27637 15.195L2.32517 14.2438C2.22768 14.1463 2.22768 13.9998 2.32517 13.9023L5.73967 10.4878C5.95914 10.2684 6.27625 10.1221 6.5934 10.1221H11.5933C11.9105 10.1221 12.2274 10.244 12.4471 10.4878L15.8616 13.9023C15.9104 13.9512 15.9347 13.9998 15.9347 14.0731C15.9349 14.1463 15.8616 14.1951 15.8129 14.244L15.8131 14.244Z"
                      fill="black"
                    />
                    <path
                      d="M9.05697 8.0732C11.2765 8.0732 13.0812 6.2683 13.0812 4.04895C13.0812 1.80494 11.2764 0 9.05697 0C6.83748 0 5.03271 1.8049 5.03271 4.02425C5.03271 6.26825 6.83748 8.0732 9.05697 8.0732ZM9.05697 1.46353C10.4716 1.46353 11.618 2.60985 11.618 4.02451C11.618 5.43917 10.4716 6.6098 9.05697 6.6098C7.64231 6.6098 6.49598 5.46347 6.49598 4.04881C6.49598 2.63416 7.64231 1.46353 9.05697 1.46353V1.46353Z"
                      fill="black"
                    />
                  </svg>

                  <h2 className="text-base silka-semibold">
                    Personal Information
                  </h2>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePersonalInfoSubmit(e);
                  }}
                  className="w-full md:w-2/3 flex flex-col mt-4 md:mt-0"
                >
                  <div className="flex flex-row space-x-3">
                    <div className="w-1/2 flex flex-col space-y-1">
                      <label className="text-xs silka-medium">
                        Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="w-full text-sm silka-regular text-gray-800 focus:ring-0 rounded border border-[#E0E0E0] focus:border-[#FF623D] bg-[#F8F8F8]"
                      />
                    </div>
                    <div className="w-1/2 flex flex-col space-y-1">
                      <label className="text-xs silka-medium">
                        Username
                      </label>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="w-full text-sm silka-regular text-gray-800 focus:ring-0 rounded border border-[#E0E0E0] focus:border-[#FF623D] bg-[#F8F8F8]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3 mt-3 w-full">
                    <div className="w-full md:w-1/2 flex flex-col space-y-1">
                      <label className="text-xs silka-medium">
                        Email
                      </label>
                      <input
                        value={email}
                        type="email"
                        className="w-full text-sm silka-regular text-gray-800 focus:ring-0 rounded border border-[#E0E0E0] focus:border-[#FF623D] bg-[#F8F8F8]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-3 mt-3">
                    <div className="w-1/2 flex flex-col space-y-1">
                      <label className="text-xs silka-medium">
                        Timezone
                      </label>
                      <select
                        value={String(selectedTimezone)}
                        onChange={(e) => {
                          e.preventDefault();
                          setSelectedTimezone(e.target.value);
                        }}
                        className="w-full text-sm silka-regular text-gray-800 focus:ring-0 rounded border-[#E0E0E0] focus:border-[#FF623D] bg-[#F8F8F8]"
                      >
                        <option value="-12">
                          (GMT -12:00) Eniwetok, Kwajalein
                        </option>
                        <option value="-11">
                          (GMT -11:00) Midway Island, Samoa
                        </option>
                        <option value="-10">
                          (GMT -10:00) Hawaii
                        </option>
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
                        <option value="+4:50">
                          (GMT +4:30) Kabul
                        </option>
                        <option value="+5">
                          (GMT +5:00) Ekaterinburg, Islamabad,
                          Karachi, Tashkent
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
                        <option value="+8:75">
                          (GMT +8:45) Eucla
                        </option>
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
                    </div>
                    <div className="w-1/2 flex flex-col space-y-1 justify-center items-start">
                      <label className="text-xs silka-medium invisible">
                        Auto Detect
                      </label>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTimezone(
                            String(current_timezone)
                          );
                        }}
                        className="w-1/2 h-full bg-[#EBEBEB] hover:opacity-80 rounded silka-semibold text-gray-700 text-sm"
                      >
                        Auto Detect
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-end items-end mt-8">
                    <button
                      type="submit"
                      className="text-xs silka-medium bg-[#FF623D] border border-[#FF4317] hover:opacity-90 py-1.5 px-5 rounded text-white"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-12 border rounded-lg p-6 flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 flex flex-row space-x-3">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-0.5"
                  >
                    <path
                      d="M6.66257 12.6001C5.51463 12.6001 4.50972 13.364 4.50972 14.4021C4.50972 14.9549 3.90505 15.4811 3.06922 15.4811C2.53961 15.4811 2.08908 15.2569 1.84668 14.9602C1.71215 14.7964 1.46574 14.7838 1.31513 14.933L1.1822 15.0658C1.08705 15.1624 1.05426 15.304 1.09718 15.4326C1.59045 16.9309 3.09301 18 4.8659 18C6.28583 18 7.39184 17.3989 8.10595 16.4462C8.79584 17.3713 9.91678 18 11.3351 18C13.1083 18 14.6107 16.9313 15.1038 15.4326C15.1467 15.3041 15.114 15.1624 15.0188 15.0658L14.8859 14.933C14.7348 14.7798 14.4839 14.7925 14.349 14.9602C14.1068 15.2574 13.6622 15.4811 13.1318 15.4811C12.2958 15.4811 11.6913 14.9547 11.6913 14.4021C11.6913 13.364 10.6864 12.6001 9.53843 12.6001C8.96043 12.6001 8.49592 12.7718 8.09921 13.0722C7.71008 12.77 7.24235 12.6001 6.66274 12.6001H6.66257ZM6.66257 13.3231C7.15922 13.3231 7.58568 13.5198 7.83738 13.7908C7.97979 13.9432 8.22137 13.9432 8.36362 13.7908C8.61517 13.5198 9.04173 13.3231 9.53843 13.3231C10.3744 13.3231 10.9736 13.8495 10.9736 14.4021C10.9736 15.3985 12.1341 16.6088 13.9637 16.0621C13.2044 16.9483 12.1584 17.2831 11.3351 17.2831C10.0324 17.2831 8.92862 16.5911 8.41682 15.6246C8.28052 15.374 7.92062 15.374 7.78434 15.6246C7.27254 16.5911 6.1688 17.2831 4.86606 17.2831C4.04294 17.2831 2.96861 16.9483 2.24869 16.0565C4.03027 16.6117 5.22758 15.3985 5.22758 14.4021C5.22758 13.8493 5.82694 13.3231 6.66277 13.3231H6.66257Z"
                      fill="black"
                    />
                    <path
                      d="M3.77976 4.2895C3.75918 4.2924 3.73877 4.2969 3.719 4.30316C2.26644 4.64955 1.18952 5.13237 0.558479 5.75988C0.242958 6.07347 0.0386596 6.43626 0.00475385 6.83536C-0.029161 7.23462 0.119679 7.64095 0.409964 7.98572C0.990682 8.67561 2.04044 9.16131 3.3747 9.51737C4.70896 9.87339 6.33154 10.0798 8.06143 10.0823C9.7914 10.0851 11.4262 9.88253 12.7683 9.53103C14.1106 9.17918 15.1657 8.69762 15.7601 8.01304C16.0572 7.67084 16.2235 7.26918 16.199 6.86943C16.1747 6.46968 15.968 6.10321 15.6588 5.78703C15.0403 5.15488 13.9835 4.66786 12.5388 4.31666L12.5385 4.31682C12.4438 4.28692 12.3411 4.29785 12.2548 4.3472C12.1685 4.39638 12.1063 4.47932 12.0828 4.57657C12.0595 4.67365 12.077 4.7762 12.1313 4.85994C12.1857 4.94352 12.272 5.00074 12.3697 5.01794C13.74 5.35114 14.7021 5.8311 15.152 6.29097C15.377 6.52097 15.4717 6.73236 15.4829 6.91719C15.4944 7.10204 15.4267 7.29813 15.2195 7.53667C14.8051 8.0139 13.8541 8.49768 12.5857 8.83011C11.3174 9.16267 9.74233 9.35684 8.0677 9.35425C6.39319 9.35168 4.8162 9.15237 3.55667 8.81645C2.29702 8.48052 1.35654 7.9914 0.956628 7.51626C0.756675 7.2787 0.697685 7.08211 0.713437 6.89678C0.729189 6.71146 0.8327 6.50797 1.06464 6.2773C1.52838 5.81616 2.50193 5.33333 3.88071 5.00428C4.06797 4.96731 4.19366 4.78889 4.16665 4.59842C4.13965 4.40795 3.96943 4.27229 3.77945 4.28949L3.77976 4.2895Z"
                      fill="black"
                    />
                    <path
                      d="M5.85522 0.000963617C4.48368 0.0978871 3.39697 1.2412 3.39697 2.64903V5.87575C3.39697 6.2464 3.57651 6.58201 3.84269 6.84914C4.10886 7.11612 4.46616 7.33666 4.8894 7.51619C5.73598 7.87543 6.85647 8.08115 8.09716 8.08115C9.33784 8.08115 10.4653 7.87541 11.3117 7.51619C11.7349 7.33681 12.0922 7.11612 12.3584 6.84914C12.6246 6.58216 12.8041 6.24625 12.8041 5.87575V2.64903C12.8041 1.24182 11.7166 0.0989776 10.3458 0.000963617H10.3462C10.2436 -0.0065907 10.1427 0.0305385 10.0692 0.103031C9.54137 0.617048 8.83766 0.903807 8.10408 0.906235C7.36857 0.904949 6.6612 0.61804 6.13204 0.103031C6.05858 0.0305406 5.95764 -0.00659111 5.85509 0.000963617H5.85522ZM5.90248 0.729402C6.53368 1.24762 7.27722 1.62663 8.0973 1.6279H8.10405C8.92684 1.6271 9.67313 1.2505 10.3056 0.729402C11.3083 0.806715 12.0885 1.61778 12.0885 2.64903V5.87575C12.0885 6.01463 12.0258 6.16427 11.852 6.33866C11.6784 6.5129 11.398 6.69517 11.0349 6.84914C10.3087 7.15727 9.25634 7.35962 8.09713 7.35962C6.93792 7.35962 5.89252 7.15742 5.16618 6.84914C4.80308 6.69516 4.52258 6.51289 4.34902 6.33866C4.17543 6.16443 4.11258 6.01447 4.11258 5.87575V2.64903C4.11258 1.61729 4.89888 0.805731 5.90218 0.729402H5.90248Z"
                      fill="black"
                    />
                    <path
                      d="M3.74774 3.66324C3.5502 3.66742 3.39316 3.83169 3.39654 4.03083C3.39654 4.40149 3.57608 4.73709 3.84225 5.00423C4.10843 5.27121 4.46572 5.49174 4.88897 5.67144C5.73554 6.03068 6.85603 6.2364 8.09672 6.2364C9.33757 6.2364 10.4648 6.03066 11.3112 5.67144C11.7344 5.49174 12.0918 5.27137 12.3579 5.00423C12.6241 4.73725 12.8037 4.40149 12.8037 4.03083H12.8038C12.8101 3.93118 12.7752 3.83329 12.7075 3.76048C12.6397 3.68767 12.545 3.64636 12.4459 3.64636C12.3469 3.64636 12.2522 3.68767 12.1843 3.76048C12.1167 3.83329 12.0816 3.93118 12.0881 4.03083C12.0881 4.16971 12.0254 4.31935 11.8516 4.49375C11.678 4.66798 11.3976 4.85009 11.0345 5.00423C10.3083 5.31235 9.25595 5.5147 8.09673 5.5147C6.93752 5.5147 5.89212 5.3125 5.16578 5.00423C4.80268 4.85024 4.52219 4.66797 4.34863 4.49375C4.17507 4.31952 4.11219 4.16971 4.11219 4.03083H4.11235C4.11412 3.93279 4.07618 3.83844 4.00739 3.76916C3.93859 3.69988 3.84489 3.66163 3.7478 3.66324H3.74774Z"
                      fill="black"
                    />
                  </svg>

                  <h2 className="text-base silka-semibold">Avatar</h2>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateAvatar();
                  }}
                  className="w-full md:w-2/3 flex flex-col mt-4 md:mt-0 space-y-8"
                >
                  <div className="flex flex-row space-x-3">
                    <div className="w-3/4 md:w-1/2 flex flex-col space-y-1">
                      <label className="text-xs silka-medium">
                        Avatar Url
                      </label>
                      <input
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://avatar-url.png"
                        type="text"
                        className="w-full text-sm silka-regular text-gray-800 focus:ring-0 rounded border border-[#E0E0E0] focus:border-[#FF623D] bg-[#F8F8F8]"
                      />
                    </div>
                    <div className="w-1/4 md:w-1/2 flex flex-col space-y-1 items-center justify-center">
                      <button disabled={true}>
                        <Image
                          className="rounded-full"
                          alt="avatar"
                          src={userInfo.image}
                          width={70}
                          height={70}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-end items-end">
                    <button
                      type="submit"
                      className="text-xs silka-medium bg-[#FF623D] border border-[#FF4317] hover:opacity-90 py-1.5 px-5 rounded text-white"
                    >
                      Update Avatar
                    </button>
                  </div>
                </form>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailPreferences();
                }}
                className="mt-12 flex flex-col"
              >
                <h2 className="silka-bold text-lg">
                  Email Preferences
                </h2>
                <hr className="my-4" />
                <div className="flex flex-col space-y-6 mt-2">
                  <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
                    <div className="w-full md:w-1/2 flex flex-row space-x-4">
                      <CheckboxPrimitive.Root
                        id="c1"
                        checked={weeklyAnalytics}
                        onCheckedChange={() => {
                          setWeeklyAnalytics(!weeklyAnalytics);
                        }}
                        className={cx(
                          'flex h-5 w-5 items-center justify-center rounded',
                          'radix-state-checked:bg-[#FF623D] radix-state-unchecked:bg-gray-100',
                          'focus:outline-none focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75'
                        )}
                      >
                        <CheckboxPrimitive.Indicator>
                          <CheckIcon className="h-4 w-4 self-center text-white" />
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                      <LabelPrimitive.Label
                        htmlFor="c1"
                        className="ml-3 select-none text-sm silka-medium text-gray-900"
                      >
                        Weekly Analytics from your Disperse workspaces
                      </LabelPrimitive.Label>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-row space-x-4">
                      <CheckboxPrimitive.Root
                        id="c2"
                        checked={workspaceErrors}
                        onCheckedChange={() =>
                          setWorkspaceErrors(!workspaceErrors)
                        }
                        className={cx(
                          'flex h-5 w-5 items-center justify-center rounded',
                          'radix-state-checked:bg-[#FF623D] radix-state-unchecked:bg-gray-100',
                          'focus:outline-none focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75'
                        )}
                      >
                        <CheckboxPrimitive.Indicator>
                          <CheckIcon className="h-4 w-4 self-center text-white" />
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                      <LabelPrimitive.Label
                        htmlFor="c2"
                        className="select-none text-sm silka-medium text-gray-900"
                      >
                        Workspace and project errors
                      </LabelPrimitive.Label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5 mt-4">
                    <div className="w-full md:w-1/2 flex flex-row space-x-4">
                      <CheckboxPrimitive.Root
                        id="c3"
                        checked={newTeammembers}
                        onCheckedChange={() => {
                          setNewTeammembers(!newTeammembers);
                        }}
                        className={cx(
                          'flex h-5 w-5 items-center justify-center rounded',
                          'radix-state-checked:bg-[#FF623D] radix-state-unchecked:bg-gray-100',
                          'focus:outline-none focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75'
                        )}
                      >
                        <CheckboxPrimitive.Indicator>
                          <CheckIcon className="h-4 w-4 self-center text-white" />
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                      <LabelPrimitive.Label
                        htmlFor="c3"
                        className="select-none text-sm silka-medium text-gray-900"
                      >
                        New teammembers in your workspace
                      </LabelPrimitive.Label>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-row space-x-4">
                      <CheckboxPrimitive.Root
                        id="c4"
                        checked={promotionsAndSales}
                        onCheckedChange={() => {
                          setPromotionsAndSales(!promotionsAndSales);
                        }}
                        className={cx(
                          'flex h-5 w-5 items-center justify-center rounded',
                          'radix-state-checked:bg-[#FF623D] radix-state-unchecked:bg-gray-100',
                          'focus:outline-none focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75'
                        )}
                      >
                        <CheckboxPrimitive.Indicator>
                          <CheckIcon className="h-4 w-f self-center text-white" />
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                      <LabelPrimitive.Label
                        htmlFor="c4"
                        className="select-none text-sm silka-medium text-gray-900"
                      >
                        Promotional &amp; marketing emails
                      </LabelPrimitive.Label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-fit mt-8 text-xs text-white silka-medium rounded bg-[#FF623D] py-1.5 px-5"
                >
                  Save Preferences
                </button>
              </form>
              <div className="flex flex-col space-y-6 mt-16 mb-24">
                <h2 className="silka-bold text-2xl text-[#B62D13]">
                  Danger Zone
                </h2>
                <div className="border rounded-lg p-6 flex flex-col">
                  <h3 className="silka-semibold text-lg text-[#B62D13]">
                    Delete Personal Account
                  </h3>
                  <p className="silka-regular text-xs md:text-sm mt-2">
                    Be wary, this action is not reversible. You will
                    lose all information stored in Disperse about your
                    acccount, your analytics to each of your socials
                    accounts, and the media in your workspaces.{' '}
                  </p>
                  <div className="flex flex-row justify-end items-end mt-5 md:mt-4">
                    <DialogPrimitive.Root
                      open={isOpen}
                      onOpenChange={setIsOpen}
                    >
                      <DialogPrimitive.Trigger asChild>
                        <button className="w-fit px-5 py-1.5 text-xs silka-medium text-white bg-[#B62D13] rounded hover:opacity-90">
                          Delete Account
                        </button>
                      </DialogPrimitive.Trigger>
                      <DeleteAccountDialog
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        userId={String(session?.user?.id)}
                      />
                    </DialogPrimitive.Root>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    </PageHead>
  );
}
