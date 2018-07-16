// Phần quản lý về các màu lựa chọn
import React, { Component } from 'react';

class ColorPicker extends Component {
    constructor(props){
        super(props);
        // Khoi tạo đối tượng state
        this.state = {
            colors : ['red','green','blue','#ccc']
        };
    }
    // 1.Tương tác ngược lại với Component App.
    setActiveColor(color){
        // Kiểm tra xem khi click vào có trả ra màu tương ứng không
        //console.log(1,color);
        this.props.onReceiveColor(color);
    }
    // Thiết lập CSS cho component ColorPicker.
    showColor(color){
        //kiểm tra xem biến color bên App truyền vào cho ColorPicker là gì.Có thể kiểm tra ở bất kỳ đâu
        //console.log(this.props.color); 
        return {
            // Thuộc tính css trong React đc convert theo qui tắc
            // css(background-color) =>React(backgroundColor)
            backgroundColor : color
        }
    }
    render() {
        var elmColors = this.state.colors.map((color,index)=>{
            return <span 
                        key = {index} 
                        style = {this.showColor(color)}
                        className = {this.props.color === color ? 'active' : ''}
                        onClick = { () => this.setActiveColor(color)}
                    ></span>
        });

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Color Picker</h3>
                    </div>
                    <div className="panel-body">
                       { elmColors }
                        <hr/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ColorPicker;
