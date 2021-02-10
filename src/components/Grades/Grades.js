import React, {useState, useEffect} from "react";
import {API} from "../utils/API";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import Table from "../Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import "./Grades.css"

export default function Grades() {
    const baseUrl = 'grades';
    const [grades, setGrades] = useState([]);
    const [applicationState, setApplicationState] = useState({
        id: 1,
        isImportedResources: 'false',
        isDistributed: 'false',
        isDistributedFinalized: 'false',
        isExamFinish: 'false'
    });

    useEffect(() => {
            API.get('data_base').then(({data}) => {
                setApplicationState(data);
                console.log(data);
            })
        }, []
    );

    const fetchData = () => {
        (async () => {
            const result = await API.get(baseUrl);
            console.log(result.data);
            setGrades(result.data);
        })();
    };

    useEffect(() => {
        fetchData()
    }, []);

    function showName(candidateDTO) {
        return candidateDTO.lastName + candidateDTO.firstName;
    }

    const buildColumnData = [
        {field: "cnp", text: "CNP", dataType: "java.lang.Long", extra: {isKey: true}},
        {
            field: "candidateDTO",
            dataType: "com.sergiu.dto.candidateDTO",
            text: "Nume",
            extra: {dataFormat: showName, editable: false}
        },

        {field: "firstGrade", text: "Nota 1", dataType: "java.lang.Double"},
        {field: "nameProfessorOne", text: "Profesor 1", dataType: "java.lang.String"},
        {field: "secondGrade", text: "Nota 2", dataType: "java.lang.Double"},
        {field: "nameProfessorTwo", text: "Profesor 2", dataType: "java.lang.String"},
    ];


    function addGrades() {

        API.post('files/load_grades').then((response) => {
            fetchData();
        }, (error) => {
            console.log(error);
        });

    }

    const ButtonAddGrades = <button className="button-add-grades" onClick={addGrades}> Import </button>;

    return (
        <React.Fragment>
            <Table data={grades} baseUrl={'grades'} columnData={buildColumnData}/>
            {grades.length === 0 && applicationState.isDistributedFinalized === "true" &&
            <ButtonToolbar>
                {ButtonAddGrades}
            </ButtonToolbar>
            }
        </React.Fragment>
    );
}