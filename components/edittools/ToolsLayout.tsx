import Router from 'next/router';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  title: string;
  children: JSX.Element;
}

export function ToolsLayout({ workspaceId, title, children }: Props) {
  return (
    <div className="flex flex-col w-[100vw] divide-y h-[100vh] overflow-hidden">
      <header className="flex flex-row py-2.5 px-4 bg-[#F2F2F2] justify-between w-full items-between">
        <button
          onClick={() => {
            Router.push('/' + workspaceId + '/edit/tools');
          }}
          className="p-1.5 bg-[#363636] hover:opacity-90 rounded my-auto"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <h1 className="text-sm silka-bold text-[#363636] my-auto">
          {title}
        </h1>
        <button
          onClick={() => {
            toast.success('Copied link to clipboard!', {
              className: 'text-sm silka-medium text-[#363636]',
            });
          }}
          className="text-sm rounded silka-medium text-gray-100 hover:opacity-90 hover:text-white px-5 py-1.5 bg-[#FF623D]"
        >
          Share
        </button>
      </header>
      <main className="h-full flex flex-col">{children}</main>
    </div>
  );
}
