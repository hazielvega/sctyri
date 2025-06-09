import { type BreadcrumbItem } from '@/types';
import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import PasantiasLayout from '@/layouts/pasantias/layout';
import { SuccessAlert } from '@/components/ui/custom-alert';
import { PlusCircleIcon } from 'lucide-react';
import { PasantiaForm } from '@/components/forms/pasantia-form';
import { Modal } from '@/components/ui/modal';
import { type PageProps } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { CustomPagination } from '@/components/ui/custom-pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pasantías',
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
    
    const { links } = pasantias;
    const { props } = usePage<PageProps>();
    const { flash } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <PasantiasLayout>
                <Head title="Pasantías" />

                <div className="space-y-6 p-6">
                    {/* Alertas de éxito */}
                    {flash?.success && (
                        <SuccessAlert message={flash.success} />
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

                        <Modal
                            open={isCreateDialogOpen}
                            onOpenChange={setIsCreateDialogOpen}
                            title="Crear Pasantia"
                            trigger={
                                <Button className="gap-2">
                                <PlusCircleIcon className="h-4 w-4" />
                                Nuevo Pasantia
                                </Button>
                            }
                            showCancelButton={false} // Ocultamos el Cancelar del Modal
                            >
                            <PasantiaForm
                                initialData={{ fecha_acta: '', fecha_inicio: '', duracion: 0, fecha_fin: '', monto: 0, domicilio: '', tareas: '', estado: '', docente_id: undefined, alumno_carreras_id: undefined, convenio_id: undefined }}
                                onSubmitRoute="/admin/pasantia"
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
                                { key: "fecha_acta", header: "Fecha de Acta", width: "80%" },
                                { key: "fecha_inicio", header: "Fecha de Inicio", width: "80%" },
                                { key: "duracion", header: "Duracion", width: "80%" },
                                { key: "estado", header: "Estado", width: "80%" },
                                { key: "monto", header: "Monto", width: "80%" },
                                { key: "docente_id", header: "Docente", width: "80%" },
                            ]}
                            data={pasantias.data}
                            emptyState={{
                                title: "No hay pasantias registrados",
                                description: "Comienza agregando un nuevo docente.",
                                addButtonText: "Nuevo Docente",
                                addButtonRoute: route('admin.pasantias.create'),
                                icon: (
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                ),
                            }}
                            onEdit={(pasantia) => console.log("Editar pasantia", pasantia)}
                            onDelete={(id) => console.log("Eliminar pasantia", id)}
                            editForm={(pasantia, onSuccess) => (
                                <PasantiaForm
                                    initialData={pasantia}
                                    onSubmitRoute={`/admin/pasantia/${pasantia.id}`}
                                    onSuccess={onSuccess}  // Usar el onSuccess proporcionado por DataTable
                                    processing={processing}
                                    errors={errors}
                                />
                            )}
                            deleteDialog={{
                                title: "Confirmar eliminación",
                                description: (pasantia) => `¿Estás seguro de que deseas eliminar "${pasantia.id}"? Esta acción no se puede deshacer.`,
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
