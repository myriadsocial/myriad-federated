import {CircularProgress} from '@mui/material';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface TableInterface {
  data: any;
  columns: any;
  meta?: any;
  onClickNext?: () => void;
  onClickPrevios?: () => void;
  isFetching?: boolean;
}
export default function Table({
  data,
  columns,
  meta,
  onClickNext,
  onClickPrevios,
  isFetching,
}: TableInterface) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="relative w-full min-h-[400px]">
        <table className="w-full">
          <thead className="bg-background-content drop-shadow-sm">
            {table &&
              table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      style={{width: header.column.columnDef.size ?? '100%'}}
                      className={'text-[14px] py-[14px] px-4 text-start font-semibold text-black'}
                      key={header.id}
                      colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
          </thead>
          {isFetching ? (
            <div className="absolute flex w-full min-h-[400px] items-center justify-center">
              <CircularProgress />
            </div>
          ) : (
            <tbody className="">
              {table.getRowModel().rows.map(row => (
                <tr className="" key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td className="px-4 py-[14px] text-[14px]" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {meta?.totalPageCount > 0 && (
        <div className="flex items-center gap-2 justify-end mb-[10px] text-[14px]">
          {meta?.currentPage !== 1 && (
            <button onClick={onClickPrevios} className="text-slate-600">
              {'<'}
            </button>
          )}
          <div className="h-[28px] w-[28px] rounded-md border-2 items-center justify-center flex ring-slate-600 px-2">
            {meta?.currentPage}
          </div>
          <div>of {meta?.totalPageCount}</div>
          {meta?.totalPageCount === meta?.currentPage ? null : (
            <button onClick={onClickNext} className="text-slate-600">
              {'>'}
            </button>
          )}
        </div>
      )}
    </>
  );
}
