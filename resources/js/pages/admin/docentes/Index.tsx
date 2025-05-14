import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Pagination from '@/components/ui/pagination';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell 
} from '@/components/ui/table';
import { Docente } from '@/types/docente';
import { PaginatedData } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

function Index() {
    const { docentes } = usePage<{
        docentes: PaginatedData<Docente>;
    }>().props;

    const { data } = docentes;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Gestión de Docentes</h1>
                <Link href={route('admin.docentes.create')}>
                    <Button className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        <span>Nuevo Docente</span>
                    </Button>
                </Link>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Listado de Docentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="font-medium text-gray-600">Nombre</TableHead>
                                    <TableHead className="font-medium text-gray-600">Rol</TableHead>
                                    <TableHead className="w-10"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow 
                                        key={row.id}
                                        onClick={() => window.location.href = route('admin.docentes.edit', row.id)}
                                        className="group cursor-pointer transition-colors hover:bg-gray-50"
                                    >
                                        <TableCell className="font-medium">
                                            <div className="flex items-center">
                                                <span className="group-hover:underline">{row.nombre}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                                {row.rol}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right text-gray-400 group-hover:text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {data.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay docentes registrados</h3>
                            <p className="mt-1 text-sm text-gray-500">Comienza agregando un nuevo docente.</p>
                            <div className="mt-6">
                                <Link href={route('admin.docentes.create')}>
                                    <Button>
                                        <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                                        Nuevo Docente
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {docentes.meta.links.length > 3 && (
                <div className="mt-4">
                    <Pagination links={docentes.meta.links} />
                </div>
            )}
        </div>
    );
}

Index.layout = (page: React.ReactNode) => (
    <AppLayout children={page} />
);

export default Index;