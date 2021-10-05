import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post }) => {
  const badgeClassName = `rounded-pill ${
    post.status === "LEARNED"
      ? "bg-success"
      : post.status === "LEARNING"
      ? "bg-warning"
      : "bg-danger"
  }`;

  const cardBorder =
    post.status === "LEARNED"
      ? "success"
      : post.status === "LEARNING"
      ? "warning"
      : "danger";
  return (
    <Card className="mt-3 mb-3" border={cardBorder}>
      <Card.Body>
        <Row className="mb-3">
          <Col xs={5}>
            <Card.Title>{post.title}</Card.Title>
          </Col>
          <Col xs={7} className="text-end mt-2 ">
            <ActionButtons url={post.url} _id={post._id} />
          </Col>
        </Row>

        <Card.Text>{post.description}</Card.Text>

        <div className="mb-3">
          <Badge
            as="div"
            className={badgeClassName}
            style={{ padding: "10px 20px" }}
          >
            {post.status}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
