import Link from 'next/link';
import { AutomationIcon } from '../icons/AutomationIcon';
import React, { useState, useRef, useEffect } from 'react';
import { NewMediaIcon } from '../icons/NewMedia';
import { SearchIcon } from '../icons/Search';
import { SettingsIcon } from '../icons/SettingsIcon';
import { SideBarWorkspace } from './Workspace';
import { useRouter } from 'next/router';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { SearchDialog } from './dialog/Search';
import { NewMediaDialog } from './dialog/NewMedia';
import { SidebarMediaAndSocials } from './SidebarMediaAndSocials';
import { SidebarAutomation } from './Automation';

export function Sidebar({ socials }: any) {
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceId, setWorkspaceId] = useState('');
  const [widnowWidth, setWindowWidth] = useState<any>(null);
  const [windowHeight, setWindowHeight] = useState<any>(null);
  const [otherWidth, setOtherWidth] = useState<any>(null);
  const [otherHeight, setOtherHeight] = useState<any>(null);
  const [bottomHeight, setBottomHeight] = useState<any>(1);
  const [mediaHeight, setMediaHeight] = useState<any>(null);
  const [newMediaOpen, setNewMediaOpen] = useState(false);
  let [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const ref = useRef(null);
  const otherRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(String(router.query.workspaceId));
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      setIsLoading(false);
      window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    //@ts-ignore
    setWindowHeight(ref?.current?.clientHeight);
    //@ts-ignore
    setWindowWidth(ref?.current?.clientWidth);

    //@ts-ignore
    setOtherHeight(otherRef?.current?.clientHeight);
    //@ts-ignore
    setOtherWidth(otherRef?.current?.clientWidth);

    setBottomHeight(
      //@ts-ignore
      bottomRef?.current?.clientHeight
        ? //@ts-ignore
          bottomRef?.current?.clientHeight
        : 1
    );
  });

  useEffect(() => {
    if (otherHeight && windowHeight && bottomHeight) {
      setMediaHeight(windowHeight - otherHeight - bottomHeight);
    }
  }, [windowHeight, otherHeight, bottomHeight]);

  if (isLoading) {
    return (
      <aside className="w-[17rem] bg-[#FBFBFA] px-4 py-6 h-[100vh] overflow-hidden flex flex-col space-y-5 justify-between items-between r fixed" />
    );
  }

  console.log(String(router.pathname));
  return (
    <aside
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-[16rem] xl:w-[17rem] bg-[#FBFBFA] py-6 h-[100vh] flex flex-col justify-between items-between fixed"
    >
      <div className="h-[100vh] flex flex-col space-y-3">
        <div ref={otherRef} className="flex flex-col space-y-5">
          <SideBarWorkspace />
          <div className="w-full flex flex-row px-3">
            <DialogPrimitive.Root
              open={newMediaOpen}
              onOpenChange={setNewMediaOpen}
            >
              <DialogPrimitive.Trigger asChild>
                <button className="w-[85%] flex flex-row space-x-2 bg-white shadow rounded py-1 px-2 hover:opacity-90">
                  <NewMediaIcon />
                  <p className="text-sm silka-medium text-[#474747]">
                    New Media
                  </p>
                </button>
              </DialogPrimitive.Trigger>
              <NewMediaDialog
                newMediaOpen={newMediaOpen}
                setNewMediaOpen={setNewMediaOpen}
                workspaceId={workspaceId}
              />
            </DialogPrimitive.Root>
            <div className="w-3" />
            <DialogPrimitive.Root
              open={searchOpen}
              onOpenChange={setSearchOpen}
            >
              <DialogPrimitive.Trigger asChild>
                <button className="w-[15%] bg-white shadow rounded flex flex-col justify-center items-center">
                  <SearchIcon />
                </button>
              </DialogPrimitive.Trigger>
              <SearchDialog
                searchOpen={searchOpen}
                workspaceId={workspaceId}
              />
            </DialogPrimitive.Root>
          </div>
          <div className="flex flex-col space-y-1.5 w-full px-2">
            <Link href={'/' + workspaceId} legacyBehavior>
              <button
                className={
                  'flex flex-row space-x-2 rounded hover:bg-gray-100 py-1.5 w-full px-2 ' +
                  (String(router.pathname) === '/[workspaceId]'
                    ? 'bg-gray-100'
                    : '')
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M4.5 2C3.11929 2 2 3.11929 2 4.5C2 5.88072 3.11929 7 4.5 7C5.88072 7 7 5.88072 7 4.5C7 3.11929 5.88072 2 4.5 2ZM3 4.5C3 3.67157 3.67157 3 4.5 3C5.32843 3 6 3.67157 6 4.5C6 5.32843 5.32843 6 4.5 6C3.67157 6 3 5.32843 3 4.5ZM10.5 2C9.11929 2 8 3.11929 8 4.5C8 5.88072 9.11929 7 10.5 7C11.8807 7 13 5.88072 13 4.5C13 3.11929 11.8807 2 10.5 2ZM9 4.5C9 3.67157 9.67157 3 10.5 3C11.3284 3 12 3.67157 12 4.5C12 5.32843 11.3284 6 10.5 6C9.67157 6 9 5.32843 9 4.5ZM2 10.5C2 9.11929 3.11929 8 4.5 8C5.88072 8 7 9.11929 7 10.5C7 11.8807 5.88072 13 4.5 13C3.11929 13 2 11.8807 2 10.5ZM4.5 9C3.67157 9 3 9.67157 3 10.5C3 11.3284 3.67157 12 4.5 12C5.32843 12 6 11.3284 6 10.5C6 9.67157 5.32843 9 4.5 9ZM10.5 8C9.11929 8 8 9.11929 8 10.5C8 11.8807 9.11929 13 10.5 13C11.8807 13 13 11.8807 13 10.5C13 9.11929 11.8807 8 10.5 8ZM9 10.5C9 9.67157 9.67157 9 10.5 9C11.3284 9 12 9.67157 12 10.5C12 11.3284 11.3284 12 10.5 12C9.67157 12 9 11.3284 9 10.5Z"
                    fill="#474747"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <a className={'silka-medium text-sm text-[#474747] '}>
                  Dashboard
                </a>
              </button>
            </Link>
            <Link href={'/' + workspaceId + '/edit'}>
              <button
                className={
                  'flex w-full flex-row space-x-2 rounded hover:bg-gray-100 py-1.5 px-2 ' +
                  (String(router.pathname).includes('edit')
                    ? 'bg-gray-100'
                    : '')
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8954 0.00752309C18.7074 0.0331883 18.5343 0.120636 18.4054 0.255072C18.2764 0.389508 18.1994 0.562738 18.1874 0.745554C18.1747 0.885957 17.6305 6.95563 17.6305 6.95563C17.6142 7.06298 17.6207 7.17243 17.6498 7.27725C17.6788 7.38207 17.7298 7.48008 17.7995 7.5652C17.8693 7.65033 17.9563 7.72078 18.0553 7.77228C18.1543 7.82378 18.2631 7.85523 18.3751 7.86468C18.4872 7.87412 18.6 7.86139 18.7067 7.82723C18.8135 7.79307 18.9118 7.73821 18.9958 7.66603C19.0798 7.59386 19.1476 7.50589 19.195 7.40752C19.2425 7.30915 19.2686 7.20248 19.2718 7.09402C19.2718 7.09402 19.8179 1.00385 19.8287 0.883907C19.8426 0.763446 19.8277 0.641521 19.7853 0.527439C19.7429 0.413357 19.6741 0.310127 19.584 0.225604C19.494 0.141081 19.3852 0.0774884 19.2658 0.0396989C19.1465 0.00190945 19.0198 -0.00909928 18.8954 0.00752309ZM6.68067 3.74065C6.5326 3.75745 6.39201 3.81263 6.27385 3.90035C6.15568 3.98807 6.06435 4.10505 6.00957 4.23884C5.95478 4.37263 5.93859 4.51825 5.9627 4.66021C5.98681 4.80218 6.05034 4.93519 6.14652 5.04511C6.23502 5.14677 10.3032 9.82466 10.3032 9.82466C10.3713 9.91026 10.4567 9.98163 10.5542 10.0344C10.6517 10.0872 10.7593 10.1203 10.8705 10.1317C10.9817 10.1432 11.0941 10.1327 11.201 10.1009C11.3078 10.0691 11.4069 10.0167 11.4921 9.94688C11.5773 9.87703 11.647 9.7912 11.6968 9.69461C11.7466 9.59801 11.7755 9.49264 11.7818 9.38493C11.7881 9.27721 11.7717 9.16939 11.7335 9.06799C11.6953 8.96659 11.6361 8.87374 11.5596 8.79507C11.5596 8.79507 7.48883 4.13168 7.40317 4.03329C7.31731 3.93056 7.20633 3.85001 7.08021 3.79893C6.9541 3.74785 6.8168 3.72783 6.68067 3.74065ZM30.2858 5.72275C30.1302 5.74391 29.9841 5.80749 29.8647 5.90601C29.7645 5.98733 24.9113 9.91678 24.9113 9.91678C24.8274 9.98318 24.7579 10.0649 24.7068 10.1573C24.6556 10.2496 24.6239 10.3507 24.6133 10.4549C24.6027 10.5591 24.6135 10.6643 24.6451 10.7645C24.6767 10.8646 24.7284 10.9578 24.7973 11.0387C24.8663 11.1195 24.951 11.1865 25.0468 11.2357C25.1426 11.2849 25.2475 11.3154 25.3555 11.3255C25.4635 11.3355 25.5724 11.325 25.6762 11.2944C25.78 11.2638 25.8765 11.2137 25.9602 11.1471C25.9602 11.1471 30.8064 7.20533 30.9134 7.11856C31.0472 7.0078 31.1407 6.85856 31.1803 6.69278C31.2198 6.52699 31.2033 6.35336 31.1331 6.1973C31.063 6.04123 30.9428 5.91096 30.7903 5.82556C30.6379 5.74016 30.461 5.70413 30.2858 5.72275ZM15.6151 10.3235C15.016 10.3092 14.4125 10.5041 13.9475 10.9319L11.1658 13.5101C10.2358 14.3658 10.1966 15.7938 11.0818 16.6926L43.1877 49.3101C44.0729 50.2088 45.5558 50.229 46.4857 49.3733L49.2862 46.8127C50.2161 45.9571 50.2369 44.5292 49.3517 43.6305L17.2458 11.0129C16.8032 10.5636 16.2143 10.3377 15.6151 10.3235ZM15.582 11.8879C15.7586 11.8919 15.9265 11.973 16.0641 12.1127L19.3344 15.4287C19.0411 15.6709 18.3698 16.2153 17.3859 17.0184C16.7958 17.5001 16.1924 17.9818 15.7286 18.3554C15.5688 18.4842 15.4517 18.5809 15.328 18.6806L12.282 15.5926C12.0069 15.3133 11.9981 14.9165 12.2871 14.6506L15.0691 12.0902C15.2136 11.9573 15.4053 11.8837 15.582 11.8879ZM0.683879 14.7322C0.482637 14.7659 0.30152 14.8705 0.175566 15.0257C0.0496112 15.1808 -0.012229 15.3756 0.00200819 15.5722C0.0162454 15.7688 0.105548 15.9533 0.252641 16.09C0.399733 16.2268 0.594161 16.306 0.798313 16.3125L7.23435 16.8498C7.34561 16.8656 7.45903 16.8593 7.56767 16.8312C7.6763 16.8032 7.77784 16.754 7.86606 16.6867C7.95429 16.6194 8.02733 16.5355 8.0807 16.44C8.13408 16.3445 8.16666 16.2395 8.17644 16.1314C8.18623 16.0233 8.17302 15.9144 8.13762 15.8114C8.10222 15.7084 8.04537 15.6135 7.97058 15.5325C7.89578 15.4514 7.80461 15.386 7.70267 15.3402C7.60072 15.2944 7.49015 15.2692 7.37774 15.2661L0.941705 14.7288C0.856108 14.7169 0.769105 14.718 0.683879 14.7322ZM20.4559 16.587L48.1697 44.7124C48.4448 44.9917 48.4352 45.3887 48.1462 45.6547L45.3458 48.2153C45.0568 48.4812 44.6627 48.4714 44.3876 48.1926L16.468 19.8388C16.5765 19.7549 16.6687 19.6882 16.796 19.5857C17.265 19.2078 17.8614 18.7138 18.453 18.2309C19.4693 17.4013 20.1969 16.8009 20.4559 16.587ZM27.6453 16.99C27.4446 17.0225 27.2634 17.1254 27.1366 17.2789C27.0097 17.4325 26.9461 17.6259 26.958 17.8219C26.9699 18.0179 27.0565 18.2027 27.2011 18.3409C27.3456 18.4791 27.538 18.5609 27.7413 18.5706C27.7413 18.5706 34.0333 19.0959 34.1773 19.1079C34.2886 19.1237 34.402 19.1174 34.5106 19.0893C34.6193 19.0613 34.7208 19.0121 34.809 18.9448C34.8972 18.8775 34.9703 18.7936 35.0237 18.698C35.077 18.6025 35.1096 18.4975 35.1194 18.3894C35.1292 18.2814 35.116 18.1724 35.0806 18.0695C35.0452 17.9665 34.9883 17.8716 34.9135 17.7905C34.8387 17.7095 34.7476 17.6441 34.6456 17.5983C34.5437 17.5525 34.4331 17.5273 34.3207 17.5242L27.8847 16.9869C27.8051 16.9768 27.7245 16.9777 27.6453 16.99ZM9.5615 22.5066C9.40401 22.5328 9.25782 22.6027 9.14069 22.7076C9.14069 22.7076 4.30418 26.6383 4.20566 26.7182C4.10664 26.7789 4.02218 26.8593 3.95792 26.9541C3.89366 27.0488 3.85108 27.1557 3.83302 27.2675C3.81496 27.3794 3.82183 27.4937 3.85318 27.6028C3.88453 27.7119 3.93963 27.8133 4.01481 27.9003C4.09 27.9872 4.18353 28.0576 4.28917 28.1069C4.39481 28.1562 4.51013 28.1832 4.62743 28.1861C4.74473 28.189 4.86132 28.1677 4.96942 28.1236C5.07752 28.0796 5.17463 28.0138 5.2543 27.9307C5.3631 27.8425 10.2077 23.9199 10.2077 23.9199C10.353 23.8109 10.4563 23.6582 10.5013 23.4861C10.5463 23.314 10.5304 23.1323 10.4561 22.9699C10.3819 22.8075 10.2535 22.6737 10.0914 22.5898C9.92932 22.5058 9.74281 22.4765 9.5615 22.5066ZM16.5551 26.0046C16.3672 26.0303 16.1941 26.1177 16.0651 26.2522C15.9362 26.3866 15.8592 26.5598 15.8472 26.7427C15.8472 26.7427 15.3022 32.8198 15.2903 32.9527C15.2739 33.0601 15.2805 33.1696 15.3096 33.2744C15.3386 33.3792 15.3896 33.4772 15.4593 33.5623C15.529 33.6474 15.6161 33.7179 15.715 33.7694C15.814 33.8209 15.9228 33.8523 16.0349 33.8618C16.1469 33.8712 16.2597 33.8585 16.3665 33.8243C16.4732 33.7902 16.5716 33.7353 16.6555 33.6631C16.7395 33.591 16.8073 33.503 16.8548 33.4047C16.9023 33.3063 16.9284 33.1996 16.9316 33.0912C16.943 32.9637 17.4885 26.8811 17.4885 26.8811C17.5023 26.7606 17.4875 26.6387 17.4451 26.5246C17.4027 26.4105 17.3338 26.3072 17.2438 26.2227C17.1538 26.1382 17.045 26.0746 16.9256 26.0368C16.8063 25.999 16.6796 25.988 16.5551 26.0046Z"
                    fill="#363636"
                  />
                </svg>
                <a className="silka-medium text-sm text-[#474747]">
                  Create / Edit
                </a>
              </button>
            </Link>
            <Link
              href={'/' + workspaceId + '/automation'}
              legacyBehavior
            >
              <button
                className={
                  'flex w-full flex-row space-x-2 rounded hover:bg-gray-100 py-1.5 px-2 ' +
                  (String(router.pathname).includes('automation')
                    ? 'bg-gray-100'
                    : '')
                }
              >
                <AutomationIcon />
                <div className="flex flex-row space-x-2 my-auto">
                  <a className="silka-medium text-[#474747] text-sm">
                    Automation
                  </a>
                </div>
              </button>
            </Link>
            <Link href={'/' + workspaceId + '/referral'}>
              <button
                className={
                  'flex flex-row space-x-2 w-full rounded hover:bg-gray-100 py-1.5 px-2 ' +
                  (String(router.pathname).includes('referral')
                    ? 'bg-gray-100'
                    : '')
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="my-auto"
                >
                  <path
                    fill="#363636"
                    d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 14.083c0-2.145-2.232-2.742-3.943-3.546-1.039-.54-.908-1.829.581-1.916.826-.05 1.675.195 2.443.465l.362-1.647c-.907-.276-1.719-.402-2.443-.421v-1.018h-1v1.067c-1.945.267-2.984 1.487-2.984 2.85 0 2.438 2.847 2.81 3.778 3.243 1.27.568 1.035 1.75-.114 2.011-.997.226-2.269-.168-3.225-.54l-.455 1.644c.894.462 1.965.708 3 .727v.998h1v-1.053c1.657-.232 3.002-1.146 3-2.864z"
                  />
                </svg>
                <a className="silka-medium text-[#474747] text-sm">
                  Referrals
                </a>
              </button>
            </Link>
            <Link
              href={'/' + workspaceId + '/settings'}
              legacyBehavior
            >
              <button
                className={
                  'flex w-full flex-row space-x-2 rounded hover:bg-gray-100 py-1.5 px-2 ' +
                  (String(router.pathname).includes('settings')
                    ? 'bg-gray-100'
                    : '')
                }
              >
                <SettingsIcon />
                <a className="silka-medium text-[#474747] text-sm">
                  Settings
                </a>
              </button>
            </Link>
          </div>
        </div>
        <SidebarMediaAndSocials
          workspaceId={workspaceId}
          pathname={String(router.query.mediaId)}
          mediaHeight={mediaHeight}
          bottomHeight={bottomHeight}
          fullPathname={String(router.pathname)}
        />
      </div>
      {windowHeight > 744 ? (
        <div className="flex flex-col" ref={bottomRef}>
          <SidebarAutomation />
        </div>
      ) : (
        <></>
      )}
    </aside>
  );
}
