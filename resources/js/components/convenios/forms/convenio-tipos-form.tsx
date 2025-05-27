import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ConvenioTipo, ConvenioTipoFormValues } from "@/types";

interface ConvenioTipoFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: ConvenioTipoFormValues) => void;
    defaultValues?: ConvenioTipo;
    isSubmitting: boolean;
}

export function ConvenioTipoForm({
    open,
    onOpenChange,
    onSubmit,
    defaultValues,
    isSubmitting,
}: ConvenioTipoFormProps) {
    const form = useForm<ConvenioTipoFormValues>({
        defaultValues: {
            nombre: defaultValues?.nombre || "",
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {defaultValues ? "Editar Tipo" : "Crear Tipo"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ej: Convenio Marco"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Guardando..." : "Guardar"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}