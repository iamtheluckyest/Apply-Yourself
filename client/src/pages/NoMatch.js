import React from "react";
import {Title} from "../components/Layout";

export const NoMatch = props =>
    <div>
        <Title title="Page not found"/>
        <p style={{textAlign: "center", marginTop: "30px"}}>
            Sorry, no page exists with that path name.
        </p>
    </div>
;

