import CrudTable from "../../../components/CrudTable";
import "../../../static/Table.scss";
import * as api from "../../../api/admin/ConditionsApi";

const ConditionsTable = () => {
    return (
        <CrudTable
            title="Состояния"
            api={{
                get: api.getConditions,
                create: api.createCondition,
                update: api.updateCondition,
                remove: api.deleteCondition,
            }}
            getLabel={(item) => item.text}
            setLabel={(value) => ({ text: value })}
        />
    );
};

export default ConditionsTable;