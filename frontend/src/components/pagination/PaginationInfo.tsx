type PaginationInfoProps = {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

const PaginationInfo = ({
  page,
  pageSize,
  totalElements,
}: PaginationInfoProps) => {
  const start = totalElements === 0 ? 0 : pageSize * (page - 1) + 1;
  const end = Math.min(pageSize * page, totalElements);
  
  return (
    <div className="pagination-info-text">
      Mostrando <strong>{start}</strong> até <strong>{end}</strong> de <strong>{totalElements}</strong> registros cadastrados
    </div>
  );
};

export default PaginationInfo;
