import React, { Component } from 'react'
import PostService from '../services/PostService'

class ViewPostComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            post: {}
        }
    }

    componentDidMount(){
        PostService.getPostById(this.state.id).then( res => {
            res.data.data.images="http://localhost:3000/"+res.data.data.images;
            res.data.data.createdAt=res.data.data.createdAt.split('T')[0];
            this.setState({post: res.data.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-12">
                    <h3 className = "text-center text-capitalize">{ this.state.post.title }</h3>
                    <div className = "card-body">
                    <div className = "row ">
                             <div> <img src={ this.state.post.images } alt='Photo' className='img-fluid'></img></div>
                        </div>
                        <div className = "row text-capitalize">
                            <label> </label>
                            <div> { this.state.post.content }</div>
                        </div>
                        <div className = "row text-capitalize">
                            <label> </label>
                            <div><p  className="text-right"> <b>Published On: </b>{ this.state.post.createdAt }</p></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewPostComponent
