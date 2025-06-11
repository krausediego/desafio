import { TableCell, TableRow } from "../../../components/ui/Table";
import { Skeleton } from "../../../components/ui/Skeleton";

export function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>
      </TableRow>
    );
  });
}
