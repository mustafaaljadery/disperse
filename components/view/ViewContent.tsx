import { VideoContent } from './content/VideoContent';
import { ImageContent } from './content/ImageContent';
import { UnknownContent } from './content/UnknownContent';

interface Props {
  data: any;
}

export function ViewContent({ data }: Props) {
  return (
    <div className="w-full h-full">
      {data.file.format.split('/').at(0) == 'video' ? (
        <VideoContent viewId={data.id} />
      ) : data.file.format == 'image/svg' ? (
        <ImageContent viewId={data.id} />
      ) : data.file.format == 'image/png' ? (
        <ImageContent viewId={data.id} />
      ) : data.file.format == 'image/jpeg' ? (
        <ImageContent viewId={data.id} />
      ) : data.file.format == 'image/jpg' ? (
        <ImageContent viewId={data.id} />
      ) : (
        <UnknownContent />
      )}
    </div>
  );
}
