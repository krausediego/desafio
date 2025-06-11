import { FormInsert } from "./components/FormInsert";
import { TableSkeleton } from "./components/TableSkeleton";
import { TaskTableRow } from "./components/TableRow";
import { ModeToggle } from "../../components/ModeToggle";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/get-tasks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { LoaderCircle } from "lucide-react";

export function HomePage() {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["tasks[]"],
    queryFn: getTasks,
  });

  return (
    <div className="w-full max-w-6xl space-y-6 bg-background" role="main">
      <div className=" border p-4 rounded-md space-y-4">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">Cadastrar nova tarefa</h2>
          <ModeToggle />
        </div>

        <FormInsert />
      </div>

      <div className="border p-4 rounded-md space-y-4">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold text-xl">Tarefas</h2>
          {isRefetching && <LoaderCircle className="w-4 h-4 animate-spin" />}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado por</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!data?.length ? (
              <TableRow>
                <TableCell
                  className="text-center text-muted-foreground"
                  colSpan={5}
                >
                  Nenhuma tarefa cadastrada
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data?.map((task) => {
                  return <TaskTableRow key={task.id} task={task} />;
                })}
              </>
            )}
            {isLoading && <TableSkeleton />}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
