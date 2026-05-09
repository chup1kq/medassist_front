import { useState, useMemo, useRef, useEffect } from "react";

interface Option {
    id: number;
    label: string;
}

interface Props {
    options: Option[];
    value: number;
    placeholder: string;
    onChange: (id: number) => void;
}

const CustomSelect: React.FC<Props> = ({
                                           options,
                                           value,
                                           placeholder,
                                           onChange,
                                       }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find(o => o.id === value);

    const filtered = useMemo(() => {
        return options.filter(o =>
            o.label.toLowerCase().includes(query.toLowerCase())
        );
    }, [options, query]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="custom-select" ref={ref}>
            <div
                className="select-trigger"
                onClick={() => setOpen(prev => !prev)}
            >
                {selected ? selected.label : placeholder}
            </div>

            {open && (
                <div className="select-dropdown">
                    <input
                        className="select-search"
                        placeholder="Поиск..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <div className="select-list">
                        {filtered.length === 0 ? (
                            <div className="no-options">Ничего не найдено</div>
                        ) : (
                            filtered.map(option => (
                                <div
                                    key={option.id}
                                    className="select-option"
                                    onClick={() => {
                                        onChange(option.id);
                                        setOpen(false);
                                        setQuery("");
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;