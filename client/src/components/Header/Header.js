import React from 'react';

const styles = {
    margin: "30px auto 50px auto",
    fontSize : "3em",
    color: "#001c39",
    textAlign: "center"
}

export const Header = props => 
    <h1 style={styles}>{props.children}</h1>
;