import { CircularProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { IcOpenUrl } from "../../../../public/icons";
import { getReports } from "../../../api/GET_Reports";
import { getReportsDetail } from "../../../api/GET_ReportsDetail";
import { updateReports } from "../../../api/PATCH_Reports";
import { AvatarWithName, DropdownFilter } from "../../../components/atoms";
import Button from "../../../components/atoms/Button";
import ListReporter from "../../../components/atoms/ListReporter";
import Modal from "../../../components/molecules/Modal";
import Table from "../../../components/organisms/Table";
import { Arrays } from "../../../constans/array";
import {
  DataResponseUserReportedInterface,
  ReportType,
  ReportTypeCategoryMapper,
} from "../../../interface/UserInterface";
import ContentLayout from "../../../layout/ContentLayout";
import { dateFormatter } from "../../../utils/dateFormatter";
export default function PostResported() {
  const [isShowModalRespond, setIsShowModalRespond] = useState<boolean>(false);
  const [userSelected, setUserSelected] =
    useState<DataResponseUserReportedInterface>();
  const [sortingDate, setSortingDate] = useState<string>("DESC");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [reportId, setReportId] = useState<string | undefined>(undefined);

  const translationText = (reportType: ReportType) => {
    return ReportTypeCategoryMapper[reportType];
  };

  const columns: ColumnDef<DataResponseUserReportedInterface>[] = [
    {
      accessorKey: "reportedDetail",
      header: "Post owner",
      cell: (value) => (
        <AvatarWithName
          image={value.row.original.reportedDetail.user.profilePictureURL}
          name={value.row.original.reportedDetail.user.name}
          desc={value.row.original.reportedDetail.user.username}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Report Date",
      size: 120,
      cell: (value) => (
        <div className="text-sm">
          {dateFormatter(new Date(value.row.original.createdAt), "dd/MM/yy")}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      size: 144,
      cell: (value) => (
        <div className="text-sm capitalize">
          {value.row.original.referenceType}
        </div>
      ),
    },
    {
      accessorKey: "totalReported",
      header: "Total reports",
      size: 144,
      cell: (value) => (
        <div className="text-sm capitalize">
          {value.row.original.totalReported} reports
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Category",
      cell: (value) => (
        <div className="text-sm">
          {translationText(value.row.original.type as ReportType)}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      size: 144,
      cell: (value) => (
        <Button
          onClick={() => handleRespond(value.row.original)}
          label="Respond"
        />
      ),
    },
  ];

  const handleRespond = (value: DataResponseUserReportedInterface) => {
    setReportId(value.id);
    setUserSelected(value);
    setIsShowModalRespond(true);
  };

  const filter = JSON.stringify({
    where: { status: "pending", referenceType: { inq: ["post", "comment"] } },
    order: [`createdAt ${sortingDate}`],
  });

  const {
    refetch: refetchingGetAllPost,
    isFetching,
    data: dataPostReported,
  } = useQuery(["/getAllPost"], () => getReports({ pageNumber, filter }), {
    enabled: false,
  });

  const handleIgnore = async () => {
    const status = "ignored";
    const response = await mutateUpdateUserStatus({
      status,
      reportId: userSelected?.id ?? "",
    });
    if (response?.statusCode === 401) {
      setIsShowModalRespond(false);
    } else {
      refetchingGetAllPost();
      setIsShowModalRespond(false);
    }
  };

  const handleBanned = async () => {
    const status = "removed";
    const response = await mutateUpdateUserStatus({
      status,
      reportId: userSelected?.id ?? "",
    });
    if (response?.statusCode === 401) {
      setIsShowModalRespond(false);
    } else {
      refetchingGetAllPost();
      setIsShowModalRespond(false);
    }
  };

  const { mutateAsync: mutateUpdateUserStatus } = useMutation(updateReports);

  useEffect(() => {
    refetchingGetAllPost();
  }, [sortingDate, pageNumber, refetchingGetAllPost]);

  const {
    refetch: refetchingAllReporter,
    isFetching: isFetchingReporter,
    data: dataReporter,
  } = useQuery(["/getAllReporter"], () => getReportsDetail({ id: reportId }), {
    enabled: false,
  });

  useEffect(() => {
    if (reportId === undefined) return;
    refetchingAllReporter();
  }, [refetchingAllReporter, reportId]);

  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <div className="mb-[5px]">
        <div className="text-lg font-semibold">Reported Post</div>
      </div>
      <div className="text-sm text-[#757575]">
        {dataPostReported?.meta.totalItemCount ?? "0"} Reports
      </div>
      <div className="my-6">
        <DropdownFilter
          label="Report Date"
          data={Arrays.dataFilter ?? []}
          value={sortingDate}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSortingDate(event.target.value)
          }
        />
      </div>
      <div className="">
        <Table
          isFetching={isFetching}
          data={dataPostReported?.data ?? []}
          columns={columns}
          meta={dataPostReported?.meta ?? []}
          onClickNext={() =>
            setPageNumber(dataPostReported?.meta.nextPage ?? 1)
          }
          onClickPrevios={() =>
            setPageNumber((dataPostReported?.meta.currentPage ?? 2) - 1)
          }
        />
      </div>
      <Modal
        open={isShowModalRespond}
        onClose={() => setIsShowModalRespond(false)}
        title={"Respond"}
      >
        <div className="mt-[20px]">
          <div className="text-sm">Reported user</div>
          <div className="mt-[12px]">
            <AvatarWithName
              image={userSelected?.reportedDetail.user.profilePictureURL ?? ""}
              name={userSelected?.reportedDetail.user.name ?? ""}
              desc={userSelected?.reportedDetail.user.username ?? ""}
            />
          </div>
        </div>
        <div className="mt-[28px] mb-[20px]">
          <div className="text-sm">Detail</div>
          <div className="flex justify-between">
            <div>
              <div className="flex">
                <div className="text-[14px] text-gray-500 w-[120px]">URL</div>
                <div className="text-[14px] break-words max-w-[354px]">
                  {`https://app.testnet.myriad.social/post/${userSelected?.referenceId}`}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-[120px] text-[14px] text-gray-500">
                  Total reports
                </div>
                <div className="flex-1 text-[14px]">
                  {userSelected?.totalReported} report
                </div>
              </div>
            </div>
            <a
              href={`https://app.testnet.myriad.social/post/${userSelected?.referenceId}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="w-[20px]">
                <Image src={IcOpenUrl} height={20} width={20} alt="" />
              </button>
            </a>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <div className="text-sm">Reporter</div>
          </div>
          {isFetchingReporter && dataReporter ? (
            <CircularProgress />
          ) : (
            dataReporter?.data?.map(
              (item: DataResponseUserReportedInterface) => {
                return <ListReporter data={item} key={item.id} />;
              }
            )
          )}
        </div>
        <div className="flex mt-[28px]">
          <div className="flex-1 mr-3">
            <Button isFullWidth onClick={handleIgnore} label="Ignore" />
          </div>
          <div className="flex-1">
            <Button isFullWidth onClick={handleBanned} primary label="Remove" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

PostResported.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Post">{page}</ContentLayout>;
};
