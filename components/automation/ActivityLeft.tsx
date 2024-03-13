import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface SearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

interface ActivityLeftProps {
  workspaceId: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

interface WorkflowProps {
  value: any;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
}

function NoWorkflows() {
  return <></>;
}

async function getWorkflows(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/workflows`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Workflow({ value, selected, setSelected }: WorkflowProps) {
  return (
    <button
      onClick={() => {
        setSelected(value);
      }}
      className={
        'py-2 w-full rounded text-xs flex flex-col justify-start items-start px-4 ' +
        (selected.id == value.id
          ? 'bg-gray-50 silka-medium text-gray-800'
          : 'silka-regular text-gray-600')
      }
    >
      <div className="flex flex-row w-full justify-between items-between space-x-3">
        <p className="my-auto text-start">
          {value.name.length > 26
            ? value.name.slice(0, 26) + '...'
            : value.name}
        </p>
        <span
          className={
            'text-[9px] px-2 my-auto text-white rounded ' +
            (value.active
              ? 'bg-[#DFEEE6] text-[#15AE5D]'
              : 'bg-[#F6E2E2] text-[#FD3131]')
          }
        >
          {value.active ? 'active' : 'inactive'}
        </span>
      </div>
    </button>
  );
}

function Search({ search, setSearch }: SearchProps) {
  return (
    <input
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      className="text-xs silka-medium placeholder-silka-medium text-[#474747] bg-[#FBFBFB] focus:outline-none focus:ring-0 focus:border-[#FF623D] border border-[#D6D6D6] placeholder-text-gray-800 rounded"
      type="text"
      placeholder="Search workflows..."
    />
  );
}

export function ActivityLeft({
  workspaceId,
  selected,
  setSelected,
}: ActivityLeftProps) {
  const [workflowsLoading, setWorkflowsLoading] = useState(true);
  const [workflows, setWorkflows] = useState<any>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getWorkflows(workspaceId).then((value) => {
      setWorkflows(value);
      setWorkflowsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <Search search={search} setSearch={setSearch} />
      <button
        onClick={(e) => {
          e.preventDefault();
          setSelected('Total');
        }}
        className={
          'mt-4 py-2 w-full rounded text-xs flex flex-col justify-start items-start px-4 ' +
          (selected == 'Total'
            ? 'bg-gray-50 silka-semibold text-gray-800'
            : 'silka-regular text-gray-600')
        }
      >
        Total Activity
      </button>
      {workflowsLoading ? (
        <div className="flex flex-col">
          <div className="flex flex-col space-y-2 mt-2">
            <div className="bg-gray-100 w-full h-7 rounded animate-pulse" />
            <div className="bg-gray-100 w-full h-7 rounded animate-pulse" />
            <div className="bg-gray-100 w-full h-7 rounded animate-pulse" />
          </div>
        </div>
      ) : (
        <>
          {workflows?.length > 0 ? (
            <div className="flex flex-col space-y-2 mt-2">
              {workflows
                .filter((value: any) => {
                  return value.name
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .sort(function (x: any, y: any) {
                  return x.active === y.active
                    ? 0
                    : x.active
                    ? -1
                    : 1;
                })
                .map((value: any, index: number) => {
                  return (
                    <Workflow
                      key={index}
                      value={value}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
            </div>
          ) : (
            <NoWorkflows />
          )}
        </>
      )}
    </div>
  );
}
