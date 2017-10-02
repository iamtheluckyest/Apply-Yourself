import React from "react";
import {Container, Col, Row} from "reactstrap";
import {Header} from "../components/Header";
import {TextImage} from "../components/TextImage";

const styles = {
    hr : {
        margin: "30px 0px"
    }
}

export const LearnMore = props =>
<Container>
    <Row>
        <Col xs="12">
            <Header>Organize your College Search</Header>
        </Col>
    </Row>
    <Row>
        <Col xs="12">
            <TextImage source="http://via.placeholder.com/350x250" alt="placeholder">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
            </TextImage>
        </Col>
    </Row>
    <hr style={styles.hr} />
    <Row>
        <Col xs="12">
            <TextImage imgRight="true" source="http://via.placeholder.com/250x250" alt="placeholder">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
            </TextImage>
        </Col>
    </Row>
    <hr style={styles.hr} />
    <Row>
        <Col xs="12">
            <TextImage  source="http://via.placeholder.com/250x250" alt="placeholder">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
            </TextImage>
        </Col>
    </Row>
</Container>
;

