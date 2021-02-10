import React, {useEffect, useState} from "react";
import {API} from "../utils/API";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import Table from "../Table";

export default function CandidatesOptions() {
    const [candidatesOptions, setCandidatesOptions] = useState([]);
    const baseUrl = 'candidate_option';

    useEffect(() => {
        (async () => {
            const result = await API.get(baseUrl);
            setCandidatesOptions(result.data);
            console.log(result.data);
        })();
    }, []);

    const buildColumnData = [
        {
            field: "id", text: "Id", dataType: "java.lang.String",
            extra: {
                isKey: true, editable: false, hiddenOnInsert: true, hidden: true, autoValue: true
            }
        },
        {
            field: "cnp", text: "CNP", dataType: "java.lang.Long", extra: {editable: true}
        },

        {
            field: "admissionOption", text: "Optiune", dataType: "java.lang.String",
            extra: {
                editable: {
                    type: 'select',
                    options: {values: ["RO_BUGET", "RO_TAXA", "EN_BUGET", "EN_TAXA", "MD_RO_BUGET", "MD_EN_BUGET"]}

                }
            }
        },
        {
            field: "priority", text: "Prioritate", dataType: "java.lang.String",

        }

    ];

    return (
        <Table data={candidatesOptions} baseUrl={baseUrl} columnData={buildColumnData}/>
    );
}