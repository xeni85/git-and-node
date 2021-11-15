import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
function RenderCard({item}) {
    return(
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
            </CardBody>
            <CardText>
                {item.description}
            </CardText>
        </Card>
    )
}

function Home(props) {
    console.log('Here I am');
    return(      
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m1">
                    <RenderCard item={props.dish} />
                </div>
                <div className="col-12 col-md m1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    )
}

export default Home;