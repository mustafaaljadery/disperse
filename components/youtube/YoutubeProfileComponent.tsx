import Image from 'next/image';

interface Props {
  userInfo: any;
  isPremium: boolean;
  isLoading: boolean;
}

export function YoutubeProfileComponent({
  userInfo,
  isPremium,
  isLoading,
}: Props) {
  return (
    <div className="flex flex-row">
      {isLoading ? (
        <div className="h-[48px] w-[48px] rounded-full bg-gray-200 animate-pulse" />
      ) : (
        <div>
          <Image
            alt="profile picture"
            className="rounded-full"
            src={userInfo?.image}
            width={48}
            height={48}
          />
        </div>
      )}
      <div className="flex my-auto mt-0.5 ml-3 flex-col space-y-0.5">
        {isLoading ? (
          <div className="h-[16px] w-[78px] bg-gray-200 rounded animate-pulse" />
        ) : (
          <p className="silka-semibold text-base text-gray-900">
            {userInfo?.title}
          </p>
        )}
        {isLoading ? (
          <div className="h-[16px] w-[160px] bg-gray-200 rounded animate-pulse" />
        ) : (
          <p
            className={
              'silka-regular text-sm ' +
              (userInfo?.description &&
              userInfo?.description.length > 0
                ? 'text-gray-500'
                : 'text-gray-400 italic')
            }
          >
            {userInfo?.description &&
            userInfo?.description?.length > 75
              ? userInfo?.description?.slice(0, 75) + '...'
              : 'No description...'}
          </p>
        )}
      </div>
      {!isPremium && (
        <div className="ml-6 my-auto px-4 py-1 rounded bg-[#FF0000]">
          <p className="text-xs silka-medium text-white">
            This is Sample Data
          </p>
        </div>
      )}
    </div>
  );
}
