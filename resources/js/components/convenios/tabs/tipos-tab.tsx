import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { ConvenioTipo, ConvenioTipoResponse } from "@/types";
import { ConvenioTipoForm } from "@/components/convenios/forms/convenio-tipos-form";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface TiposTabProps {
    tipos: ConvenioTipo[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export function TiposTab({ tipos: initialTipos, meta: initialMeta }: TiposTabProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [currentTipo, setCurrentTipo] = useState<ConvenioTipo | undefined>();
    const [tipos, setTipos] = useState<ConvenioTipo[]>(initialTipos);
    const [meta, setMeta] = useState(initialMeta);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTipos = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/admin/convenios/tipos?page=${page}`);
            const data: ConvenioTipoResponse = await response.json();
            setTipos(data.data);
            setMeta(data.meta);
        } catch (error) {
            console.error("Error fetching tipos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(`/admin/convenios/tipos/${deleteId}`, {
                onSuccess: () => {
                    setDeleteId(null);
                    // Recargar los datos después de eliminar
                    fetchTipos(meta?.current_page || 1);
                },
            });
        }
    };

    const handleEdit = (tipo: ConvenioTipo) => {
        setCurrentTipo(tipo);
        setFormOpen(true);
    };

    const handleCreate = () => {
        setCurrentTipo(undefined);
        setFormOpen(true);
    };

    const handleSubmit = async (values: { nombre: string }) => {
        const action = currentTipo
            ? await router.put(`/admin/convenios/tipos/${currentTipo.id}`, values)
            : await router.post("/admin/convenios/tipos", values);

        setFormOpen(false);
        // Recargar los datos después de crear/editar
        fetchTipos(meta?.current_page || 1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= (meta?.last_page || 1)) {
            fetchTipos(page);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                    Mostrando {(meta?.current_page && meta?.per_page)
                        ? `${(meta.current_page - 1) * meta.per_page + 1}-${Math.min(meta.current_page * meta.per_page, meta.total)}`
                        : '0'} de {meta?.total || '0'} tipos
                </div>
                <Button onClick={handleCreate} disabled={isLoading}>
                    Nuevo Tipo
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-4">
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        ) : tipos.length > 0 ? (
                            tipos.map((tipo) => (
                                <TableRow key={tipo.id}>
                                    <TableCell>{tipo.nombre}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(tipo)}
                                                disabled={isLoading}
                                            >
                                                <PencilIcon className="size-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteId(tipo.id)}
                                                disabled={isLoading}
                                            >
                                                <Trash2Icon className="size-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-4">
                                    No se encontraron tipos de convenio
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {meta && meta.last_page > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(meta.current_page - 1)}
                                disabled={meta.current_page === 1 || isLoading}
                            />
                        </PaginationItem>

                        {Array.from({ length: Math.min(5, meta.last_page) }, (_, i) => {
                            let pageNum;
                            if (meta.last_page <= 5) {
                                pageNum = i + 1;
                            } else if (meta.current_page <= 3) {
                                pageNum = i + 1;
                            } else if (meta.current_page >= meta.last_page - 2) {
                                pageNum = meta.last_page - 4 + i;
                            } else {
                                pageNum = meta.current_page - 2 + i;
                            }

                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        isActive={pageNum === meta.current_page}
                                        onClick={() => handlePageChange(pageNum)}
                                        disabled={isLoading}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(meta.current_page + 1)}
                                disabled={meta.current_page === meta.last_page || isLoading}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}

            <ConvenioTipoForm
                open={formOpen}
                onOpenChange={setFormOpen}
                onSubmit={handleSubmit}
                defaultValues={currentTipo}
                isSubmitting={isLoading}
            />

            <AlertDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará el tipo de convenio.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
                            {isLoading ? "Eliminando..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}