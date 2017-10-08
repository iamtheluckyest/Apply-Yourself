import React, {Component} from "react";
import '../styles/Start.css';
import {Link} from "react-router-dom";
import { Container, Button, Row, Col } from 'reactstrap';

const styles= {
    center : {
        margin: "auto",
        position: "relative",
        top: "30vh"
    },
    heroText : {
        textAlign: "center",
        color: "#FFF"
    },
    h1 : {
        fontSize : "3.5em",
        marginBottom: "15px",
        color:"#FFF"
    },
    p : {
        fontSize : "2em"        
    }
}

export class Start extends Component {
    
    componentDidMount() {
        document.title = "Apply Yourself"
        document.body.style.background = "linear-gradient(rgba(0, 28, 57, 0.45), rgba(0, 28, 57, 0.45)), url('./images/yale-university-gate.jpeg') center center no-repeat fixed";
        document.body.style.backgroundSize = "cover";
        this.props.showHideNav(false)
    }

    componentWillUnmount() {
        document.body.style.background = "#FFF";
        document.body.style.backgroundImage = "none";
        this.props.showHideNav(true)
    }

    render() {
        return (
            <Container style={styles.center}>
                <div>
                    <Container>
                        <Row>
                            <Col style={styles.heroText}>
                                <h1 style={styles.h1}>Apply Yourself</h1>
                                <p className="titlepage-lead">
                                    Your college search, organized.
                                    <br />
                                    <a href="/learnMore"><small>Learn more</small></a>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="6">
                                <Link to="/search">
                                    <Button color="primary" className="homeButton-left">Search Colleges</Button>
                                </Link>
                            </Col>
                            <Col xs="12" sm="6">
                                <Link to="/login">
                                    <Button color="primary" className="homeButton-right">Sign up/Log in</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        )
    }
};
