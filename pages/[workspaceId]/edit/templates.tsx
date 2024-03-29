import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PageHead } from '../../../layouts/PageHead';
import DashboardLayout from '../../../layouts/Dashboard';
import { EditMenu } from '../../../components/edit/EditMenu';

const templateCategories = [
  {
    name: 'TikTok',
  },
  {
    name: 'Twitter',
  },
  {
    name: 'Social media',
  },
  {
    name: 'Video titles',
  },
  {
    name: 'Marketing',
  },
  {
    name: 'Logos',
  },
  {
    name: 'Backgrounds',
  },
  {
    name: 'Ads',
  },
];

export default function EditTemplates() {
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TikTok');
  const [newCompositionOpen, setNewCompositionOpen] = useState(false);

  useEffect(() => {
    if (router.query.workspaceId) {
      setWorkspaceId(router.query.workspaceId as string);
    }
  }, [router.isReady]);

  return (
    <PageHead title="Edit Templates · Disperse">
      <DashboardLayout>
        <EditMenu
          workspaceId={workspaceId}
          title="Templates"
          router={router}
          newCompositionOpen={newCompositionOpen}
          setNewCompositionOpen={setNewCompositionOpen}
        />
        <main className="px-3 md:px-6 lg:px-4 xl:px-32 2xl:px-44 mt-10">
          <div className="flex flex-col w-full px-2.5 space-y-1.5">
            <h1 className="silka-semibold text-[#363636]">
              Editing Templates
            </h1>
            <p className="text-xs silka-regular text-gray-400">
              Use a template to quickly edit your video.
            </p>
          </div>
          <div className="mt-6 flex flex-row flex-wrap">
            {templateCategories.map((value: any, index: number) => {
              return (
                <div className="px-2" key={index}>
                  <button
                    onClick={() => {
                      setSelectedCategory(value.name);
                    }}
                    className={
                      'py-1.5 px-4 text-xs rounded ' +
                      (value?.name == selectedCategory
                        ? 'bg-[#FF623D] text-white silka-semibold'
                        : 'bg-gray-100 hover:bg-gray-200 silka-medium')
                    }
                  >
                    {value?.name}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-20 w-full flex flex-col justify-center items-center">
            <div className="p-3 rounded-lg bg-[#F8CEC3]">
              <svg
                width="24"
                height="32"
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1548_2)">
                  <path
                    d="M17.9383 12.9853C17.8084 12.9852 17.6819 12.9441 17.5768 12.8678C17.4718 12.7915 17.3935 12.6839 17.3533 12.5604C17.3131 12.4369 17.313 12.3039 17.353 12.1803C17.393 12.0568 17.471 11.9491 17.576 11.8726L21.8768 8.73988L11.7683 1.37642L1.66022 8.73988L5.96061 11.8726C6.09255 11.9687 6.18092 12.1132 6.20628 12.2745C6.23163 12.4357 6.19189 12.6004 6.0958 12.7324C5.99971 12.8643 5.85514 12.9527 5.6939 12.9781C5.53265 13.0034 5.36794 12.9637 5.23599 12.8676L0.252917 9.23719C0.174564 9.18008 0.110813 9.10527 0.0668617 9.01885C0.0229099 8.93242 0 8.83684 0 8.73988C0 8.64293 0.0229099 8.54734 0.0668617 8.46092C0.110813 8.3745 0.174564 8.29968 0.252917 8.24258L11.4068 0.11796C11.512 0.0413003 11.6389 0 11.7691 0C11.8993 0 12.0261 0.0413003 12.1314 0.11796L23.2852 8.24258C23.3636 8.29968 23.4273 8.3745 23.4713 8.46092C23.5152 8.54734 23.5381 8.64293 23.5381 8.73988C23.5381 8.83684 23.5152 8.93242 23.4713 9.01885C23.4273 9.10527 23.3636 9.18008 23.2852 9.23719L18.3002 12.8676C18.1951 12.9443 18.0684 12.9855 17.9383 12.9853Z"
                    fill="#FF623D"
                  />
                  <path
                    d="M11.7689 17.4788C11.6387 17.4789 11.5118 17.4375 11.4066 17.3607L5.23702 12.8669C5.10744 12.7699 5.02125 12.6259 4.99712 12.4659C4.97299 12.3058 5.01285 12.1428 5.10808 12.0119C5.20331 11.8811 5.34624 11.793 5.50592 11.7668C5.6656 11.7406 5.82918 11.7783 5.96125 11.8719L11.7689 16.1026L17.5766 11.8719C17.7086 11.7758 17.8733 11.736 18.0345 11.7614C18.1958 11.7867 18.3403 11.8751 18.4364 12.007C18.5325 12.139 18.5723 12.3037 18.5469 12.4649C18.5216 12.6262 18.4332 12.7708 18.3012 12.8669L12.1312 17.3607C12.0261 17.4375 11.8992 17.4789 11.7689 17.4788Z"
                    fill="#FF623D"
                  />
                  <path
                    d="M11.7693 24.7388C11.6392 24.7389 11.5123 24.6977 11.407 24.6211L0.25318 16.4969C0.174752 16.4398 0.110935 16.3649 0.066935 16.2785C0.0229353 16.192 0 16.0964 0 15.9994C0 15.9024 0.0229353 15.8067 0.066935 15.7203C0.110935 15.6338 0.174752 15.559 0.25318 15.5019L5.23664 11.8719C5.34189 11.7952 5.46874 11.7539 5.59895 11.7539C5.72916 11.7539 5.85601 11.7952 5.96126 11.8719L11.7689 16.1026L17.5766 11.8719C17.6819 11.7952 17.8087 11.7539 17.9389 11.7539C18.0692 11.7539 18.196 11.7952 18.3013 11.8719L23.2847 15.5019C23.3631 15.559 23.427 15.6338 23.471 15.7203C23.515 15.8067 23.5379 15.9024 23.5379 15.9994C23.5379 16.0964 23.515 16.192 23.471 16.2785C23.427 16.3649 23.3631 16.4398 23.2847 16.4969L12.1309 24.6211C12.0258 24.6975 11.8992 24.7387 11.7693 24.7388ZM1.66126 15.9992L11.7693 23.3623L21.8774 15.9992L17.9389 13.1303L12.1313 17.3611C12.026 17.4378 11.8992 17.4791 11.7689 17.4791C11.6387 17.4791 11.5119 17.4378 11.4066 17.3611L5.59895 13.1303L1.66126 15.9992Z"
                    fill="#FF623D"
                  />
                  <path
                    d="M11.7683 32.0003C11.6381 32.0004 11.5112 31.959 11.406 31.8822L0.252917 23.758C0.174564 23.7009 0.110813 23.626 0.0668617 23.5396C0.0229099 23.4532 0 23.3576 0 23.2607C0 23.1637 0.0229099 23.0681 0.0668617 22.9817C0.110813 22.8953 0.174564 22.8205 0.252917 22.7634L5.23638 19.1334C5.30152 19.0833 5.37602 19.0468 5.4555 19.0259C5.53498 19.0051 5.61782 19.0004 5.69914 19.0121C5.78046 19.0239 5.85861 19.0517 5.92899 19.0941C5.99936 19.1365 6.06053 19.1926 6.1089 19.259C6.15726 19.3254 6.19183 19.4009 6.21058 19.4808C6.22932 19.5608 6.23186 19.6438 6.21804 19.7248C6.20422 19.8058 6.17432 19.8832 6.1301 19.9524C6.08589 20.0217 6.02826 20.0813 5.96061 20.128L1.66022 23.2607L11.7683 30.6237L21.8764 23.2607L17.576 20.128C17.4473 20.0307 17.3619 19.8868 17.3383 19.7272C17.3146 19.5676 17.3546 19.4051 17.4496 19.2746C17.5446 19.1442 17.6871 19.0564 17.8462 19.0299C18.0054 19.0035 18.1686 19.0406 18.3006 19.1334L23.2837 22.7634C23.362 22.8205 23.4258 22.8953 23.4697 22.9817C23.5137 23.0681 23.5366 23.1637 23.5366 23.2607C23.5366 23.3576 23.5137 23.4532 23.4697 23.5396C23.4258 23.626 23.362 23.7009 23.2837 23.758L12.1298 31.8822C12.0249 31.9589 11.8983 32.0002 11.7683 32.0003Z"
                    fill="#FF623D"
                  />
                  <path
                    d="M11.7684 17.4796C11.6382 17.4798 11.5113 17.4384 11.4061 17.3616L10.2199 16.4977C10.088 16.4016 9.99962 16.2571 9.97427 16.0958C9.94892 15.9346 9.98866 15.7699 10.0847 15.6379C10.1808 15.506 10.3254 15.4176 10.4866 15.3922C10.6479 15.3669 10.8126 15.4066 10.9446 15.5027L11.7684 16.1031L12.5922 15.5027C12.6576 15.4551 12.7316 15.4209 12.8102 15.4019C12.8888 15.383 12.9703 15.3797 13.0501 15.3922C13.13 15.4048 13.2066 15.4329 13.2755 15.4751C13.3445 15.5173 13.4045 15.5726 13.4521 15.6379C13.4996 15.7032 13.5339 15.7773 13.5528 15.8559C13.5718 15.9344 13.5751 16.016 13.5625 16.0958C13.55 16.1756 13.5218 16.2522 13.4797 16.3212C13.4375 16.3902 13.3822 16.4501 13.3169 16.4977L12.1307 17.3616C12.0255 17.4384 11.8986 17.4798 11.7684 17.4796Z"
                    fill="#FF623D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1548_2">
                    <rect width="23.5385" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-xl mt-5 silka-semibold text-[#363636]">
              No Templates Yet
            </h2>
            <p className="text-sm mt-1.5 silka-regular text-gray-400">
              Templates will be available very soon!
            </p>
          </div>
        </main>
      </DashboardLayout>
    </PageHead>
  );
}
