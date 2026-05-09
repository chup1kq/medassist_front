import CrudTable from "../../../components/CrudTable";
import "../../../static/Table.scss";
import * as api from "../../../api/admin/DocumentTypesApi";

const DocumentTypeTable = () => {
    return (
        <CrudTable
            title="Типы документов"
            subtitle="Управление типами документов"
            api={{
                get: api.getDocumentTypes,
                create: api.createDocumentType,
                update: api.updateDocumentType,
                remove: api.deleteDocumentType,
            }}
            getLabel={(item) => item.name}
            setLabel={(value) => ({ name: value })}
        />
    );
};

export default DocumentTypeTable;