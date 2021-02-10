import React, {useEffect, useState} from "react";
import {API} from "../utils/API";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import Table from "../Table";
import {Link} from "react-router-dom";
import "./Candidates.css"
import {getCategoriesName} from "../services/CandidatesService";

export default function Candidates() {
    const [candidates, setCandidates] = useState([]);
    const [categories, setCategories] = useState([]);
    const baseUrl = 'candidates';
    const baseUrlHalls = 'halls';
    const baseUrlCategories = 'categories';

    const [applicationState, setApplicationState] = useState({
        id: 1,
        isImportedResources: 'false',
        isDistributed: 'false',
        isDistributedFinalized: 'false',
        isExamFinish: 'false'
    });

    const fetchData = () => API.get(baseUrl).then(({data}) => setCandidates(data));
    const fetchDataCategories = () => API.get(baseUrlCategories).then(({data}) => setCategories(data));

    useEffect(() => {
            API.get('data_base').then(({data}) => {
                setApplicationState(data);
            })
        }, []
    );

    useEffect(() => {
        fetchData();
        fetchDataCategories();
    }, []);

    function buttonInsideHall() {
        if (arguments[1].hallId != null) {
            return (<div>
                <Link to={`${baseUrlHalls}/${arguments[1].hallId}`}>{arguments[1].hallName}</Link>
            </div>)
        }
    }

    const rejectCandidate = (cnp) => {
        API.get('/admission/reject/' + cnp).then(fetchData);
    };

    function buttonReject(element, {cnp}) {
        const candidate = candidates.find(candidate => candidate.cnp === cnp);

        if (candidate && candidate.statusExam === "RESPINS") {
            return (<div>RESPINS</div>);
        } else {
            return (<button className="button-reject-candidate"
                            onClick={() => rejectCandidate(cnp)}> Respinge </button>);
        }
    }

    const buildColumnData = [
        {field: "cnp", text: "CNP", dataType: "java.lang.Long", extra: {isKey: true}},
        {field: "firstName", dataType: "java.lang.String", text: "Prenume"},
        {field: "lastName", dataType: "java.lang.String", text: "Nume"},
        {field: "bacGrade", dataType: "java.lang.Double", text: "Mate/Info"},
        {field: "bacBestGrade", dataType: "java.lang.Double", text: "Bac"},
        {field: "highSchool", dataType: "java.lang.String", text: "Liceu"},
        {
            field: "categoryName",
            text: "Categoria",
            dataType: "java.lang.String",
            extra: {editable: {type: 'select', options: {values: getCategoriesName(categories)}}}
        },
        {
            field: "hallName",
            dataType: "java.lang.String",
            text: "Sala",
            extra: {dataFormat: buttonInsideHall, editable: false}
        },
        {
            field: "",
            text: "Respinge Candidat",
            dataType: "java.lang.Long",
            extra: {
                dataFormat: buttonReject,
                hidden: applicationState.isExamFinish === "false",
                hiddenOnInsert: true,
                editable: false
            }
        }
    ];

    return (
        <Table data={candidates} baseUrl={'candidates'} columnData={buildColumnData}/>
    );
}