
export default function PrimaryButtonComponent({
    label,
    onClick,
}) {

    return (

        <button
            onClick={onClick}
            className="w-full bg-black text-white py-2 rounded-md font-semibold"
        >
            {label}
        </button>

    );
}