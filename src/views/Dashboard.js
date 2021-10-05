import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SinglePost from "../components/layout/post/SinglePost";
import AddPostModal from "../components/layout/post/AddPostModal";
import AddIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../components/layout/post/UpdatePostModal";

const Dashboard = () => {
  //use context form Auth
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  //User context from Post context
  const {
    postState: { post, posts, postLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  useEffect(() => getPosts(), []);

  let body;

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <Container>
        <Row>
          <Col className="text-center">
            <Card className="mt-5">
              <Card.Header as="h1">Hi {username}</Card.Header>
              <Card.Body>
                <Card.Title>Welcome to LearnIT</Card.Title>
                <Card.Text>
                  Click to button below to track your first skill to learn
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={setShowAddPostModal.bind(this, true)}
                >
                  LearnIT
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    body = (
      <>
        <Container fluid>
          <Row>
            {posts.map((post) => (
              <Col key={post._id} className="mt-3" lg={6} xl={4}>
                <SinglePost post={post} />
              </Col>
            ))}
          </Row>
        </Container>

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="tooltip">Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            variant="light"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={AddIcon} alt="Add post" width={60} />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {body}
      <Toast
        className={`bg-${type} text-white`}
        style={{ position: "fixed", top: "15%", right: "20px" }}
        show={show}
        autohide
        delay={5000}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: "",
        })}
      >
        <Toast.Body> {message} </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
