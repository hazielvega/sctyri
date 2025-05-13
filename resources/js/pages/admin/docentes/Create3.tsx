import { router } from "@inertiajs/react";
import appLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AppLayout from "@/layouts/app-layout";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    nombre: z.string().max(45, {
      message: "El nombre solo puede tener 45 caracteres",
    }),
    rol: z.string().max(45, {
        message: "El rol solo puede tener 45 caracteres",
    }),
  })


const CreateDocente = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          nombre: "", rol: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post('/admin/docentes', values, {
            onSuccess: () => {
                console.log('Docente creado exitosamente');
            },
            onError: (errors: Record<string, string>) => {
                console.error('Errores al crear el docente:', errors);
            },
        });
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                    <Input placeholder="nombre" {...field} />
                    </FormControl>
                    <FormDescription>
                    Nombre completo del docente.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="rol"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                    <Input placeholder="rol" {...field} />
                    </FormControl>
                    <FormDescription>
                        Rol que desempeña el docente.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
          <Button type="submit">Crear</Button>
        </form>
      </Form>
    );
}

CreateDocente.layout = (page: React.ReactNode) => (
    <AppLayout children={page} />
  );
  
  export default CreateDocente;