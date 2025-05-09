import React from "react";

interface OrderStatusBadgeProps {
  status: "PENDING" | "COMPLETED" | "CANCELLED";
}

const statusStyles: Record<OrderStatusBadgeProps["status"], string> = {
  PENDING: "bg-yellow-200 text-yellow-800",
  COMPLETED: "bg-green-200 text-green-800",
  CANCELLED: "bg-red-200 text-red-800",
};

const statusLabels: Record<OrderStatusBadgeProps["status"], string> = {
  PENDING: "Pendente",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",
};

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

export default OrderStatusBadge;