import React, { Component } from 'react'
import PostService from '../services/PostService';
import env from "react-dotenv";


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
            publish: false,
            error:'',
            errors: {},
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
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
                    image: env.API_SERVER+post.images,
                    publish : post.publish
                });
            });
        }        
    }
    saveOrUpdatePost = (e) => {
        e.preventDefault();
        if(!this.validationHandler()){
            return;
        }else{
            let post = new FormData()       
            post.append('title', this.state.title)
            post.append('content', this.state.content)      
            post.append('images', this.state.images)
            post.append('publish', this.state.publish)

            // step 5
            if(this.state.id === '_add'){
                PostService.createPost(post).then(res =>{                    
                    this.props.history.push('/posts');
                }).catch((err)=>{
                    this.setState({ error: `Title should be more than 10 and less than 40. \n 
                    Content should be more than 10 and less than 40.
                    Image should be more jpg,png. 
                    Publish should be boolean.` })
                });
            }else{
                PostService.updatePost(post, this.state.id).then( res => {
                    this.props.history.push('/posts');
                });
            }
        }
        
    }
    validationHandler(){
        let isFormValid=true;
        let errors={};
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        
        if(this.state.title.length < 5 || this.state.title > 40 ){
            isFormValid=false;
            errors['title'] = 'Title is greater than equal to 5 and less than 40.';
        }

        if(!this.state.title){
            isFormValid=false;
            errors['title'] = 'Title is not empty.';
         }

        
         if(this.state.content.length < 10 || this.state.content > 400 ){
            isFormValid=false;
            errors['content'] = 'Title is greater than equal to 10 and less than 400.';
        }
        if(!this.state.content){
            isFormValid=false;
            errors['content'] = 'Content is not empty.';
        }
        
        if(this.state.id && this.state.images && this.state.images.name && !this.state.images.name.match(allowedExtensions)){
            isFormValid=false;
            errors['images'] = 'Selected file should be image.';
         }         
         if(this.state.id && !this.state.images){
            isFormValid=false;
            errors['images'] = 'Images is not empty.';
         }
        this.setState({ errors: errors })
        return isFormValid;
           
    }
    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeContentHandler= (event) => {
        this.setState({content: event.target.value});
    }
    changeImageHandler= (event) => {

        this.setState({images: event.target.files[0]});
        this.setState({image:URL.createObjectURL(event.target.files[0])});
    }

    changePublishHandler= (event) => {
        this.setState({publish: event.target.checked});
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
    getImage(){
        if (this.state.images !== '')
            return <img src={this.state.image} alt='Photo' className='img-fluid' />            
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
                                <span style={{ color: "red" }}>{this.state.error}</span>
                                    <form>
                                        <div className = "form-group">
                                            <label> Title: </label>
                                            <input placeholder="Title" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                                <span style={{ color: "red" }}>{this.state.errors['title']}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Content: </label>
                                            <textArea placeholder="Content" name="content" className="form-control"  onChange={this.changeContentHandler}
                                                >{this.state.content} </textArea>
                                                <span style={{ color: "red" }}>{this.state.errors['content']}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cover Image: </label>
                                            { 
                                                this.getImage()
                                             }
                                            <input type="file" className="form-control" name="images" onChange={this.changeImageHandler} />  
                                            <span style={{ color: "red" }}>{this.state.errors['images']}</span>                                          
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Publish: <input type="checkbox" name="publish" value={this.state.publish}  onClick={this.changePublishHandler}  checked={this.state.publish}></input></label>                                           
                                            
                                                <span style={{ color: "red" }}>{this.state.errors['publish']}</span>
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
