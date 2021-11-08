import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';






function RenderDish({ dish }) {
    return (
        <div>
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>

    );
}

function RenderComment({ dish }) {
    const comment = [];
    dish.comment.forEach(function (item, i) {
        comment.push(<p>{item} <br></br> -- {dish.commentator[i]} </p>, <br></br>);
    });
    console.log('this is comment')
    console.log(comment)
    return comment;
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment dish={props.dish} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}




export default DishDetail;