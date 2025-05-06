import React, { useState } from 'react';
import Modal from '@/components/ui/modal';
import PasantiaForm from '@/components/forms/pasantiaForm'; // Adjust the import path
import { Pasantia } from '@/types/pasantia';

interface DataTableProps {
  data: Pasantia[];
  headers: { key: string; label: string }[];
  onEdit: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, headers, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Pasantia | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (item: Pasantia | null = null) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (values: Pasantia) => {
    setIsSubmitting(true);
    // This will be handled in Index.tsx via Inertia
    if (currentItem?.id) {
      // Update
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      closeModal();
    } else {
      // Create
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      closeModal();
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Crear nuevo
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map(({ label }) => (
              <th key={label} className="px-4 py-2 text-left">{label}</th>
            ))}
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-t">
                {headers.map(({ key }) => (
                  <td key={key} className="px-4 py-2">{item[key as keyof Pasantia]}</td>
                ))}
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      if (item.id !== undefined) {
                        onEdit(item.id);
                      }
                      openModal(item);
                    }}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="px-4 py-2 text-center text-gray-500">
                No hay datos cargados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        header={currentItem ? 'Editar Pasantía' : 'Crear Pasantía'}
        content={
          <PasantiaForm
            initialValues={currentItem || undefined}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        }
        footerButtons={
          <button
            type="submit"
            form="pasantia-form" // Ensure PasantiaForm has this ID
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Enviando...' : currentItem ? 'Actualizar' : 'Crear'}
          </button>
        }
        size="lg"
      />
    </div>
  );
};

export default DataTable;