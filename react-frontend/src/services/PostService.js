import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:3000/api/v1/posts";

class PostService {

    getPosts(){
        return axios.get(POST_API_BASE_URL);
    }

    createPost(post){
        return axios.post(POST_API_BASE_URL, post)
    }

    getPostById(postId){
        return axios.get(POST_API_BASE_URL + '/' + postId);
    }

    updatePost(post, postId){
        return axios.patch(POST_API_BASE_URL + '/' + postId, post);
    }

    deletePost(postId){
        return axios.delete(POST_API_BASE_URL + '/' + postId);
    }
}

export default new PostService()