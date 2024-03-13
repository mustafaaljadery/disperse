interface Props {
  name: string;
  about: string;
  image: string;
  isPremium: boolean;
  isLoading: boolean;
}

export function FacebookProfileComponent({
  name,
  about,
  image,
  isPremium,
  isLoading,
}: Props) {
  return (
    <div className="flex flex-row">
      {isLoading ? (
        <div className="h-[48px] w-[48px] bg-gray-200 animate-pulse rounded-full" />
      ) : (
        <div>
          <img
            className="rounded-full"
            src={image}
            width={48}
            height={48}
          />
        </div>
      )}
      <div className="flex mt-0.5 my-auto flex-col ml-3 space-y-0.5">
        {isLoading ? (
          <div className="h-[16px] w-[78px] bg-gray-200 rounded" />
        ) : (
          <p className="silka-semibold text-gray-900 text-base">
            {name}
          </p>
        )}
        {isLoading ? (
          <div className="h-[16px] w-[160px] bg-gray-200 rounded" />
        ) : (
          <p
            className={
              'silka-regular text-sm ' +
              (about && about.length > 0
                ? 'text-gray-500'
                : 'text-gray-400 italic')
            }
          >
            {about && about?.length > 75
              ? about?.slice(0, 75) + '..'
              : about?.length > 0
              ? about
              : 'No bio...'}
          </p>
        )}
      </div>
      {!isPremium && (
        <div className="ml-6 my-auto px-4 py-1 rounded bg-[#0674E8]">
          <p className="text-xs silka-medium text-white">
            This is Sample Data
          </p>
        </div>
      )}
    </div>
  );
}
