import React, { useState } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

interface Props {
  uploadProgress: number;
}

export function UploadProgressToast({ uploadProgress }: Props) {
  return (
    <div className="bg-[#363636] py-3 px-4 rounded w-80">
      <div className="flex flex-col space-y-2.5">
        <p className="silka-medium text-white text-xs">
          Uploading File...
        </p>
        <div className="flex flex-row justify-between items-between">
          <p className="text-xs silka-medium text-white">
            {uploadProgress}%
          </p>
          <p className="text-xs silka-medium text-white">100%</p>
        </div>
        <ProgressPrimitive.Root
          value={uploadProgress}
          className="h-1 w-full overflow-hidden rounded-full bg-white"
        >
          <ProgressPrimitive.Indicator
            style={{ width: `${uploadProgress}%` }}
            className="h-full bg-[#FF623D] duration-300 ease-in-out"
          />
        </ProgressPrimitive.Root>
      </div>
    </div>
  );
}
