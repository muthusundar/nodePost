import React, { Component } from 'react'
import PostService from '../services/PostService';

class CreatePostComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            title: '',
            content: '',
            images:'',
            img:'',
            publish: ''
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.changeImgHandler = this.changeImgHandler.bind(this);
        this.changePublishHandler = this.changePublishHandler.bind(this);
        this.saveOrUpdatePost = this.saveOrUpdatePost.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            PostService.getPostById(this.state.id).then( (res) =>{
                let post = res.data.data;
                this.setState({title: post.title,
                    content: post.content,
                    images: post.images,
                    publish : post.publish
                });
            });
        }        
    }
    saveOrUpdatePost = (e) => {
        e.preventDefault();
        let post = new FormData()       
        post.append('title', this.state.title)
        post.append('content', this.state.content)
        post.append('images', this.state.images)
        post.append('publish', this.state.publish)
        console.log('post => ' + JSON.stringify(post));
        //  post = {title: this.state.title, content: this.state.content, images: this.state.images, publish: this.state.publish};
        console.log('post => ' + JSON.stringify(post));

        // step 5
        if(this.state.id === '_add'){
            PostService.createPost(post).then(res =>{
                this.props.history.push('/posts');
            });
        }else{
            PostService.updatePost(post, this.state.id).then( res => {
                this.props.history.push('/posts');
            });
        }
    }
    
    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeContentHandler= (event) => {
        this.setState({content: event.target.value});
        console.log("gsdfsgd  ",this.state.content);
    }
    changeImgHandler= (event) => {
        this.setState({img: event.target.files[0]});
        console.log("gsdfsgd  ",this.state.img);
    }
    changeImageHandler= (event) => {
        this.setState({images: event.target.files[0]});
        console.log("gsdfsgd  ",this.state.images);
    }

    changePublishHandler= (event) => {
        this.setState({publish: event.target.value});
    }

    cancel(){
        this.props.history.push('/posts');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Post</h3>
        }else{
            return <h3 className="text-center">Update Post</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Title: </label>
                                            <input placeholder="Title" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Content: </label>
                                            <input placeholder="Content" name="content" className="form-control" 
                                                value={this.state.content} onChange={this.changeContentHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cover Image: </label>
                                            <input type="file" className="form-control" name="images" onChange={this.changeImageHandler} />
                                            <input type="file" className="form-control" name="images" onChange={this.changeImgHandler} />
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Publish Id: </label>
                                            <input placeholder="Publish Address" name="publish" className="form-control" 
                                                value={this.state.publish} onChange={this.changePublishHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdatePost}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreatePostComponent
