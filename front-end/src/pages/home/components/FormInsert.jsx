import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTasks } from "../../../services/insert-tasks";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

const schema = z.object({
  description: z.string().nonempty({ message: "A descrição é obrigatória" }),
  responsible: z.string().nonempty({ message: "O responsável é obrigatório" }),
  status: z.string().nonempty({ message: "O status é obrigatório" }),
});

export function FormInsert() {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      responsible: "",
      status: "",
    },
  });

  const { mutateAsync: insertTasksFn, isPending: isInsertLoading } =
    useMutation({
      mutationFn: insertTasks,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks[]"] }),
    });

  async function submitForm(task) {
    try {
      await insertTasksFn(task);
      form.reset({
        description: "",
        responsible: "",
        status: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="flex flex-col xl:flex-row items-start xl:items-end gap-4"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full xl:w-auto">
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <FormControl>
                <Input id="description" placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem className="w-full xl:w-auto">
              <FormLabel htmlFor="responsible">Responsável</FormLabel>
              <FormControl>
                <Input id="responsible" placeholder="Responsável" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full xl:w-auto">
              <FormLabel htmlFor="status">Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="m-0 w-full" id="status">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="done">Feito</SelectItem>
                    <SelectItem value="doing">Em andamento</SelectItem>
                    <SelectItem value="todo">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full xl:w-auto"
          disabled={isInsertLoading}
          type="submit"
        >
          {isInsertLoading && <LoaderCircle className="w-4 h-4 animate-spin" />}
          <span>Salvar tarefa</span>
        </Button>
      </form>
    </Form>
  );
}
