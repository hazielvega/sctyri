import React, { useState, useEffect } from 'react';
import { Pasantia } from '@/types/pasantia';

interface PasantiaFormProps {
  initialValues?: Partial<Pasantia>;
  onSubmit: (values: Pasantia) => Promise<void>;
  isSubmitting?: boolean;
}

const estadosPasantia = [
  'Activa',
  'Finalizada',
  'Suspendida',
  'Renovada',
  'En revisión'
];

const PasantiaForm: React.FC<PasantiaFormProps> = ({ 
  initialValues, 
  onSubmit, 
  isSubmitting 
}) => {
  const [formData, setFormData] = useState<Partial<Pasantia>>({
    estado: 'En revisión',
    duracion: 30,
    monto: 0,
    ...initialValues
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duracion' || name === 'monto' || name === 'alumno_carreras_id' || 
               name === 'docente_id' || name === 'convenio_id' 
               ? Number(value) 
               : value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Calculate fecha_fin if fecha_inicio or duracion changes
    if ((name === 'fecha_inicio' || name === 'duracion') && formData.fecha_inicio && formData.duracion) {
      const startDate = name === 'fecha_inicio' ? new Date(value) : new Date(formData.fecha_inicio);
      const duration = name === 'duracion' ? Number(formData.duracion) : formData.duracion || 0;
      
      if (!isNaN(startDate.getTime()) && duration > 0) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + duration);
        setFormData(prev => ({
          ...prev,
          fecha_fin: endDate.toISOString().split('T')[0]
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const requiredFields: (keyof Pasantia)[] = [
      'fecha_acta', 'fecha_inicio', 'duracion', 'fecha_fin', 
      'estado', 'monto', 'domicilio', 'tareas',
      'alumno_carreras_id', 'docente_id', 'convenio_id'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Este campo es requerido';
      }
    });

    // Validate dates
    if (formData.fecha_inicio && formData.fecha_fin) {
      const startDate = new Date(formData.fecha_inicio);
      const endDate = new Date(formData.fecha_fin);
      
      if (startDate >= endDate) {
        newErrors.fecha_inicio = 'La fecha de inicio debe ser anterior a la fecha de fin';
      }
    }

    // Validate numbers
    if (formData.duracion !== undefined && formData.duracion <= 0) {
      newErrors.duracion = 'La duración debe ser mayor a 0';
    }

    if (formData.monto !== undefined && formData.monto < 0) {
      newErrors.monto = 'El monto no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData as Pasantia);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Ocurrió un error al enviar el formulario. Por favor intente nuevamente.'
      }));
    }
  };

  return (
    <form 
      id="pasantia-form" 
      onSubmit={handleSubmit} 
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {errors.form && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          {errors.form}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna 1 */}
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="fecha_acta" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha del Acta:
            </label>
            <input
              type="date"
              id="fecha_acta"
              name="fecha_acta"
              value={formData.fecha_acta || ''}
              onChange={handleDateChange}
              className={`block w-full px-3 py-2 border ${errors.fecha_acta ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.fecha_acta && (
              <span className="mt-1 text-sm text-red-600">{errors.fecha_acta}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Inicio:
            </label>
            <input
              type="date"
              id="fecha_inicio"
              name="fecha_inicio"
              value={formData.fecha_inicio || ''}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className={`block w-full px-3 py-2 border ${errors.fecha_inicio ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.fecha_inicio && (
              <span className="mt-1 text-sm text-red-600">{errors.fecha_inicio}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="duracion" className="block text-sm font-medium text-gray-700 mb-1">
              Duración (días):
            </label>
            <input
              type="number"
              id="duracion"
              name="duracion"
              value={formData.duracion || ''}
              onChange={handleChange}
              min="1"
              className={`block w-full px-3 py-2 border ${errors.duracion ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.duracion && (
              <span className="mt-1 text-sm text-red-600">{errors.duracion}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Fin:
            </label>
            <input
              type="date"
              id="fecha_fin"
              name="fecha_fin"
              value={formData.fecha_fin || ''}
              onChange={handleDateChange}
              readOnly
              className={`block w-full px-3 py-2 border ${errors.fecha_fin ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.fecha_fin && (
              <span className="mt-1 text-sm text-red-600">{errors.fecha_fin}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado:
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado || ''}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${errors.estado ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              {estadosPasantia.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
            {errors.estado && (
              <span className="mt-1 text-sm text-red-600">{errors.estado}</span>
            )}
          </div>
        </div>

        {/* Columna 2 */}
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-1">
              Monto:
            </label>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formData.monto || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`block w-full px-3 py-2 border ${errors.monto ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.monto && (
              <span className="mt-1 text-sm text-red-600">{errors.monto}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="domicilio" className="block text-sm font-medium text-gray-700 mb-1">
              Domicilio:
            </label>
            <input
              type="text"
              id="domicilio"
              name="domicilio"
              value={formData.domicilio || ''}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${errors.domicilio ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.domicilio && (
              <span className="mt-1 text-sm text-red-600">{errors.domicilio}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="tareas" className="block text-sm font-medium text-gray-700 mb-1">
              Tareas a realizar:
            </label>
            <textarea
              id="tareas"
              name="tareas"
              value={formData.tareas || ''}
              onChange={handleChange}
              rows={4}
              className={`block w-full px-3 py-2 border ${errors.tareas ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.tareas && (
              <span className="mt-1 text-sm text-red-600">{errors.tareas}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="alumno_carreras_id" className="block text-sm font-medium text-gray-700 mb-1">
              ID Alumno Carrera:
            </label>
            <input
              type="number"
              id="alumno_carreras_id"
              name="alumno_carreras_id"
              value={formData.alumno_carreras_id || ''}
              onChange={handleChange}
              min="1"
              className={`block w-full px-3 py-2 border ${errors.alumno_carreras_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.alumno_carreras_id && (
              <span className="mt-1 text-sm text-red-600">{errors.alumno_carreras_id}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="docente_id" className="block text-sm font-medium text-gray-700 mb-1">
              ID Docente:
            </label>
            <input
              type="number"
              id="docente_id"
              name="docente_id"
              value={formData.docente_id || ''}
              onChange={handleChange}
              min="1"
              className={`block w-full px-3 py-2 border ${errors.docente_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.docente_id && (
              <span className="mt-1 text-sm text-red-600">{errors.docente_id}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="convenio_id" className="block text-sm font-medium text-gray-700 mb-1">
              ID Convenio:
            </label>
            <input
              type="number"
              id="convenio_id"
              name="convenio_id"
              value={formData.convenio_id || ''}
              onChange={handleChange}
              min="1"
              className={`block w-full px-3 py-2 border ${errors.convenio_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.convenio_id && (
              <span className="mt-1 text-sm text-red-600">{errors.convenio_id}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isSubmitting ? 'Enviando...' : initialValues ? 'Actualizar Pasantía' : 'Crear Pasantía'}
        </button>
      </div>
    </form>
  );
};

export default PasantiaForm;