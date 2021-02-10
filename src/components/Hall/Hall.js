import React, {useEffect, useState} from "react";
import { API }  from "../utils/API";
import Table from "../Table";


export default function IndividualHall(props) {
    const [candidates, setCandidates] = useState([]);
    const baseUrl = 'candidates';
    const {id} = props.match.params;

    useEffect(() => {
        (async () => {
            const result = await API.get('/halls/' + id);
            console.log(result.data);
            setCandidates(result.data.listCandidates);
        })();
    }, [id]);

    const buildColumnData = [
        {field: "cnp", text: "CNP", dataType: "java.lang.Long"},
        {field: "firstName", dataType: "java.lang.String", text: "Prenume"},
        {field: "lastName", dataType: "java.lang.String", text: "Nume"},
        {field: "highSchool", dataType: "java.lang.String", text: "Liceu"}
    ];


    return (
        <Table data={candidates} baseUrl={baseUrl} columnData={buildColumnData} keyField={"cnp"}/>
    );
}