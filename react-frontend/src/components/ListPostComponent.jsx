import React, { Component } from 'react'
import PostService from '../services/PostService'
import env from "react-dotenv";
class ListPostComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                posts: []
        }
        this.addPost = this.addPost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost(id){
        PostService.deletePost(id).then( res => {
            this.setState({posts: this.state.posts.filter(post => post._id !== id)});
        });
    }
    viewPost(id){
        this.props.history.push(`/view-post/${id}`);
    }
    editPost(id){
        this.props.history.push(`/add-post/${id}`);
    }
//update-post
    componentDidMount(){
        PostService.getPosts().then((res) => {
           this.setState({ posts: res.data.data});
        });
    }

    addPost(){
        this.props.history.push('/add-post/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Posts List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addPost}> Add Post</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered table-responsive">

                            <thead>
                                <tr className="table-primary"> 
                                    <th> Image</th>
                                    <th> Title</th>
                                    <th> Content</th>
                                    <th> Publish</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.posts.map(
                                        post => 
                                        <tr key = {post._id}>
                                            <td><img src={ env.API_SERVER+post.images } alt='Photo' className='img-thumbnail'></img></td>
                                             <td className='text-capitalize'> { post.title} </td>   
                                             <td className='text-capitalize'> {post.content}</td>
                                             <td className='text-capitalize'> {(post.publish==true?'Yes':'no')}</td>
                                             <td>
                                                 <button onClick={ () => this.editPost(post._id)} className="btn btn-info button-small">Edit </button>
                                                 <button onClick={ () => this.deletePost(post._id)} className="btn btn-danger  button-small">Delete </button>
                                                 <button onClick={ () => this.viewPost(post._id)} className="btn btn-info  button-small">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListPostComponent
