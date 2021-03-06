import React, {Component} from "react";
import styled from "styled-components";
import { API }  from "../../utils/API";
import {MyContext} from "../../MyContext";

const Styles = styled.div`
  .button {
        background-color: #696969; /* Green */
        border: none;
        color: white;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 2px 2px;
        cursor: pointer;
  }
  .button:disabled {
        opacity: 0.5;
        }
`;

export default class ButtonReset extends Component {
    state = {
        loading: false
    };

    fetchData = () => {
        this.setState({loading: true});

        API.get('/distribution/clear').then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        setTimeout(() => {
            this.setState({loading: false});
        }, 2000);
    };

    render() {
        const {loading} = this.state;

        return (
            <Styles>
                <div style={{marginTop: "5px"}}>
                    <MyContext.Consumer>
                        {(context) => (
                            <React.Fragment>
                                <button className="button" onClick={() => {
                                    context.setMyFlagFalse();
                                    this.fetchData()
                                }} disabled={loading}>
                                    {loading && (
                                        <i
                                            className="fa fa-refresh fa-spin"
                                            style={{marginRight: "5px"}}
                                        />
                                    )}
                                    {loading && <span>Reset</span>}
                                    {!loading && <span>Reset</span>}
                                </button>
                            </React.Fragment>
                        )}
                    </MyContext.Consumer>
                </div>
            </Styles>
        );
    }
}
