import React from 'react';
import { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Col, Row  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseURL';

const required = (val) =>val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {isModalOpen: false};
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    handleSubmit(values) {
        this.toggleModal();    
        this.props.postComment(this.props.dishID, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <div>
                <Button color="secondary" outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label md={12} htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="author">Your name</Label>
                                <Col>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your name" className="form-control" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                                    <Errors className="text-danger" model=".author" show="touched" messages={{required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be smaller than 15 characters'}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="comment">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
function RenderDish({ dish }) {
    return (
        <div>
            <Card>
                <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>

    );
}

function RenderComments({ comments, postComment, dishId }) {
        const cmnts = comments.map((commnts) => {
            return (
                <ul key={commnts.id} className="list-unstyled">
                    <li>
                        <p> {commnts.comment} </p>
                        <p> -- {commnts.author},
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(Date.parse(commnts.date)))}
                        </p>
                    </li>
                </ul>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                {cmnts}
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );     
}
// const comment = [];
// comments.forEach(function (item, i) {
//     comment.push(<p>{item.id} <br></br> -- {item.comment} </p>, <br></br>);
// });
// console.log('this is comment')
// console.log(comment)
// return comment;


const DishDetail = (props) => {
    if (props.isLoading ) {
        return(
            <dis className="container">
                <div className="row">
                    <Loading />
                </div>
            </dis>
        );
    }
    else if (props.errMess) {
        return(
            <dis className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </dis>
        );
    }
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="row">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}




export default DishDetail;