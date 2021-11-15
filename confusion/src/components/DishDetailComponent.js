import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
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

function RenderComments({ comments }) {
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}




export default DishDetail;