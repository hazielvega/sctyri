import AppLayout from '@/layouts/app-layout';
import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { usePage, Link } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircleIcon } from 'lucide-react';
import { type PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PasantiaForm } from '@/components/forms/pasantia-form';
import { PlusCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    {
        title: 'Pasantias',
        href: '/admin/pasantias',
    },
];

export default function PasantiasIndex({ pasantias }: {
    pasantias: {
        data: Array<{ id: number, fecha_acta: string , fecha_inicio: string, duracion: number, fecha_fin: string, estado: string, monto: number, domicilio: string, tareas: string, alumno_carreras_id?: number, docente_id?: number, convenio_id?: string }>,
        links: Array<{ url: string | null, label: string, active: boolean }>,
    }
}) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        fecha_acta: "", fecha_inicio: "", duracion: 0, fecha_fin: "", estado: "", monto: 0, domicilio: "", tareas: "", alumno_carreras_id: undefined, docente_id: undefined, convenio_id: undefined
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('admin.pasantias.create', {
            onSuccess: () => {
                reset();
                setIsCreateDialogOpen(false);
            }
        });
    };

    const { links } = pasantias;
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
            router.delete(`/admin/pasantias/${deleteId}`, {
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
    const [currentPasantia, setCurrentPasantia] = React.useState<{ id:number , fecha_acta: string , fecha_inicio: string, duracion: number, fecha_fin: string, estado: string, monto: number, domicilio: string, tareas: string, alumno_carreras_id?: number, docente_id?: number, convenio_id?: string } | null>(null);

    const handleEditClick = (pasantia: { id:number , fecha_acta: string , fecha_inicio: string, duracion: number, fecha_fin: string, estado: string, monto: number, domicilio: string, tareas: string, alumno_carreras_id?: number, docente_id?: number, convenio_id?: string }) => {
        setCurrentPasantia(pasantia);
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
                            Pasantias
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Administra las pasantias registradas
                        </p>
                    </div>

                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <PlusCircleIcon className="h-4 w-4" />
                                Nueva Pasantia
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="overflow-y-auto max-h-[90vh]">
                            <DialogHeader>
                                <DialogTitle className="text-xl">Crear Pasantia</DialogTitle>
                            </DialogHeader>
                            <PasantiaForm
                                initialData={{ fecha_acta: '', fecha_inicio: '', duracion: 0, fecha_fin: '', monto: 0, domicilio: '', tareas: '', estado: '', docente_id: undefined, alumno_carreras_id: undefined, convenio_id: undefined }}
                                onSubmitRoute="/admin/pasantias"
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
                                <TableHead className="w-[80%]">Apellido</TableHead>
                                <TableHead className="w-[80%]">Rol</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pasantias.data.length === 0 ? (
                                <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay pasantias registradas</h3>
                                    <p className="mt-1 text-sm text-gray-500">Comienza agregando un nueva pasantia.</p>
                                    <div className="mt-6">
                                        <Link href={route('admin.pasantias.create')}>
                                        <Button>
                                            <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                                            Nueva Pasantia
                                        </Button>
                                        </Link>
                                    </div>
                                    </div>
                                </TableCell>
                                </TableRow>
                            ) : (
                                pasantias.data.map((pasantia) => (
                                    <TableRow key={pasantia.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <TableCell className="font-medium">{pasantia.fecha_acta}</TableCell>
                                        <TableCell className="font-medium">{pasantia.fecha_inicio}</TableCell>
                                        <TableCell className="font-medium">{pasantia.duracion}</TableCell>
                                        <TableCell className="font-medium">{pasantia.estado}</TableCell>
                                        <TableCell className="font-medium">{pasantia.monto}</TableCell>
                                        <TableCell className="font-medium">{pasantia.docente_id}</TableCell>
                                        <TableCell className="flex justify-end space-x-2">
                                            {/* Botón Editar */}
                                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleEditClick(pasantia)}
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                        <span className="sr-only">Editar</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl">Editar Docente</DialogTitle>
                                                    </DialogHeader>
                                                    {currentPasantia && (
                                                        <PasantiaForm
                                                            initialData={{
                                                                ...currentPasantia,
                                                                convenio_id: currentPasantia.convenio_id !== undefined && currentPasantia.convenio_id !== null
                                                                    ? Number(currentPasantia.convenio_id)
                                                                    : undefined
                                                            }}
                                                            onSubmitRoute={`/admin/pasantias/${currentPasantia.id}`}
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
                                                        onClick={() => handleDeleteClick(pasantia.id)}
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
                                                            ¿Estás seguro de que deseas eliminar "{pasantia.alumno_carreras_id + " " + pasantia.convenio_id}"?
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