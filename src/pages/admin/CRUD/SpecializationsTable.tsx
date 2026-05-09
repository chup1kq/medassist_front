import CrudTable from "../../../components/CrudTable";
import "../../../static/Table.scss";
import * as api from "../../../api/admin/SpecializationApi";

const SpecializationsTable = () => {
    return (
        <CrudTable
            title="Специализации"
            subtitle="Управление специализациями врачей"
            api={{
                get: api.getSpecializations,
                create: api.createSpecialization,
                update: api.updateSpecialization,
                remove: api.deleteSpecialization,
            }}
            getLabel={(item) => item.name}
            setLabel={(value) => ({ name: value })}
        />
    );
};

export default SpecializationsTable;