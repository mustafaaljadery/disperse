interface TiktokProfileComponent {
  name: string;
  profile_image_url: string;
  description: string;
  isPremium: boolean;
  isLoading: boolean;
}

export function TiktokProfileComponent({
  name,
  profile_image_url,
  description,
  isPremium,
  isLoading,
}: TiktokProfileComponent) {
  return (
    <div className="flex flex-row">
      {isLoading ? (
        <div className="h-[48px] w-[48px] rounded-full bg-gray-200 animate-pulse" />
      ) : (
        <div>
          <img
            crossOrigin="anonymous"
            className="rounded-full"
            src={profile_image_url}
            width={48}
            height={48}
          />
        </div>
      )}
      <div className="flex my-auto mt-0.5 flex-col space-y-0.5 ml-3">
        {isLoading ? (
          <div className="h-[16px] w-[78px] bg-gray-200 rounded" />
        ) : (
          <p className="silka-semibold text-gray-900 text-base">
            {name}
          </p>
        )}
        {isLoading ? (
          <div className="h-[16px] w-[120px] bg-gray-200 rounded" />
        ) : (
          <p
            className={
              'silka-regular text-sm ' +
              (description && description.length != 0
                ? 'text-gray-500'
                : 'text-gray-400 italic')
            }
          >
            {!description
              ? 'No description...'
              : description.length > 75
              ? description.slice(0, 75) + '...'
              : description}
          </p>
        )}
      </div>
      {!isPremium && (
        <div className="ml-6 my-auto px-4 py-1 rounded bg-[#363636]">
          <p className="text-xs silka-medium text-white">
            This is Sample Data
          </p>
        </div>
      )}
    </div>
  );
}
