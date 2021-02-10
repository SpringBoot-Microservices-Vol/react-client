// first we will make a new context
import React, {Component} from "react";
import {MyContext} from "./MyContext";
import cookie from "react-cookies"

// Then create a provider Component
class MyProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {cool: cookie.load("cool")};
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                setMyFlagTrue: () => {
                    cookie.save("cool", "show", {path: "/"});
                    this.setState({
                        cool: "show"
                    });

                },
                setMyFlagFalse: () => {
                    cookie.save("cool", "hide", {path: "/"});
                    this.setState({
                        cool: "hide"
                    });
                    console.log("Set cookie to false:" + cookie.load("cool"))

                }
            }
            }>
                {this.props.children}

            </MyContext.Provider>
        )
    }
}

export default MyProvider;