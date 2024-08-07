import { Pagination } from "@nextui-org/react";

type CustomPaginationProps = {
  total: number;
  page: number;
  onChange: (value: number) => void;
}

export default function CustomPagination({ total, page, onChange }: CustomPaginationProps) {
  return (
    <Pagination
      showShadow
      showControls
      color="secondary"
      total={total}
      page={page}
      onChange={onChange}
      radius="sm"
    />
  );
}