import { Badge } from "../ui/badge";

const StatusBadge = ({ status }: { status: string }) => {
    const colorMap: Record<string, string> = {
        pending: 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300',
        shipped: 'bg-blue-200 text-blue-800 hover:bg-blue-300',
        delivered: 'bg-green-200 text-green-800 hover:bg-green-300',
        cancelled: 'bg-red-200 text-red-800 hover:bg-red-300'
    };

    return (
        <Badge className={`${colorMap[status.toLowerCase()] || 'bg-gray-200 text-gray-800'} max-w-fit rounded-sm`}>
            {status}
        </Badge>
    );
};

export default StatusBadge;