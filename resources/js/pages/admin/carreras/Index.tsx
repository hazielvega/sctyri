import AppLayout from '@/layouts/app-layout';
import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { PlusCircleIcon } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { type PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { CarreraForm } from '@/components/forms/carrera-form';
import { DataTable } from '@/components/ui/data-table';
import { CustomPagination } from '@/components/ui/custom-pagination';
import { SuccessAlert } from '@/components/ui/custom-alert';
import PasantiasLayout from '@/layouts/pasantias/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    {
        title: 'Carreras',
        href: '/admin/carreras',
    },
];

export default function CarrerasIndex({ carreras }: {
    carreras: {
        data: Array<{ id: number, nombre: string }>,
        links: Array<{ url: string | null, label: string, active: boolean }>,
    }
    }) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
    const { processing, errors } = useForm({
        nombre: "", facultad_id: undefined
    });

    const { links } = carreras;
    const { props } = usePage<PageProps>();
    const { flash } = props;

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
                                Carreras
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Administra las carreas registradas
                            </p>
                        </div>

                        <Modal
                            open={isCreateDialogOpen}
                            onOpenChange={setIsCreateDialogOpen}
                            title="Crear Carrera"
                            trigger={
                                <Button className="gap-2">
                                <PlusCircleIcon className="h-4 w-4" />
                                Nueva Carrera
                                </Button>
                            }
                            showCancelButton={false} // Ocultamos el Cancelar del Modal
                            >
                            <CarreraForm
                                initialData={{ nombre: "" }}
                                onSubmitRoute="/admin/carreras"
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
                            data={carreras.data}
                            emptyState={{
                                title: "No hay carreras registradas",
                                description: "Comienza agregando una nueva carrera.",
                                icon: (
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                ),
                            }}
                            onEdit={(carrera) => console.log("Editar carrera", carrera)}
                            onDelete={(id) => console.log("Eliminar carrera", id)}
                            editForm={(carrera, onSuccess) => (
                                <CarreraForm
                                    initialData={carrera}
                                    onSubmitRoute={`/admin/carreras/${carrera.id}`}
                                    onSuccess={onSuccess}  // Usar el onSuccess proporcionado por DataTable
                                    processing={processing}
                                    errors={errors}
                                />
                            )}
                            deleteDialog={{
                                title: "Confirmar eliminación",
                                description: (carrera) => `¿Estás seguro de que deseas eliminar "${carrera.nombre} "? Esta acción no se puede deshacer.`,
                                confirmButtonText: "Eliminar"
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