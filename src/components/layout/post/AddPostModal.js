import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, {useContext, useState} from 'react'
import { PostContext } from '../../../contexts/PostContext'

const AddPostModal = () => {
    //context
    const {showAddPostModal, setShowAddPostModal, addPost} = useContext(PostContext);

    

    //State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const {title, description, url} = newPost


    const closeDialog = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowAddPostModal(false)
    }

    const onChangeNewPostForm = event => setNewPost({...newPost, [event.target.name]: event.target.value})

    const addPostForm = async event => {
        event.preventDefault()
        try {
            const data = await addPost(newPost)
            if(data) {
                setNewPost({
                    title: '',
                    description: '',
                    url: '',
                    status: 'TO LEARN'
                })
            }
        } catch (error) {
            console.log(error)
        }
        
        setShowAddPostModal(false)
    }

    return (
        <Modal
        show={showAddPostModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={closeDialog}
        >
        <ModalHeader>
            <ModalTitle id="contained-modal-title-vcenter">
            What do you want to learn?
            </ModalTitle>
            <Button className='btn-close' variant="light" onClick={closeDialog} ></Button>
        </ModalHeader>
        <Modal.Body>
            <Form onSubmit={addPostForm}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' placeholder="Title" required value={title} onChange={onChangeNewPostForm} />
                    <Form.Text id='title-help' className="text-muted">
                    Required
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea' name='description' rows={3} placeholder="Description" value={description} onChange={onChangeNewPostForm} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="url">
                    <Form.Label>Your tutorial url</Form.Label>
                    <Form.Control type="text" name='url' placeholder="Url" value={url} onChange={onChangeNewPostForm} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    LearnIt
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className='btn-floading' variant='danger' onClick={closeDialog}>Cancel</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default AddPostModal
