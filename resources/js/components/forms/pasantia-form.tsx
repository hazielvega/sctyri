import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PasantiaFormProps } from '@/types/pasantia';
import { Docente } from '@/types/docente';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import * as z from 'zod';
import axios from 'axios';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const estadosPasantia = [
  'Activa',
  'Finalizada',
  'Suspendida',
  'Renovada',
  'En revisión'
];

// Validación cliente con Zod
const formSchema = z.object({
    fecha_acta: z
      .date({
        required_error: "La fecha de acta es requerida",
        invalid_type_error: "La fecha de acta debe ser una fecha válida",
      }),
    fecha_inicio: z
      .date({
        required_error: "La fecha de inicio es requerida",
        invalid_type_error: "La fecha de inicio debe ser una fecha válida",
      }),
    duracion: z
      .number()
      .int("Debe ser un número entero")
      .min(1, "La duración mínima es 1")
      .max(100, "La duración máxima es 100"),
    fecha_fin: z
      .date({
        required_error: "La fecha de fin es requerida",
        invalid_type_error: "La fecha de fin debe ser una fecha válida",
      }),
    monto: z
      .number({
        required_error: "El monto es requerido",
        invalid_type_error: "El monto debe ser un número",
      })
      .positive("El monto debe ser mayor que 0")
      .refine((value) => {
        // Verifica que tenga máximo 2 decimales
        const decimalPart = value.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 2;
      }, {
        message: "El monto debe tener máximo 2 decimales",
      }),
    domicilio: z
        .string()
        .min(2, { message: 'El domicilio debe tener al menos 2 caracteres' })
        .max(45, { message: 'El domicilio no puede exceder los 45 caracteres' }),
    tareas: z
        .string()
        .min(2, { message: 'Las tareas debe tener al menos 2 caracteres' })
        .max(100, { message: 'Las tareas no puede exceder los 100 caracteres' }),
    estado: z.enum([...estadosPasantia] as [string, ...string[]], {
      required_error: "El estado es requerido",
      invalid_type_error: `Estado inválido. Opciones válidas: ${estadosPasantia.join(", ")}`,
    }),
    docente_id: z
      .number({
        required_error: "El docente es requerido",
        invalid_type_error: "El docente debe ser un número válido",
      })
      .int("El docente debe ser un número entero")
      .positive("El docente debe ser un ID válido"),
    alumno_carreras_id: z
      .number()
      .int("El alumno_carreras_id debe ser un número entero")
      .positive("El alumno_carreras_id debe ser un ID válido")
      .optional(),
    convenio_id: z
      .number()
      .int("El convenio_id debe ser un número entero")
      .positive("El convenio_id debe ser un ID válido")
      .optional(),
  }).refine(
    (data) => data.fecha_inicio < data.fecha_fin,
    {
      message: "La fecha de inicio debe ser menor a la fecha de fin",
      path: ["fecha_inicio"],
    }
);

