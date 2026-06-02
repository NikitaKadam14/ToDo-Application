
export default function InputComponent({
    type,
    placeholder,
    onChange,
    name,
    value,
}) {

    return (

        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
        />

    );
}