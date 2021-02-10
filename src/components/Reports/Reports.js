import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {API} from "../utils/API";
import {API_BLOB} from "../utils/API_BLOB";

export default function Reports() {
    const [halls, setHalls] = useState([]);
    const [applicationState, setApplicationState] = useState({
        id: 1,
        isImportedResources: 'true',
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

    useEffect(() => {
        (async () => {
            const result = await API.get('/halls/');

            setHalls(result.data);
        })();
    }, []);


    function generalListDistributed() {
        API_BLOB.get("reports/general_list_distributed/").then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "lista_genera_pentru_repartizare.pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    function handleDownloadReportOnHall(id) {
        console.log(id);
        API_BLOB.get("reports/candidates_from_hall/" + id).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "candidates_from_hall_" + id + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    function handleDownloadReportWithoutExam() {
        API_BLOB.get("reports/candidates_without_exam/").then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "lista_candidatilor_fara_examen.pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    function generalListWithResults() {
        API_BLOB.get("reports/general_list_results").then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "lista_genera_cu_rezultate.pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    function generalList(listName) {
        API_BLOB.get("reports/list/" + listName).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "lista" + listName + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <React.Fragment>
            <Row style={{marginBottom: 36}}>
                {applicationState.isDistributedFinalized === "true" &&
                <Col>
                    <Card bg="white" text="dark">
                        <Card.Header className="d-flex justify-content-center">
                            Repoarte de desfasurarea sesiunii de Admitere
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => {
                                            generalListDistributed();
                                        }}>Lista generală a candidaţilor
                                </button>
                            </Card.Text>

                            {halls.map(hall => hall.listCandidates.length > 0 && <Card.Text key={hall.id}>
                                <button className="button btn btn-link"
                                        onClick={() => {
                                            handleDownloadReportOnHall(hall.id)
                                        }}>
                                    Lista candidaţilor care vor susţine examenul în sala {hall.name}
                                </button>
                            </Card.Text>)}

                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => handleDownloadReportWithoutExam()}>
                                    Lista candidaţilor care nu susţin proba scrisă
                                </button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                }
            </Row>
            <Row style={{marginBottom: 36}}>
                {applicationState.isExamFinish === "true" &&
                <Col>
                    <Card bg="white" text="dark">
                        <Card.Header className="d-flex justify-content-center">Repoarte de rezultate a sesiunii de
                            admitere</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalListWithResults()}>Lista generală a candidaţilor
                                </button>
                            </Card.Text>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalList("L1")}>Lista candidaţilor olimpici (L1)
                                </button>
                            </Card.Text>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalList("L2")}>Lista candidaţilor declaraţi admişi pe
                                    locurile rezervate absolvenţilor de licee din mediul rural (L2)
                                </button>
                            </Card.Text>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalList("L3")}>Lista candidaţilor declaraţi admişi pe
                                    locurile finantaţe de la buget, studii în limba română (L3)
                                </button>
                            </Card.Text>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalList("L4")}>Lista candidaţilor declaraţi admişi pe
                                    locurile finanţate de la buget, studii în limba engleză (L4)
                                </button>
                            </Card.Text>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalList("L5")}>Lista candidaţilor declaraţi admişi pe
                                    locurile cu taxă, studii în limba română (L5)
                                </button>
                            </Card.Text>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalList("L6")}>Lista candidaţilor declaraţi admişi pe
                                    locurile cu taxă, studii în limba engleză (L6)
                                </button>
                            </Card.Text>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalList("L7")}>Lista candidaţilor declaraţi respinşi, care
                                    pot beneficia de refacerea ulterioară a listelor (L7)
                                </button>
                            </Card.Text>
                            <Card.Text>
                                <button className="button btn btn-link"
                                        onClick={() => generalList("L8")}>Lista candidaţilor declaraţi respinşi (L8)
                                </button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>}
            </Row>
        </React.Fragment>
    );

}

