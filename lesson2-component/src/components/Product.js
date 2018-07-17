import React, { Component } from 'react';

class Product extends Component{
    render(){
        return (
           <div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="thumbnail">
                        <img data-src="#" alt="" />
                        <div className="caption">
                            <h3>Iphone 6 Plus</h3>
                            <p>
                                12.000.000 VND
                            </p>
                        </div>
                    </div>
                    <button type="button" className="btn btn-success">Mua Hang</button>
                </div>
           </div>
                       
          );
    }
}

export default Product;