const StatusBadge = ({ status }) => {
    const styles = {
        Active: "bg-green-50 text-green-600",
        Inactive: "bg-gray-100 text-gray-600",
        Pending: "bg-yellow-50 text-yellow-600"
    };

    return (
        <span className={`px-2 py-1 text-xs rounded-lg font-medium ${styles[status]}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
