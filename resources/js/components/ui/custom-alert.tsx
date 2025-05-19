import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircleIcon, 
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon 
} from "lucide-react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface CustomAlertProps {
  message: string;
  variant?: AlertVariant;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const variantStyles = {
  success: {
    container: "border-green-500 bg-green-50 dark:bg-green-900/20",
    icon: "text-green-600 dark:text-green-400",
    text: "text-green-800 dark:text-green-200",
    iconComponent: CheckCircleIcon,
  },
  error: {
    container: "border-red-500 bg-red-50 dark:bg-red-900/20",
    icon: "text-red-600 dark:text-red-400",
    text: "text-red-800 dark:text-red-200",
    iconComponent: XCircleIcon,
  },
  warning: {
    container: "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
    icon: "text-yellow-600 dark:text-yellow-400",
    text: "text-yellow-800 dark:text-yellow-200",
    iconComponent: AlertTriangleIcon,
  },
  info: {
    container: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
    icon: "text-blue-600 dark:text-blue-400",
    text: "text-blue-800 dark:text-blue-200",
    iconComponent: InfoIcon,
  },
};

export function CustomAlert({
  message,
  variant = "success",
  className = "",
  iconClassName = "",
  textClassName = "",
}: CustomAlertProps) {
  if (!message) return null;

  const {
    container,
    icon,
    text,
    iconComponent: IconComponent
  } = variantStyles[variant];

  return (
    <Alert className={`${container} ${className}`}>
      <IconComponent className={`h-5 w-5 ${icon} ${iconClassName}`} />
      <AlertDescription className={`${text} ${textClassName}`}>
        {message}
      </AlertDescription>
    </Alert>
  );
}

// Componentes específicos para cada tipo
export function SuccessAlert(props: Omit<CustomAlertProps, "variant">) {
  return <CustomAlert variant="success" {...props} />;
}

export function ErrorAlert(props: Omit<CustomAlertProps, "variant">) {
  return <CustomAlert variant="error" {...props} />;
}

export function WarningAlert(props: Omit<CustomAlertProps, "variant">) {
  return <CustomAlert variant="warning" {...props} />;
}

export function InfoAlert(props: Omit<CustomAlertProps, "variant">) {
  return <CustomAlert variant="info" {...props} />;
}