import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, {useContext, useState, useEffect} from 'react'
import { PostContext } from '../../../contexts/PostContext'

const UpdatePostModal = () => {
    //context
    const {
        postState: {post},
        showUpdateModal,
        setShowUpdateModal,
        updatePost
    } = useContext(PostContext);

    

    //State
    const [updatedPost, setUpdatedPost] = useState(post)

    useEffect(() => setUpdatedPost(post), [post])

    const {title, description, url, status} = updatedPost

    const onChangeUpdatedForm = event => setUpdatedPost({...updatedPost, [event.target.name]: event.target.value})


    const closeDialog = () => {
        setShowUpdateModal(false)
        setUpdatedPost(post)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updatePost(updatedPost)
        // try {
        //     const data = await addPost(newPost)
        //     if(data) {
        //         setNewPost({
        //             title: '',
        //             description: '',
        //             url: '',
        //             status: 'TO LEARN'
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
        
        setShowUpdateModal(false)
    }

    return (
        <Modal
        show={showUpdateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={closeDialog}
        >
        <ModalHeader>
            <ModalTitle id="contained-modal-title-vcenter">
                Making progress?
            </ModalTitle>
            <Button className='btn-close' variant="light" onClick={closeDialog} ></Button>
        </ModalHeader>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' placeholder="Title" required value={title} onChange={onChangeUpdatedForm} />
                    <Form.Text id='title-help' className="text-muted">
                    Required
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea' name='description' rows={3} placeholder="Description" value={description} onChange={onChangeUpdatedForm} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="url">
                    <Form.Label>Your tutorial url</Form.Label>
                    <Form.Control type="text" name='url' placeholder="Url" value={url} onChange={onChangeUpdatedForm} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="url">
                    <Form.Label>Your tutorial url</Form.Label>
                    <Form.Control as='select' name='status' onChange={onChangeUpdatedForm} >
                        <option value='TO LEARN'>TO LEARN</option>
                        <option value='LEARNING'>LEARNING</option>
                        <option value='LEARNED'>LEARNED</option>
                    </Form.Control>
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

export default UpdatePostModal
