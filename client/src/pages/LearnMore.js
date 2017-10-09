import React from "react";
import {Container, Col, Row} from "reactstrap";
import {Header} from "../components/Header";
import {TextImage} from "../components/TextImage";
import {Title} from "../components/Layout";

const styles = {
    hr : {
        margin: "35px 0px"
    }
}

export const LearnMore = props =>
<div>
    <Title title="Learn More"/>
    <Container>
        <Row>
            <Col xs="12">
                <Header>Organize your College Search</Header>
            </Col>
        </Row>
        <Row>
            <Col xs="12">
                <TextImage 
                    source="../images/signup5.jpg" 
                    alt="placeholder"
                    sectionTitle="Sign up for an account">
                    Signing up for an account anables you to save all of your preferences in one place, in your own personal dashboard. This ensures that all of your information is quickly and easily accessible via the web when you need it.  So, unlike with hardcopy papers or folders, you don't have to carry anything with you but your hopes and dreams made possible with a great education.
                </TextImage>
            </Col>
        </Row>
        <hr style={styles.hr} />
        <Row>
            <Col xs="12">
                <TextImage 
                    imgRight="true" 
                    source="../images/dashboard4.jpg" 
                    alt="placeholder"
                    sectionTitle="Add colleges to your dashboard">
                    Searching for and comparing colleges can be a daunting task but your dashboard will help you in making the task less daunting. Simply search for colleges that match up to what you are looking for in a school and save the search results in your dashboard.  This way you don't feel pressured to complete your search all at the same time. The results can be retreived from your dashboard, reviewed and/or added to when it is convenient for you.
                </TextImage>
            </Col>
        </Row>
        <hr style={styles.hr} />
        <Row>
            <Col xs="12">
                <TextImage  
                    source="../images/compare4.jpg" 
                    alt="placeholder"
                    sectionTitle="Add college details">
                    Keeping details about each college organized can be an an overwhelming experience without a good way to do it. Here you will save all of your college details, where the information will be retained in an organized and easy to review fashion. This will save you time and reduce stress by ensuring that details of each college can be compared quickly and easily, apples to apples. This can also increase your level of confidence that your comparisons are being done without bias, helping to ensure that your top choice is the best choice for you.
                </TextImage>
            </Col>
        </Row>
    </Container>
</div>
;

