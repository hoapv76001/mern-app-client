import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const About = () => {
    return (
        <Container >
            <Row className='mt-5'>
                <Col className='text-center' >
                    <Button variant="primary" href='https://hoahientk.com' size='lg'>
                        Visit my website to know more anything!
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default About
