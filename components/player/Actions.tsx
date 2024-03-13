import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Link from 'next/link';
import { apiUrl } from '../../utils/apiUrl';

async function getSocials(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    const result = await axios.get(
      `${apiUrl()}workspace/read/connectedsocials`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface Props {
  workspaceId: string;
}

export function PlayerActions({ workspaceId }: Props) {
  const [socialsData, setSocialsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workspaceId) {
      getSocials(workspaceId).then((value) => {
        setSocialsData(value);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {!socialsData?.twitter &&
      !socialsData?.instagram &&
      !socialsData?.tiktok &&
      !socialsData?.youtube &&
      !socialsData?.linkedin &&
      !socialsData?.facebook ? (
        <div className="w-full flex mt-3 flex-col justify-center items-center">
          <p className="text-center silka-medium text-sm">
            No Socials Connected
          </p>
          <p className="text-center silka-regular text-gray-500 text-xs w-3/4 mt-1.5">
            Connnect a social to quickly post media on your socials.
          </p>
          <Link href={'/' + workspaceId + '/settings/integrations'} legacyBehavior>
            <button className="mt-4 text-xs silka-medium hover:opacity-90 text-white bg-[#FF623D] px-4 py-1 rounded">
              Connect Social
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      {socialsData?.twitter ? (
        <Link href={'/' + workspaceId + '/twitter/tweets'} legacyBehavior>
          <button className="flex flex-row space-x-4 hover:bg-gray-50 border rounded px-3 py-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="my-auto"
            >
              <path
                fill="#1D9BF0"
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              />
            </svg>
            <div className="flex flex-col justify-start items-start space-y-1">
              <h3 className="text-xs 2xl:text-sm silka-medium text-gray-900">
                Twitter
              </h3>
              <p className="text-[10px] 2xl:text-[11px] text-start silka-regular text-gray-600">
                Send to Twitter to create a tweet.
              </p>
            </div>
          </button>
        </Link>
      ) : (
        <></>
      )}
      {socialsData?.instagram ? (
        <Link href={'/' + workspaceId + '/instagram/posts'} legacyBehavior>
          <button className="flex flex-row space-x-4 hover:bg-gray-50 border rounded px-3 py-2.5">
            <img
              className="h-[22px] my-auto w-[22px]"
              src="/images/integrations/instagram-22.png"
            />
            <div className="flex flex-col justify-start items-start space-y-1">
              <h2 className="text-xs 2xl:text-sm silka-medium text-gray-900">
                Instagram
              </h2>
              <p className="text-[10px] 2xl:text-[11px] text-start silka-regular text-gray-600">
                Send to Instagram to create a post.
              </p>
            </div>
          </button>
        </Link>
      ) : (
        <></>
      )}
      {socialsData?.tiktok ? (
        <Link href={'/' + workspaceId + '/tiktok/videos'} legacyBehavior>
          <button className="flex flex-row space-x-4 hover:bg-gray-50 border rounded px-3 py-2.5">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M8.86355 8.67991V7.8323C8.56942 7.79052 8.27264 7.76903 7.97561 7.76758C4.34199 7.76758 1.38574 10.7243 1.38574 14.3579C1.38574 16.5868 2.49971 18.56 4.19904 19.7532C3.06116 18.5363 2.42847 16.9324 2.42944 15.2664C2.42944 11.6845 5.30165 8.76346 8.86355 8.67991Z"
                fill="#00F2EA"
              />
              <path
                d="M9.01882 18.2749C10.6401 18.2749 11.9625 16.9852 12.0229 15.3778L12.0284 1.02956H14.6498C14.5937 0.729876 14.5655 0.425847 14.5652 0.121094H10.985L10.9789 14.4699C10.9193 16.0767 9.59621 17.366 7.97536 17.366C7.48877 17.3662 7.00943 17.2476 6.5791 17.0204C7.14297 17.8072 8.05095 18.274 9.01882 18.2749ZM19.5461 5.90006V5.10267C18.5828 5.10364 17.6401 4.82328 16.8337 4.29636C17.5408 5.1104 18.4925 5.67306 19.5466 5.90006"
                fill="#00F2EA"
              />
              <path
                d="M16.8338 4.2966C16.0437 3.39248 15.6083 2.23215 15.6088 1.03125H14.6496C14.9005 2.37245 15.6899 3.55259 16.8338 4.2966ZM7.97544 11.3479C6.31403 11.3499 4.96775 12.6962 4.96582 14.3576C4.96679 15.4761 5.58788 16.5019 6.57869 17.0216C6.2085 16.5111 6.00927 15.897 6.00927 15.2665C6.01097 13.6051 7.35724 12.2583 9.01889 12.2564C9.32896 12.2564 9.62623 12.3076 9.90683 12.3957V8.74064C9.6127 8.69886 9.31592 8.67737 9.01889 8.67592C8.96673 8.67592 8.9153 8.67882 8.86362 8.67978V11.4873C8.57625 11.396 8.27681 11.3489 7.97544 11.3479Z"
                fill="#FF004F"
              />
              <path
                d="M19.5463 5.89916V8.68179C17.6895 8.68179 15.9699 8.08798 14.5652 7.08002V14.3559C14.5652 17.9896 11.6094 20.9458 7.97579 20.9458C6.57156 20.9458 5.26948 20.5027 4.19922 19.7512C5.4431 21.0926 7.18976 21.8548 9.019 21.8543C12.6526 21.8543 15.6089 18.898 15.6089 15.2649V7.98897C17.06 9.03242 18.8027 9.59291 20.59 9.59073V6.00952C20.2316 6.00952 19.8831 5.97064 19.546 5.89844"
                fill="#FF004F"
              />
              <path
                d="M14.5652 14.3576V7.08164C16.0163 8.12534 17.7591 8.68558 19.5463 8.68341V5.90102C18.4925 5.67379 17.5408 5.11089 16.834 4.2966C15.6901 3.55259 14.9007 2.37245 14.6498 1.03125H12.0287L12.0231 15.3795C11.963 16.9864 10.6404 18.2761 9.01907 18.2761C8.05144 18.2752 7.14322 17.8081 6.5796 17.0219C5.58879 16.5024 4.96745 15.4766 4.96624 14.3578C4.96817 12.6964 6.31445 11.3501 7.97586 11.3482C8.28544 11.3482 8.58271 11.3989 8.8638 11.4875V8.68003C5.3019 8.76358 2.42969 11.6846 2.42969 15.2665C2.42969 16.9987 3.1027 18.5756 4.19928 19.7533C5.3048 20.5316 6.62403 20.9486 7.97586 20.9474C11.6097 20.9474 14.5652 17.9912 14.5652 14.3576Z"
                fill="black"
              />
            </svg>

            <div className="flex flex-col justify-start items-start space-y-1">
              <h3 className="text-xs 2xl:text-sm silka-medium text-gray-900">
                Tiktok
              </h3>
              <p className="text-[10px] 2xl:text-[11px] text-start silka-regular text-gray-600">
                Send to Tiktok to create a video.
              </p>
            </div>
          </button>
        </Link>
      ) : (
        <></>
      )}
      {socialsData?.youtube ? (
        <Link href={'/' + workspaceId + '/youtube/videos'} legacyBehavior>
          <button className="flex flex-row space-x-4 hover:bg-gray-50 border rounded px-3 py-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="my-auto"
            >
              <path
                fill="#FF0000"
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
              />
            </svg>
            <div className="flex flex-col my-auto justify-start items-start space-y-1">
              <h3 className="text-xs 2xl:text-sm silka-medium text-gray-900">
                Youtube
              </h3>
              <p className="text-[10px] 2xl:text-[11px] text-start silka-regular text-gray-600">
                Send to Youtube to create a video.
              </p>
            </div>
          </button>
        </Link>
      ) : (
        <></>
      )}
      {socialsData?.linkedin ? (
        <Link href={'/' + workspaceId + '/linkedin/posts'} legacyBehavior>
          <button className="flex flex-row space-x-4 hover:bg-gray-50 border rounded px-3 py-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="my-auto"
            >
              <path
                fill="#0966C2"
                d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
              />
            </svg>
            <div className="flex flex-col justify-start my-auto items-start space-y-1">
              <h3 className="text-xs 2xl:text-sm silka-medium text-gray-900">
                Linkedin
              </h3>
              <p className="text-[10px] 2xl:text-[11px] text-start silka-regular text-gray-600">
                Send to Linkedin to create a post.
              </p>
            </div>
          </button>
        </Link>
      ) : (
        <></>
      )}
      {socialsData?.facebook ? (
        <Link href={'/' + workspaceId + '/facebook/posts'} legacyBehavior>
          <button className="flex flex-row space-x-4 hover:bg-gray-50 border rounded px-3 py-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="my-auto"
            >
              <path
                fill="#0B7DEB"
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
              />
            </svg>
            <div className="flex flex-col justify-start items-start space-y-1">
              <h3 className="text-xs 2xl:text-sm silka-medium text-gray-900">
                Facebook
              </h3>
              <p className="text-[10px] 2xl:text-[11px] text-start silka-regular text-gray-600">
                Send to Facebook to create a post.
              </p>
            </div>
          </button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
