import { format } from 'date-fns';

interface FileInfoProps {
  fileInfo: any;
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`;
}

export function PlayerFileInfo({ fileInfo }: FileInfoProps) {
  return (
    <div className="flex flex-col space-y-4 mt-2">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row space-x-2">
          <p className="w-1/2 text-sm silka-regular text-[#9B9B9B]">
            File Name
          </p>
          <p className="w-1/2 text-sm silka-regular text-[#464646]">
            {fileInfo.name}
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <p className="w-1/2 text-sm silka-regular text-[#9B9B9B]">
            Uploader
          </p>
          <p className="w-1/2 text-sm silka-regular text-[#464646]">
            {fileInfo.uploader}
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <p className="w-1/2 text-sm silka-regular text-[#9B9B9B]">
            Upload Date
          </p>
          <p className="w-1/2 text-sm silka-regular text-[#464646]">
            {format(new Date(fileInfo.uploadDate), 'yyyy/MM/dd')}
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <p className="w-1/2 text-sm silka-regular text-[#9B9B9B]">
            File Type
          </p>
          <p className="w-1/2 text-sm silka-regular text-[#464646]">
            {fileInfo.fileType.split('/')[1]}
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <p className="w-1/2 text-sm silka-regular text-[#9B9B9B]">
            Size
          </p>
          <p className="w-1/2 text-sm silka-regular text-[#464646]">
            {formatBytes(fileInfo.size)}
          </p>
        </div>
      </div>
    </div>
  );
}
