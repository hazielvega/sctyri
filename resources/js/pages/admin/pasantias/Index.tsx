/*import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Pagination from '@/components/ui/pagination';
/*import FilterBar from '@/Components/FilterBar/FilterBar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pasantia } from '@/types/pasantia';
import { PaginatedData } from '@/types';
import { Trash2 } from 'lucide-react';

const Index = () => {
  const { pasantias } = usePage<{
    pasantias: PaginatedData<Pasantia>;
  }>().props;

  const {
    data,
    meta: { links }
  } = pasantias;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">PASANTIAS</h1>
      <div className="flex items-center justify-between mb-6">
        
        <Link
          className="btn-indigo focus:outline-none"
          href={route('contacts.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Contact</span>
        </Link>
      </div>
      <Table>
        <TableCaption>Lista de pasantias.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table
        columns={[
          {
            label: 'Name',
            name: 'name',
            renderCell: row => (
              <>
                {row.name}
                {row.deleted_at && (
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </>
            )
          },
          { label: 'Organization', name: 'organization.name' },
          { label: 'City', name: 'city' },
          { label: 'Phone', name: 'phone', colSpan: 2 }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('contacts.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
/*Index.layout = (page: React.ReactNode) => (
  <AppLayout title="Pasantias" children={page} />
);

export default Index;*/