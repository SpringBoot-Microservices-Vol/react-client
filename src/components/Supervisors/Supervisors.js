import React, {useEffect, useState} from "react";
import { API }  from "../utils/API";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import Table from "../Table";

export default function Supervisors() {
    const [supervisors, setSupervisors] = useState([]);
    const baseUrl = 'supervisors';
    useEffect(() => {
        (async () => {
            const result = await API.get(baseUrl);
            setSupervisors(result.data);
        })();
    }, []);

    const buildColumnData = [
        {field: "id", text: "id", extra: {isKey: true, hidden: true, hiddenOnInsert: true, autoValue: true}},
        {field: "firstName", text: "Prenume"},
        {field: "lastName", text: "Nume"},
        {field: "", text: "Sala"}
    ];
    return (
        <Table data={supervisors} baseUrl={baseUrl} columnData={buildColumnData}/>
    );
}