export function PasantiaForm({
    initialData = { fecha_acta: '', fecha_inicio: '', duracion: 0, fecha_fin: '', monto: 0, domicilio: '', tareas: '', estado: '', docente_id: undefined, alumno_carreras_id: undefined, convenio_id: undefined },
    onSubmitRoute,
    onSuccess,
    processing,
    errors: inertiaErrors,
}: PasantiaFormProps ) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fecha_acta: initialData.fecha_acta ? new Date(initialData.fecha_acta) : undefined,
            fecha_inicio: initialData.fecha_inicio ? new Date(initialData.fecha_inicio) : undefined,
            duracion: initialData.duracion || 0,
            fecha_fin: initialData.fecha_fin ? new Date(initialData.fecha_fin) : undefined,
            monto: initialData.monto || 0,
            domicilio: initialData.domicilio || '',
            tareas: initialData.tareas || '',
            estado: initialData.estado || '',
            docente_id: initialData.docente_id || undefined,
            alumno_carreras_id: initialData.alumno_carreras_id || undefined,
            convenio_id: initialData.convenio_id || undefined
        },
    });

    const [docentes, setDocentes] = useState<Docente[]>([]);
    const [loadingDocentes, setLoadingDocentes] = useState(false);

    /*useEffect(() => {
    setLoadingDocentes(true);
    router.get('admin/docentes/list', {}, {
        preserveState: true,
        onSuccess: (page) => {
            setDocentes((page.props as any).docentes ?? []);
            setLoadingDocentes(false);
        },
            onError: () => {
            setLoadingDocentes(false);
        }
    });
    }, []);*/

    useEffect(() => {
    setLoadingDocentes(true);
    axios.get('admin/docentes/list') // Usar ruta API directa
        .then(response => {
        setDocentes(response.data);
        })
        .catch(error => {
        console.error('Error cargando docentes:', error);
        })
        .finally(() => {
        setLoadingDocentes(false);
        });
    }, []);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const method = initialData.id ? 'put' : 'post';

        router[method](onSubmitRoute, {
            ...values,
        }, {
            onSuccess: () => {
                onSuccess?.();
            },
            onError: (errors) => {
                if (errors.fecha_acta) {
                    form.setError('fecha_acta', {
                        type: 'manual',
                        message: errors.fecha_acta,
                    });
                    form.setError('fecha_inicio', {
                        type: 'manual',
                        message: errors.fecha_inicio,
                    });
                    form.setError('duracion', {
                        type: 'manual',
                        message: errors.duracion,
                    });
                    form.setError('fecha_fin', {
                        type: 'manual',
                        message: errors.fecha_fin,
                    });
                    form.setError('monto', {
                        type: 'manual',
                        message: errors.monto,
                    });
                    form.setError('domicilio', {
                        type: 'manual',
                        message: errors.domicilio,
                    });
                    form.setError('tareas', {
                        type: 'manual',
                        message: errors.tareas,
                    });
                    form.setError('estado', {
                        type: 'manual',
                        message: errors.estado,
                    });
                    form.setError('docente_id', {
                        type: 'manual',
                        message: errors.docente_id,
                    });
                    form.setError('alumno_carreras_id', {
                        type: 'manual',
                        message: errors.alumno_carreras_id,
                    })
                    form.setError('convenio_id', {
                        type: 'manual',
                        message: errors.convenio_id,
                    })
                }
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="fecha_acta"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha Acta</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                                onChange={e => {
                                    field.onChange(e.target.value ? new Date(e.target.value) : undefined);
                                }}
                                disabled={processing}
                              />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.fecha_acta && (
                                <p className="text-destructive text-sm">{inertiaErrors.fecha_acta}</p>
                            )}
                            <FormDescription>
                                Fecha de emision del acta de la pasantia
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fecha_inicio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha Inicio</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                                onChange={e => {
                                    field.onChange(e.target.value ? new Date(e.target.value) : undefined);
                                }}
                                disabled={processing}
                              />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.fecha_inicio && (
                                <p className="text-destructive text-sm">{inertiaErrors.fecha_inicio}</p>
                            )}
                            <FormDescription>
                                Fecha de incio de la pasantia
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fecha_fin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha Fin</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                                onChange={e => {
                                    field.onChange(e.target.value ? new Date(e.target.value) : undefined);
                                }}
                                disabled={processing}
                              />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.fecha_fin && (
                                <p className="text-destructive text-sm">{inertiaErrors.fecha_fin}</p>
                            )}
                            <FormDescription>
                                Fecha de fin de la pasantia
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duracion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duracion</FormLabel>
                            <FormControl>
                               <Input
                                    type='number'
                                    {...field}
                                    placeholder="Duracion de la pasantia"
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.duracion && (
                                <p className="text-destructive text-sm">{inertiaErrors.duracion}</p>
                            )}
                            <FormDescription>
                                Duracion de la pasantia en meses
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={processing}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona el estado actual de la pasantia" />
                          </SelectTrigger>
                          <SelectContent>
                            {estadosPasantia.map((estado) => (
                              <SelectItem key={estado} value={estado}>
                                {estado}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                      {inertiaErrors.estado && (
                        <p className="text-destructive text-sm">{inertiaErrors.estado}</p>
                      )}
                      <FormDescription>
                        Estado en el que se encuentra la pasantía
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="monto"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monto</FormLabel>
                            <FormControl>
                               <Input
                                    {...field}
                                    placeholder="Monto de la pasantia"
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.nombre && (
                                <p className="text-destructive text-sm">{inertiaErrors.duracion}</p>
                            )}
                            <FormDescription>
                                Monto de la pasantia
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="domicilio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Domicilio</FormLabel>
                            <FormControl>
                               <Input
                                    {...field}
                                    placeholder="Domicilio"
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.domicilio && (
                                <p className="text-destructive text-sm">{inertiaErrors.domicilio}</p>
                            )}
                            <FormDescription>
                                Domicilio donde se realiza la pasantia
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tareas"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tareas</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Tareas"
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.tareas && (
                                <p className="text-destructive text-sm">{inertiaErrors.tareas}</p>
                            )}
                            <FormDescription>
                                Tareas que realiza la pasantía
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="docente_id"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Docente</FormLabel>
                        <FormControl>
                            <Select
                            value={field.value ? String(field.value) : ''}
                            onValueChange={val => field.onChange(val ? Number(val) : undefined)}
                            disabled={processing || loadingDocentes}
                            >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={
                                loadingDocentes ? "Cargando docentes..." : "Selecciona el docente tutor"
                                } />
                            </SelectTrigger>
                            <SelectContent>
                                {loadingDocentes ? (
                                <SelectItem value="loading" disabled>
                                    Cargando docentes...
                                </SelectItem>
                                ) : (
                                docentes.map((docente) => (
                                    <SelectItem key={docente.id} value={String(docente.id)}>
                                    {docente.nombre} {docente.apellido}
                                    </SelectItem>
                                ))
                                )}
                            </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        {inertiaErrors.docente_id && (
                            <p className="text-destructive text-sm">{inertiaErrors.docente_id}</p>
                        )}
                        <FormDescription>
                            Docente tutor de la pasantía
                        </FormDescription>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        disabled={processing}
                        onClick={onSuccess}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
