import React, {useContext} from "react";
import PlayIcon from "../../../assets/play-btn.svg";
import PencilIcon from "../../../assets/pencil.svg";
import TrashIcon from "../../../assets/trash.svg";
import Button from "react-bootstrap/Button";
import { PostContext } from "../../../contexts/PostContext";


const ActionButtons = ({ url, _id }) => {

  const {postState, deletePost, findPostToUpdate, setShowUpdateModal} = useContext(PostContext)

  const choosePost = (_id) => {
    findPostToUpdate(_id)
    setShowUpdateModal(true)
  }

  return (
    <>
      <Button
        variant="outline-light"
        className="post-button"
        href={url}
        target="_blank"
      >
        <img src={PlayIcon} alt="play" width="32" height="32" />
      </Button>
      <Button variant="outline-light" className="edit-button ms-2" onClick={choosePost.bind(this, _id)}>
        <img src={PencilIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button variant="outline-light" className="delete-button ms-2" onClick={deletePost.bind(this, _id)}>
        <img src={TrashIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
