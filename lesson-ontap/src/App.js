// Đã làm hết bài 13
import React, { Component } from 'react';
import './App.css';
import ColorPicker from './components/ColorPicker';
import Reset from './components/Reset';
import Result from './components/Result';
import SizeSetting from './components/SizeSetting';
class App extends Component {
//  Thiết lập giá trị màu mặc định cho App
    constructor(props){
        super(props);
        this.state = {
            color : 'red',
            fontSize: 15
        }
        this.onSetColor = this.onSetColor.bind(this);
    }
    // Nhận đc màu từ ColorPicker truyền lên =>Set ngược lại color cho ColorPicker.
    // Hàm này cần khai báo dưới dạng arrow function =>ko sẽ bị lỗi  this.setState is not a function
    //Cách 1:Khai báo arrow fucntion
    // onSetColor = (params) =>{
    //     this.setState({
    //         color : params
    //     });
    // }
    //Cách 2:bind biến this trên hàm constructor(Hiện tại sử dụng cách này)
    onSetColor(params){
        this.setState({
            color : params
        });
    }
  render() {
    return (
        <div className="container mt-50">
            <div className="row">
                {/* Component ColorPicker */}
                {/* Truyền màu mặc định từ App vào ColorPicker */}
                <ColorPicker color = { this.state.color } onReceiveColor = {this.onSetColor}/>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <SizeSetting/>
                    {/* Component Reset */}
                    <Reset/>
                </div>
                {/* Component Result */}
                <Result color = { this.state.color } />
            </div>
     </div>
      
    );
  }
}

export default App;
