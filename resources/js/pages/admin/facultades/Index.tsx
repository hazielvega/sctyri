import AppLayout from '@/layouts/app-layout';
import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { usePage } from '@inertiajs/react';
import { type PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { FacultadForm } from '@/components/forms/facultad-form';
import { DataTable } from '@/components/ui/data-table';
import { CustomPagination } from '@/components/ui/custom-pagination';
import { SuccessAlert } from '@/components/ui/custom-alert';
import PasantiasLayout from '@/layouts/pasantias/layout';
import { PencilIcon, TrashIcon, PlusCircleIcon } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    {
        title: 'Facultades',
        href: '/admin/facultades',
    },
];

export default function FacultadesIndex({ facultades }: {
    facultades: {
        data: Array<{ id: number, nombre: string }>,
        links: Array<{ url: string | null, label: string, active: boolean }>,
    }
}) {    
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [currentFacultad, setCurrentFacultad] = React.useState<{ id: number; nombre: string } | null>(null);
    const { processing, errors } = useForm({
        nombre: ""
    });

    const { links } = facultades;
    const { props } = usePage<PageProps>();
    const { flash } = props;

    // Handle delete action
    const handleDelete = (id: number) => {
        router.delete(`/admin/facultades/${id}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setCurrentFacultad(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <PasantiasLayout>
                <Head title="Convenios" />
                <div className="space-y-6 p-6">
                    {/* Alertas de éxito */}
                    {flash?.success && (
                        <SuccessAlert message={flash.success} />
                    )}

                    {/* Encabezado y botón de acción */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Facultades
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Administra las facultades registradas
                            </p>
                        </div>

                        <Modal
                            open={isCreateDialogOpen}
                            onOpenChange={setIsCreateDialogOpen}
                            title="Crear Facultad"
                            trigger={
                                <Button className="gap-2">
                                    <PlusCircleIcon className="h-4 w-4" />
                                    Nueva Facultad
                                </Button>
                            }
                            showCancelButton={false}
                        >                            
                            <FacultadForm
                                initialData={{ nombre: "" }}
                                onSubmitRoute="/admin/facultades"
                                onSuccess={() => setIsCreateDialogOpen(false)}
                                processing={processing}
                                errors={errors}
                            />
                        </Modal>
                    </div>

                    {/* Tabla de resultados */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
                        <DataTable
                            columns={[
                                { key: "nombre", header: "Nombre", width: "80%" },
                            ]}
                            data={facultades.data}
                            emptyState={{
                                title: "No hay facultades registradas",
                                description: "Comienza agregando una nueva facultad.",
                                icon: (
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                ),
                            }}               
                            editDialog={{
                                trigger: (facultad) => (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => {
                                            setCurrentFacultad(facultad);
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        <PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        <span className="sr-only">Editar</span>
                                    </Button>
                                ),
                                content: (facultad, onClose) => (
                                    <Modal
                                        open={isEditDialogOpen && currentFacultad?.id === facultad.id}
                                        onOpenChange={(open) => {
                                            setIsEditDialogOpen(open);
                                            if (!open) {
                                                onClose();
                                                setCurrentFacultad(null);
                                            }
                                        }}
                                        title="Editar Facultad"
                                        showCancelButton={false}
                                    >
                                        <FacultadForm
                                            initialData={facultad}
                                            onSubmitRoute={`/admin/facultades/${facultad.id}`}
                                            onSuccess={() => {
                                                onClose();
                                                setIsEditDialogOpen(false);
                                                setCurrentFacultad(null);
                                            }}
                                            processing={processing}
                                            errors={errors}
                                        />
                                    </Modal>
                                )
                            }}
                            deleteDialog={{
                                trigger: (item) => (
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="h-8 w-8 p-0 hover:bg-red-600/90"
                                        onClick={() => {
                                            setCurrentFacultad(item);
                                            setIsDeleteDialogOpen(true);
                                        }}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        <span className="sr-only">Eliminar</span>
                                    </Button>
                                ),
                                content: (item, onConfirm, onClose) => (
                                    <DeleteConfirmationDialog
                                        isOpen={isDeleteDialogOpen && currentFacultad?.id === item.id}
                                        onOpenChange={(open) => {
                                            setIsDeleteDialogOpen(open);
                                            if (!open) {
                                                onClose();
                                                setCurrentFacultad(null);
                                            }
                                        }}
                                        title="Eliminar Facultad"
                                        description={`¿Estás seguro de que quieres eliminar la facultad "${item.nombre}"?`}
                                        onConfirm={() => {
                                            onConfirm();
                                            handleDelete(item.id);
                                        }}
                                    />
                                )
                            }}
                            processing={processing}
                            errors={errors}
                        />
                    </div>

                    {/* Paginación */}
                    {links.length > 3 && (
                        <div className="flex items-center justify-end">
                            <CustomPagination 
                                links={links} 
                                className="mt-4"
                                showIcons={true}
                                compact={false}
                            />
                        </div>
                    )}
                </div>
            </PasantiasLayout>
        </AppLayout>
    );
}