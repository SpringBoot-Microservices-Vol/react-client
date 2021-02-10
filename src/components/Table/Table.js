import {API} from "../utils/API";
import {BootstrapTable, ExportCSVButton, TableHeaderColumn} from "react-bootstrap-table";
import React, {useState} from "react";
import {useForm} from "react-hook-form"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {API_BLOB} from "../utils/API_BLOB";
import {addCandidateToCategoryName} from "../services/CandidatesService";

export default function Table(props) {
    const {register, handleSubmit} = useForm();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let baseUrl = props.baseUrl;
    let data = props.data;
    let columnData = props.columnData;
    let keyField = props.keyField;

    function onBeforeSaveCell(row, cellName, cellValue) {
        console.log(row);
        console.log("Change " + cellName + "to value: " + cellValue + " with row-id:" + row.id);
        row[cellName] = cellValue;
        if (baseUrl === "candidates" || baseUrl === "grades" || baseUrl === "candidate_option") {
            API.put(baseUrl + "/" + row.cnp, row).then((response) => {
                console.log(row);
            }, (error) => {
                console.log(row);
                console.log(error);
            });
        } else {
            API.put(baseUrl + "/" + row.id, row).then((response) => {
                console.log(row);
            }, (error) => {
                console.log(row);
                console.log(error);
            });
        }
    }

    function onAfterDeleteRow(rowKeys) {

        API.delete(baseUrl + "/" + rowKeys).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    function handleExportCSVButtonClick() {
        handleShow();
    }

    function createCustomExportCSVButton() {
        return (
            <ExportCSVButton
                btnText='Descarca'
                btnContextual='btn-success'
                className='my-custom-class'
                btnGlyphicon='glyphicon-export fa-download'
                onClick={e => handleExportCSVButtonClick(e)}/>
        );
    }

    function onAfterInsertRow(row) {
        console.log(baseUrl);
        if (baseUrl !== "candidates" && baseUrl !== "grades") {
            console.log("Add default id with value -1");
            row.id = "-1";
        }

        if (baseUrl === "candidates" && typeof row['categoryName'] !== undefined) {
            addCandidateToCategoryName(row, row.categoryName);
        } else {
            API.post(baseUrl, row).then((response) => {
                console.log(row);
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        }
    }

    const options = {
        exportCSVBtn: createCustomExportCSVButton,
        insertText: 'Inseriaza',
        deleteText: 'Sterge',
        SAVE_BTN_TEXT: 'Salveaza',
        afterInsertRow: onAfterInsertRow,
        afterDeleteRow: onAfterDeleteRow
    };

    const cellEditProp = {
        mode: 'dbclick',
        blurToSave: true,
        beforeSaveCell: onBeforeSaveCell
    };

    const selectRowProp = {
        mode: 'checkbox'
    };

    const tableHeaderColumns = columnData.map((column, i) => (
        <TableHeaderColumn dataField={column.field} dataSort={true} key={i} {...column.extra}>
            {column.text}
        </TableHeaderColumn>
    ));

    function filterId() {
        let columns = [];
        columnData.forEach(function (column) {
            if (column.field !== "id" && column.field !== "") {
                columns.push(column);
            }
        });
        return columns;
    }

    const tableHeaderColumnsFormCheck = filterId().map((column, i) => (
        <Form.Check type="checkbox" name={column.field} id={i} label={column.text} key={column.field}
                    ref={register}/>
    ));

    function handleDownload(data) {

        let result = Object.keys(data).map(function (key) {

            return [(key), data[key]];
        });

        let i = 0;
        columnData.forEach((element => {
            try {
                if (element.field !== "id" && element.field !== "") {
                    if (element.field === result[i][0]) {
                        if (result[i][1] === true) {
                            element.isReport = true;
                        } else {
                            element.isReport = false;
                        }
                    }
                    i++;
                } else {
                    element.isReport = false;
                }
            } catch (e) {
                console.log(e);
                element.isReport = false;
            }
        }));

        const report = {
            sourceList: props.data,
            columnsReport: columnData
        };

        API_BLOB.post(`reports/${baseUrl}`, report).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", baseUrl + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
        handleClose();
    }

    return (
        <React.Fragment>
            <BootstrapTable data={data}
                            keyField={keyField}
                            options={options}
                            insertRow={true}
                            deleteRow={true}
                            search={true}
                            multiColumnSearch={true}
                            pagination={true}
                            exportCSV={baseUrl !== 'grades' && baseUrl !== 'candidate_option'}
                            selectRow={selectRowProp}
                            cellEdit={cellEditProp}>
                {tableHeaderColumns}
            </BootstrapTable>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alege coloanele pentru raport</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicCheckbox">
                            {tableHeaderColumnsFormCheck}
                        </Form.Group>

                        <Button variant="secondary" onClick={handleClose}>
                            Inchide
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit(handleDownload)}>
                            Descarca
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}