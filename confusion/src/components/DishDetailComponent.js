import React from 'react';
import { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Media } from 'react';
import { DISHES } from '../shared/dishes';




class DishDetail extends Component {

    renderDish(dish) {
        if (dish != null) {
            return (
                <div className="row p-0 ms-1 ms-md-0">
                    <div>
                        <Card>
                            <CardImg width="100%" object src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle heading>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>

                    </div>
                    {/* <div className="col-12 col-md-5 list-unstyled m-1 ps-md-4 pt-md-0" >
                        <div key={dish.id} className="col-12 mt-0">
                            <Media tag="li" width="100%">
                                <Media body className="ml-5">
                                    <Media heading><h4>Comments</h4><br></br></Media>
                                    {this.renderComment(dish)}
                                </Media>
                            </Media>
                        </div>
                    </div> */}
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderComment(dish) {
        const comment = [];
        if (dish != null) {
            dish.comment.forEach(function (item, i) {
                comment.push(<p>{item} <br></br> -- {dish.commentator[i]} </p>, <br></br>);

            });
            console.log('this is comment')
            console.log(comment)
            return comment;
        } else { return <div></div> }

    }

    render() {
        const renderDish = this.renderDish(this.props.dish);
        const renderComment = this.renderComment(this.props.dish);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {renderDish}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {renderComment}
                    </div>
                </div>
            </div>
        );
    }


}

export default DishDetail;