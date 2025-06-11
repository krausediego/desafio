import { TableCell, TableRow } from "../../../components/ui/Table";

const status = {
  done: "Feito",
  doing: "Em andamento",
  todo: "Pendente",
};

export function TaskTableRow({ task }) {
  return (
    <TableRow>
      <TableCell>{task.id}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.responsible}</TableCell>
      <TableCell>{status[task.status]}</TableCell>
      <TableCell>{task.computer}</TableCell>
    </TableRow>
  );
}
