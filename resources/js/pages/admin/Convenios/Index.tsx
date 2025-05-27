import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TiposTab } from '@/components/convenios/tabs/tipos-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Convenios',
        href: '/admin/convenios',
    },
];

interface ConveniosProps {
    tipos: any[]; // Reemplazar con el tipo correcto
}

export default function Convenios({ tipos }: ConveniosProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Convenios" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs defaultValue="tipos" className="w-full">
                    <TabsList>
                        <TabsTrigger value="tipos">Tipos</TabsTrigger>
                        <TabsTrigger value="expedientes">Expedientes</TabsTrigger>
                        <TabsTrigger value="resoluciones">Resoluciones</TabsTrigger>
                        <TabsTrigger value="convenios">Convenios</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="tipos">
                        <TiposTab tipos={tipos} />
                    </TabsContent>
                    
                    <TabsContent value="expedientes">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </TabsContent>
                    
                    {/* Resto de las pestañas */}
                </Tabs>
            </div>
        </AppLayout>
    );
}