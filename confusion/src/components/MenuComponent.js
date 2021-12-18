import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseURL';

function RenderMenuItem({ dish, onClick }) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    )
}
const Menu = (props) => {
    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if (props.dishes.isLoading) {
            return(
                <dis className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </dis>
            );
        }
        else if (props.dishes.errMess) {
            return(
                <dis className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </dis>
            );
        }
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <h3>Menu</h3>
                    <hr />
                    {menu}
                </div>
            </div>
        );
}






export default Menu;