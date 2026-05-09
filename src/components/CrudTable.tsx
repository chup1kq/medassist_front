import { useEffect, useState } from "react";
import Page from "../data/Page";
import "../static/Table.scss";

interface CrudApi<T, U> {
    get: (page: number, query?: string) => Promise<Page<T>>;
    create: (data: U) => Promise<any>;
    update: (id: number, data: U) => Promise<any>;
    remove: (id: number) => Promise<any>;
}

interface CrudTableProps<T> {
    title: string;
    subtitle?: string;
    api: CrudApi<T, any>;

    getLabel: (item: T) => string;
    setLabel: (value: string) => any;
}

const CrudTable = <T extends { id: number }>({
                                                 title,
                                                 subtitle,
                                                 api,
                                                 getLabel,
                                                 setLabel,
                                             }: CrudTableProps<T>) => {
    const [data, setData] = useState<Page<T> | null>(null);
    const [loading, setLoading] = useState(true);

    const [createValue, setCreateValue] = useState("");
    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    const load = async (page = 0, query = search) => {
        setLoading(true);
        try {
            const res = await api.get(page, query);
            setData(res);
        } catch {
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreate = async () => {
        if (!createValue.trim()) return;

        await api.create(setLabel(createValue));
        setCreateValue("");

        load(0);
    };

    const handleDelete = async (id: number) => {
        if (!data) return;

        await api.remove(id);

        const isLastItem = data.content.length === 1;
        const prevPage = data.number > 0 ? data.number - 1 : 0;

        load(isLastItem ? prevPage : data.number);
    };

    const handleEdit = (item: T) => {
        setEditingId(item.id);
        setEditValue(getLabel(item));
    };

    const handleSave = async (id: number) => {
        if (!editValue.trim()) return;

        await api.update(id, setLabel(editValue));

        setEditingId(null);
        setEditValue("");

        load(data?.number || 0);
    };

    const handleSearch = () => {
        load(0, search);
    };

    if (loading) {
        return <div className="admin-loading">Загрузка...</div>;
    }

    if (!data) {
        return <div className="admin-loading">Ошибка загрузки</div>;
    }

    const { content, totalPages, number } = data;

    return (
        <div className="crud-page">
            {/* HEADER */}
            <div className="page-header">
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>

            {/* SEARCH */}
            <div className="search-bar">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск..."
                />
                <button onClick={handleSearch}>Найти</button>
            </div>

            {/* CREATE */}
            <div className="form-card">
                <input
                    value={createValue}
                    onChange={(e) => setCreateValue(e.target.value)}
                    placeholder="Введите значение..."
                />
                <button onClick={handleCreate}>
                    Добавить
                </button>
            </div>

            <div className="table-card">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {content.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="empty">
                                Нет данных
                            </td>
                        </tr>
                    ) : (
                        content.map((item) => {
                            const isEditing = editingId === item.id;

                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>

                                    <td>
                                        {isEditing ? (
                                            <input
                                                value={editValue}
                                                onChange={(e) =>
                                                    setEditValue(e.target.value)
                                                }
                                                autoFocus
                                            />
                                        ) : (
                                            getLabel(item)
                                        )}
                                    </td>

                                    <td className="actions">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    className="save-btn"
                                                    onClick={() =>
                                                        handleSave(item.id)
                                                    }
                                                >
                                                    Сохранить
                                                </button>

                                                <button
                                                    className="cancel-btn"
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditValue("");
                                                    }}
                                                >
                                                    Отмена
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    disabled={editingId !== null}
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    Редактировать
                                                </button>

                                                <button
                                                    disabled={editingId !== null}
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                >
                                                    Удалить
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>

            {totalPages > 0 && (
                <div className="pagination">
                    {number > 0 && (
                        <button onClick={() => load(number - 1)}>←</button>
                    )}

                    <span>
                        Страница {number + 1} из {totalPages}
                    </span>

                    {number + 1 < totalPages && (
                        <button onClick={() => load(number + 1)}>→</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CrudTable;