import React, { Component } from 'react'
import PostService from '../services/PostService';

class UpdatePostComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            title: '',
            content: '',
            images: '',
            publish: ''
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);       
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.changePublishHandler = this.changePublishHandler.bind(this);
        this.updatePost = this.updatePost.bind(this);
    }

    componentDidMount(){
        PostService.getPostById(this.state.id).then( (res) =>{
            console.log( res.data.data);
            let post = res.data.data;
            this.setState({title: post.title,
                content: post.content,
                images: 'http://localhost:3000/'+ post.images,
                publish : post.publish
            });
        });
    }

    updatePost = (e) => {
        e.preventDefault();
        const post = new FormData() 
        if(this.state.images !=""){
         post.append('images', this.state.images)
        }
        post.append('title', this.state.title)
        post.append('content', this.state.content)
        post.append('publish', this.state.publish)
        // let post = {title: this.state.title, content: this.state.content, publish: this.state.publish};
        console.log('post => ' + JSON.stringify(post));
        console.log('id => ' + JSON.stringify(this.state.id));
        PostService.updatePost(post, this.state.id).then( res => {
            this.props.history.push('/posts');
        });
    }
    
    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeContentHandler= (event) => {
        this.setState({content: event.target.value});
    }

    changePublishHandler= (event) => {
        this.setState({publish: event.target.value});
    }
    
    changeImageHandler(event) {
        this.setState({
            images: event.target.files[0]
          })
          console.log(this.state)
    }

    cancel(){
        this.props.history.push('/posts');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Post</h3>
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
                                            <label> Publish Id: </label>
                                            <input placeholder="Publish" name="publish" className="form-control" 
                                                value={this.state.publish} onChange={this.changePublishHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cover Image </label>
                                            <img src={this.state.images} alt='image' className='img-fluid' />
                                        <input type="file" className="form-control" name="images" onChange={this.changeImageHandler} />
                                        </div>
                                        <button className="btn btn-success" onClick={this.updatePost}>Save</button>
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

export default UpdatePostComponent
