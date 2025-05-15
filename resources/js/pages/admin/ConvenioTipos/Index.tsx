import AppLayout from '@/layouts/app-layout';
import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { usePage } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircleIcon } from 'lucide-react';
import { type PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ConvenioTipoForm } from '@/components/convenio-tipo-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    {
        title: 'Convenios',
        href: '/admin/convenio-tipos',
    },
];

export default function ConvenioTiposIndex({ convenioTipos }: {
    convenioTipos: {
        data: Array<{ id: number, nombre: string }>,
        links: Array<{ url: string | null, label: string, active: boolean }>,
    }
}) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/convenio-tipos', {
            onSuccess: () => {
                reset();
                setIsCreateDialogOpen(false);
            }
        });
    };

    const { links } = convenioTipos;
    const { props } = usePage<PageProps>();
    const { flash } = props;

    const [deleteId, setDeleteId] = React.useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId) {
            router.delete(`/admin/convenio-tipos/${deleteId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setDeleteId(null);
                },
                onError: () => {
                    setIsDeleteDialogOpen(false);
                    setDeleteId(null);
                }
            });
        }
    };

    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [currentTipo, setCurrentTipo] = React.useState<{ id: number, nombre: string } | null>(null);

    const handleEditClick = (tipo: { id: number, nombre: string }) => {
        setCurrentTipo(tipo);
        setIsEditDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Convenios" />
            <div className="space-y-6 p-6">
                {/* Alertas de éxito */}
                {flash?.success && (
                    <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                            {flash.success}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Encabezado y botón de acción */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Tipos de Convenio
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Administra los diferentes tipos de convenios disponibles
                        </p>
                    </div>

                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <PlusCircleIcon className="h-4 w-4" />
                                Nuevo Tipo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl">Crear Tipo de Convenio</DialogTitle>
                            </DialogHeader>
                            <ConvenioTipoForm
                                initialData={{ nombre: "" }}
                                onSubmitRoute="/admin/convenio-tipos"
                                onSuccess={() => setIsCreateDialogOpen(false)}
                                processing={processing}
                                errors={errors}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Tabla de resultados */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                                <TableHead className="w-[80%]">Nombre</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {convenioTipos.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="h-24 text-center text-gray-500 dark:text-gray-400">
                                        No se encontraron tipos de convenio
                                    </TableCell>
                                </TableRow>
                            ) : (
                                convenioTipos.data.map((tipo) => (
                                    <TableRow key={tipo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <TableCell className="font-medium">{tipo.nombre}</TableCell>
                                        <TableCell className="flex justify-end space-x-2">
                                            {/* Botón Editar */}
                                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleEditClick(tipo)}
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                        <span className="sr-only">Editar</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl">Editar Tipo de Convenio</DialogTitle>
                                                    </DialogHeader>
                                                    {currentTipo && (
                                                        <ConvenioTipoForm
                                                            initialData={currentTipo}
                                                            onSubmitRoute={`/admin/convenio-tipos/${currentTipo.id}`}
                                                            onSuccess={() => setIsEditDialogOpen(false)}
                                                            processing={processing}
                                                            errors={errors}
                                                        />
                                                    )}
                                                </DialogContent>
                                            </Dialog>

                                            {/* Botón Eliminar */}
                                            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleDeleteClick(tipo.id)}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                        <span className="sr-only">Eliminar</span>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-destructive">
                                                            Confirmar eliminación
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            ¿Estás seguro de que deseas eliminar el tipo de convenio "{tipo.nombre}"?
                                                            Esta acción no se puede deshacer.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={handleConfirmDelete}
                                                            className="bg-destructive hover:bg-destructive/90"
                                                        >
                                                            Confirmar
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Paginación */}
                {links.length > 3 && (
                    <div className="flex items-center justify-end">
                        <Pagination>
                            <PaginationContent>
                                {links.map((link, index) => (
                                    link.url ? (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                isActive={link.active}
                                                href={link.url}
                                                className={link.active ? "font-bold" : ""}
                                            >
                                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ) : (
                                        <PaginationItem key={index}>
                                            <span className="px-3 py-1 text-gray-500">
                                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                            </span>
                                        </PaginationItem>
                                    )
                                ))}
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}