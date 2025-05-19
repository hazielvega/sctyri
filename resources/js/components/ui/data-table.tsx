import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { PlusCircle, PencilIcon, TrashIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

interface Column {
  key: string;
  header: string;
  width?: string;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  emptyState: {
    title: string;
    description: string;
    addButtonText: string;
    addButtonRoute: string;
    icon: React.ReactNode;
  };
  onEdit?: (item: any) => void;
  onDelete?: (id: string | number) => void;
  editForm?: (item: any, onSuccess: () => void) => React.ReactNode;
  deleteDialog?: {
    title: string;
    description: (item: any) => string;
    confirmButtonText?: string;
  };
  processing?: boolean;
  errors?: any;
}

export function DataTable({
  columns,
  data,
  emptyState,
  onEdit,
  onDelete,
  editForm,
  deleteDialog,
  processing,
  errors,
}: DataTableProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<any>(null);

  const handleEditClick = (item: any) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
    if (onEdit) onEdit(item);
  };

  const handleDeleteClick = (id: string | number) => {
    setCurrentItem(data.find(item => item.id === id));
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && currentItem) {
      onDelete(currentItem.id);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-sm">
            <TableRow className="border-b border-gray-200 dark:border-gray-800">
              {columns.map((column) => (
                <TableHead 
                  key={column.key} 
                  className={`
                    px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider
                    ${column.className || ''}
                  `}
                  style={{ width: column.width }}
                >
                  <div className="min-w-0 truncate">
                    {column.header}
                  </div>
                </TableHead>
              ))}
              {(onEdit || onDelete) && (
                <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    {emptyState.icon}
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {emptyState.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {emptyState.description}
                    </p>
                    {emptyState.addButtonRoute && (
                      <div className="mt-6">
                        <Link href={emptyState.addButtonRoute}>
                          <Button className="gap-1">
                            <PlusCircle className="h-4 w-4" />
                            {emptyState.addButtonText}
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={`${item.id}-${column.key}`} 
                      className="px-4 py-3 whitespace-nowrap min-w-0"
                    >
                      <div className="min-w-0 truncate text-sm text-gray-800 dark:text-gray-200">
                        {item[column.key]}
                      </div>
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex justify-end space-x-2">
                        {onEdit && editForm && (
                          <Modal
                            open={isEditDialogOpen}
                            onOpenChange={setIsEditDialogOpen}
                            title="Editar Docente"
                            trigger={
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => handleEditClick(item)}
                              >
                                <PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                <span className="sr-only">Editar</span>
                              </Button>
                            }
                            showCancelButton={false}
                          >
                            {currentItem && editForm(currentItem, () => setIsEditDialogOpen(false))}
                          </Modal>
                        )}

                        {onDelete && deleteDialog && (
                          <DeleteConfirmationDialog
                            isOpen={isDeleteDialogOpen}
                            onOpenChange={setIsDeleteDialogOpen}
                            trigger={
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-600/90"
                                onClick={() => handleDeleteClick(item.id)}
                              >
                                <TrashIcon className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            }
                            title={deleteDialog.title}
                            description={deleteDialog.description(item)}
                            onConfirm={handleConfirmDelete}
                            confirmButtonText={deleteDialog.confirmButtonText || "Eliminar"}
                          />
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}