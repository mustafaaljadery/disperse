interface TwitterProfileComponent {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  isPremium: boolean;
  isLoading: boolean;
}

export function TwitterProfileComponent({
  id,
  name,
  username,
  profile_image_url,
  isPremium,
  isLoading,
}: TwitterProfileComponent) {
  return (
    <div className="flex flex-row">
      {isLoading ? (
        <div className="h-[48px] w-[48px] bg-gray-200 rounded-full animate-pulse" />
      ) : (
        <div>
          <img
            className="rounded-full"
            //@ts-ignore
            crossorigin="anonymous"
            src={profile_image_url}
            width={48}
            height={48}
          />
        </div>
      )}
      <div className="flex my-auto mt-0.5 ml-3 flex-col space-y-0.5">
        {isLoading ? (
          <div className="h-[16px] w-[78px] bg-gray-200 rounded animate-pulse" />
        ) : (
          <p className="silka-semibold text-base">{name}</p>
        )}
        {isLoading ? (
          <div className="h-[16px] w-[120px] bg-gray-200 rounded animate-pulse" />
        ) : (
          <p className="silka-regular text-sm text-gray-500">
            @{username}
          </p>
        )}
      </div>
      {!isPremium && (
        <div className="ml-6 my-auto px-4 py-1 rounded bg-[#1D9BF0]">
          <p className="text-xs silka-medium text-white">
            This is Sample Data
          </p>
        </div>
      )}
    </div>
  );
}
