import React, {useState, useEffect} from "react";
import {API} from "../utils/API";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import Table from "../Table";

export default function Categories() {
    const baseUrl = 'categories';
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await API.get(baseUrl);
            console.log(result.data);
            setCategories(result.data);
        })();
    }, []);

    function showNumberCandidates(candidateDTOS) {
        return candidateDTOS.length;
    }

    const buildColumnData = [
        {
            field: "id",
            text: "ID",
            dataType: "java.lang.Integer",
            extra: {isKey: true, hidden: true, hiddenOnInsert: true, autoValue: true}
        },
        {field: "name", dataType: "java.lang.String", text: "Nume",},

        {field: "discipline", text: "Disciplina", dataType: "java.lang.String"},
        {field: "language", text: "Limba", dataType: "java.lang.String"},
        {field: "admissionType", text: "Tip Admitere", dataType: "java.lang.String"},
        {
            field: "candidateDTOS",
            dataType: "com.sergiu.dto.candidateDTO",
            text: "Canidati",
            extra: {dataFormat: showNumberCandidates, editable: false, hiddenOnInsert: true}
        },
    ];

    return (<Table data={categories} baseUrl={baseUrl} columnData={buildColumnData}/>);
}