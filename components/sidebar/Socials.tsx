import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface SocialProps {
  title: string;
  color: string;
  backgroundColor: string;
}

interface Props {
  workspaceId: string;
  pathname: any;
}

export function SidebarSocials({ workspaceId, pathname }: Props) {
  const [socials, setSocials] = useState<any>(null);
  const [totalSocials, setTotalSocials] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  axiosRetry(axios, { retries: 3 });

  async function getSocials() {
    try {
      const result = await axios.get(
        `${apiUrl()}workspace/read/connectedsocials`,
        { params: { workspaceId: workspaceId } }
      );
      if (result.data.facebook) {
        setTotalSocials(totalSocials + 1);
      }
      if (result.data.instagram) {
        setTotalSocials(totalSocials + 1);
      }
      if (result.data.twitter) {
        setTotalSocials(totalSocials + 1);
      }
      if (result.data.youtube) {
        setTotalSocials(totalSocials + 1);
      }
      if (result.data.tiktok) {
        setTotalSocials(totalSocials + 1);
      }
      if (result.data.linkedin) {
        setTotalSocials(totalSocials + 1);
      }
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSocials().then((value) => {
      setSocials(value);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="mt-2 flex flex-col space-y-2">
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1 mt-2">
      {totalSocials > 0 ? (
        <div className="flex flex-col space-y-2">
          {socials.twitter ? (
            <Link href={'/' + workspaceId + '/twitter'} legacyBehavior>
              <button
                className={
                  'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#E9F0F5] ' +
                  (pathname.includes('/[workspaceId]/twitter')
                    ? 'bg-[#E9F0F5]'
                    : '')
                }
              >
                <div className="p-2 rounded my-auto bg-[#1D98F0]"></div>
                <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                  Twitter
                </a>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {socials.youtube ? (
            <Link href={'/' + workspaceId + '/youtube'} legacyBehavior>
              <button
                className={
                  'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#F6E7E7] ' +
                  (pathname.includes('/[workspaceId]/youtube')
                    ? 'bg-[#F6E7E7]'
                    : '')
                }
              >
                <div className="p-2 rounded my-auto bg-[#FF0000]"></div>
                <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                  Youtube
                </a>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {socials.instagram ? (
            <Link href={'/' + workspaceId + '/instagram'} legacyBehavior>
              <button
                className={
                  'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#F6E7F3] ' +
                  (pathname.includes('/[workspaceId]/instagram')
                    ? 'bg-[#F6E7F3]'
                    : '')
                }
              >
                <div className="p-2 rounded my-auto bg-[#F604D0]"></div>
                <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                  Instagram
                </a>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {socials.linkedin ? (
            <Link href={'/' + workspaceId + '/linkedin'} legacyBehavior>
              <button
                className={
                  'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#E8EDF3] ' +
                  (pathname.includes('/[workspaceId]/linkedin')
                    ? 'bg-[#E8EDF3]'
                    : '')
                }
              >
                <div className="p-2 rounded my-auto bg-[#0966C2]"></div>
                <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                  Linkedin
                </a>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {socials.tiktok ? (
            <Link href={'/' + workspaceId + '/tiktok'} legacyBehavior>
              <button
                className={
                  'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#EAEAEA] ' +
                  (pathname.includes('/[workspaceId]/tiktok')
                    ? 'bg-[#EAEAEA]'
                    : '')
                }
              >
                <div className="p-2 rounded my-auto bg-[#363636]" />
                <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                  Tiktok
                </a>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {socials.facebook ? (
            <Link href={'/' + workspaceId + '/facebook'} legacyBehavior>
              <button
                className={
                  'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#E7EEF5] ' +
                  (pathname.includes('/[workspaceId]/facebook')
                    ? 'bg-[#E7EEF5]'
                    : '')
                }
              >
                <div className="p-2 rounded my-auto bg-[#0572E7]"></div>
                <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                  Facebook
                </a>
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="mt-3 w-full py-3 px-2 bg-[#FBFBFB] rounded-lg shadow">
          <p className="text-xs silka-medium text-[#2D2D2D]">
            No Socials Added
          </p>
          <p className="text-[10px] mt-1 silka-regular text-[#777777]">
            Add a social to automate your posting on that platform.
          </p>
          <Link href={'/' + workspaceId + '/settings/integrations'} legacyBehavior>
            <button className="mt-2 border hover:bg-[#FF4317] text-white text-xs py-1.5 silka-regular w-full rounded-lg bg-[#FF623D] flex flex-col justify-center items-center">
              Add new Social
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
