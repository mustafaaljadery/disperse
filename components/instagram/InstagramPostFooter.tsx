interface Props {
  likes: number;
}

export function InstagramPostFooter({ likes }: Props) {
  return (
    <div className="flex flex-col mt-6 w-full">
      <div className="flex flex-row w-full justify-between items-between">
        <div className="flex flex-row space-x-3">
          <button className="hover:opacity-80">
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M16.7922 2.88412C18.1066 2.95608 19.339 3.53962 20.2209 4.50757C21.1028 5.47552 21.5626 6.74942 21.5002 8.05166C21.5002 11.094 18.8482 12.9627 16.3032 15.2038C13.7912 17.4251 12.4382 18.6393 12.0002 18.9195C11.5232 18.6135 9.85717 17.1142 7.69717 15.2038C5.14117 12.9538 2.50017 11.0672 2.50017 8.05166C2.43773 6.74942 2.89755 5.47552 3.77943 4.50757C4.6613 3.53962 5.89373 2.95608 7.20817 2.88412C7.93631 2.86226 8.65772 3.02789 9.30188 3.36482C9.94603 3.70175 10.4909 4.19844 10.8832 4.80635C11.7232 5.96999 11.8632 6.5523 12.0032 6.5523C12.1432 6.5523 12.2812 5.96999 13.1132 4.80338C13.5032 4.19266 14.0483 3.694 14.6939 3.35721C15.3395 3.02042 16.063 2.85729 16.7922 2.88412ZM16.7922 0.903454C15.8841 0.874662 14.9812 1.04912 14.1506 1.41382C13.3201 1.77853 12.5833 2.32409 11.9952 3.00989C11.4075 2.32609 10.6723 1.78179 9.84371 1.41719C9.01515 1.05259 8.11445 0.877026 7.20817 0.903454C5.36304 0.974909 3.62155 1.76701 2.36451 3.10654C1.10747 4.44607 0.43716 6.22404 0.500165 8.05166C0.500165 11.6268 3.05017 13.8223 5.51517 15.9446C5.79817 16.1882 6.08417 16.4338 6.36817 16.6844L7.39517 17.5935C8.51521 18.649 9.68943 19.6466 10.9132 20.5823C11.2369 20.7899 11.6144 20.9004 12.0002 20.9004C12.3859 20.9004 12.7634 20.7899 13.0872 20.5823C14.3499 19.618 15.5602 18.5883 16.7132 17.4974L17.6352 16.6814C17.9282 16.4239 18.2252 16.1674 18.5202 15.9149C20.8542 13.9095 23.5002 11.6367 23.5002 8.05166C23.5632 6.22404 22.8929 4.44607 21.6358 3.10654C20.3788 1.76701 18.6373 0.974909 16.7922 0.903454Z"
                fill="#525252"
              />
            </svg>
          </button>
          <button className="hover:opacity-80">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M20.6561 17.0081C21.8712 14.9062 22.2796 12.4338 21.8049 10.0528C21.3302 7.67183 20.0049 5.54508 18.0766 4.06989C16.1483 2.5947 13.7489 1.87197 11.3266 2.03672C8.90437 2.20147 6.62493 3.24243 4.91414 4.96513C3.20335 6.68783 2.17823 8.97444 2.0303 11.3978C1.88236 13.8211 2.62173 16.2155 4.11026 18.1335C5.5988 20.0515 7.7347 21.362 10.1189 21.8201C12.5032 22.2783 14.9727 21.8528 17.0661 20.6231L22.0001 22.0001L20.6561 17.0081Z"
                stroke="#525252"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="hover:opacity-80">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M21.9998 3L9.21777 10.083"
                stroke="#525252"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="M11.698 20.335L22 3.00195H2L9.218 10.085L11.698 20.335Z"
                stroke="#363636"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <button className="hover:opacity-80">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M20 21L12 13.44L4 21V3H20V21Z"
              stroke="#525252"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex mt-3.5 flex-row w-full space-x-1.5">
        <span className="text-sm silka-medium text-[#525252]">
          {likes}
        </span>
        <p className="text-sm silka-semibold text-[#525252]">likes</p>
      </div>
    </div>
  );
}
