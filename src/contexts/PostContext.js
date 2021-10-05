import React, { createContext, useReducer, useState } from "react";
import { apiUrl } from "./Contants";
import axios from "axios";
import { PostReducer } from "../Reducers/PostReducer";
import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from "../Reducers/Type";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {

  //Create state use reducer
  const [postState, dispatch] = useReducer(PostReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });  

  //Create state update post
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  //Find post

  const findPostToUpdate = (_id) => {
    const post = postState.posts.find(post => post._id === _id)
    dispatch({type: FIND_POST, payload: post})
    setShowUpdateModal(true)
  }

  //xử lý Toast
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null
  })  

  //Xử lý Add Post modal
  const [showAddPostModal, setShowAddPostModal] = useState(false)

  //Get post
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
        return response.data
      }
    } catch (error) {
      
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  //Add post

  const addPost = async newPost => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost)
      if(response.data.success) {
        dispatch({type: ADD_POST, payload: response.data.post})
        setShowToast({show: true, message: response.data.message, type: 'success'})
        return response.data
      }
    } catch (error) {
      console.log(error)
      setShowToast({show: true, message: "Can not add new post", type: 'danger'})
      return error.response.data ? error.response.data : {success: false, message: 'server error'}
    }
  }

  //Update Post
  const updatePost = async updatePost => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)
      if(response.data.success) {
        dispatch({type: UPDATE_POST, payload: response.data.post})
        setShowToast({show: true, message: 'Update post success', type: 'success'})
        return response.data
      }
    } catch (error) {
      console.log(error)
      setShowToast({show: true, message: 'Can not update the post', type: 'danger'})
      return error.response.data ? error.response.data : {success: false, message: 'server error'}
    }
  }

  //Delete Post
  const deletePost = async postId => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`)
      if(response.data.success) {
        dispatch({type: DELETE_POST, payload: postId})
        setShowToast({show: true, message: 'Delete post success', type: 'success'})
        return response.data
      }
    } catch (error) {
      console.log(error)
      setShowToast({show: true, message: 'Can not delete the post', type: 'danger'})
      return error.response.data ? error.response.data : {success: false, message: 'server error'}
    }
  }

  
  //Context data
  const PostContextData = {
    postState,
    getPosts,
    deletePost,
    showAddPostModal,
    setShowAddPostModal,
    addPost, 
    showToast,
    setShowToast,
    showUpdateModal,
    setShowUpdateModal,
    findPostToUpdate,
    updatePost
  };


  //Return
  return (
    <PostContext.Provider value={PostContextData}>
      {children}
    </PostContext.Provider>
  );
};
