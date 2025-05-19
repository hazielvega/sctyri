export interface Field {
  name: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'number' | 'email' | 'password'; // añade más tipos según necesites
  options?: string[];
}

export interface ModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  item: T | null;
  fields: Field[];
  endpoint?: string;
}