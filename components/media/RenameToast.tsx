interface Props {
  fileName: string;
}

export function RenameToast({}: Props) {
  return (
    <div className="px-8 py-2 bg-[#2F2F2F] flex flex-col">
      <p className="silka-medium text-white text-sm">
        File has been Renamed
      </p>
    </div>
  );
}
