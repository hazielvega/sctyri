import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Column {
  key: string;
  header: string;
  width?: string;
  className?: string;
}

interface EditDialogConfig<T = any> {
  trigger: (item: T) => React.ReactNode;
  content: (item: T, onClose: () => void) => React.ReactNode;
}

interface DeleteDialogConfig<T = any> {
  trigger: (item: T) => React.ReactNode;
  content: (item: T, onConfirm: () => void, onClose: () => void) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  emptyState: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  editDialog?: EditDialogConfig;
  deleteDialog?: DeleteDialogConfig;
  processing?: boolean;
  errors?: any;
}

export function DataTable({
  columns,
  data,
  emptyState,
  editDialog,
  deleteDialog,
}: DataTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-sm">
            <TableRow className="border-b border-gray-200 dark:border-gray-800">
              {columns.map((column) => (
                <TableHead 
                  key={column.key} 
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider ${column.className || ''}`}
                  style={{ width: column.width }}
                >
                  <div className="min-w-0 truncate">{column.header}</div>
                </TableHead>
              ))}
              {(editDialog || deleteDialog) && (
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
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                  {columns.map((column) => (
                    <TableCell key={`${item.id}-${column.key}`} className="px-4 py-3 whitespace-nowrap min-w-0">
                      <div className="min-w-0 truncate text-sm text-gray-800 dark:text-gray-200">
                        {item[column.key]}
                      </div>
                    </TableCell>
                  ))}
                  {(editDialog || deleteDialog) && (
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex justify-end space-x-2">
                        {editDialog && editDialog.trigger(item)}
                        {deleteDialog && deleteDialog.trigger(item)}
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