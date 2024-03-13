import { ViewHeader } from '../../components/view/ViewHeader';
import { useState } from 'react';
import { PageHead } from '../../layouts/PageHead';
import { SecureView } from '../../layouts/secure/SecureView';
import { ViewContent } from '../../components/view/ViewContent';

export default function View() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  return (
    <SecureView
      loading={loading}
      setLoading={setLoading}
      setViewData={setData}
      setUserInfo={setUserInfo}
    >
      <PageHead title={`${data?.file?.filename} · Disperse`}>
        <div className="flex flex-col">
          <ViewHeader value={data} userInfo={userInfo} />
          <div className="flex flex-row w-full divide-x h-[95.5vh]">
            <ViewContent data={data} />
          </div>
        </div>
      </PageHead>
    </SecureView>
  );
}
