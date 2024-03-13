interface Props {
  className: string;
}

export function ViewIcon({ className }: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_283_127)">
        <path
          d="M4.88667 16L3 14.114L9.226 7.99733L3 1.886L4.88667 0L13 7.99733L4.88667 16Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_283_127">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ViewIconSmall({ className }: Props) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_123_3)">
        <path
          d="M3.665 12L2.25 10.5855L6.9195 5.998L2.25 1.4145L3.665 0L9.75 5.998L3.665 12Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_123_3">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
