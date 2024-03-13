import { ViewsChart } from './charts/Views';
import { FollowersChart } from './charts/Followers';
import { MediaPosted } from './charts/MediaPosted';

interface Props {
  chartSelection: string;
  timeSelection: string;
  workspaceId: string;
}

export function DashboardUsageChart({
  chartSelection,
  timeSelection,
  workspaceId,
}: Props) {
  return (
    <div className="flex flex-col space-y-4">
      {chartSelection == 'Views' ? (
        <ViewsChart
          workspaceId={workspaceId}
          timeInterval={timeSelection}
        />
      ) : chartSelection == 'Followers' ? (
        <FollowersChart
          workspaceId={workspaceId}
          timeInterval={timeSelection}
        />
      ) : (
        <MediaPosted
          workspaceId={workspaceId}
          timeInterval={timeSelection}
        />
      )}
    </div>
  );
}
