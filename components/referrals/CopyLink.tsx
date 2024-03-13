import { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  workspaceId: string;
}

export function CopyLink({ workspaceId }: Props) {
  return (
    <div className="mt-10 flex flex-row justify-center items-center">
      <input />
      <button></button>
    </div>
  );
}
