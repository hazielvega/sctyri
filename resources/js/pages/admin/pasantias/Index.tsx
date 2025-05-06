import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import DataTable from '@/components/ui/datatable';
import { Pasantia } from '@/types/pasantia';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const Index: React.FC<{ pasantias: Pasantia[] }> = ({ pasantias }) => {
  const { post, put } = useForm();
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);

  const handleSubmit = (values: Pasantia, closeModal: () => void) => {
    const method = values.id ? put : post;
    const url = values.id ? `/admin/pasantias/${values.id}` : '/admin/pasantias';

    method(url, {
      ...values,
      onSuccess: () => {
        closeModal();
        setCurrentItemId(null);
      },
      onError: (errors) => {
        console.error('Submission errors:', errors);
      },
    });
  };

  const headers = [
    { key: 'fecha_acta', label: 'Fecha Acta' },
    { key: 'fecha_inicio', label: 'Inicio' },
    { key: 'duracion', label: 'Duración' },
    { key: 'estado', label: 'Estado' },
    { key: 'monto', label: 'Monto' },
  ];

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/admin' }, { title: 'Pasantías', href: '/admin/pasantias' }]}>
      <Head title="Pasantías" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Pasantías</h1>
        <DataTable
          data={pasantias}
          headers={headers}
          onEdit={(id) => setCurrentItemId(id)}
        />
      </div>
    </AppLayout>
  );
};

export default Index;