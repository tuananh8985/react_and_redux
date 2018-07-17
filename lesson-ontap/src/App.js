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
        // 1.Ko nên sử dụng cách khai báo này mà cần khai báo sử dụng arrow function .
        // 2.Khi xử lý sự kiện chỉ cần gọi onReceiveColor = {this.onSetColor} chứ ko cần gọi onReceiveColor = {() => this.onSetColor}
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
    // 1.Tương tác với Component ColorPicker
    onSetColor(params){
        this.setState({
            color : params
        });
    }
    // 2.Tương tác với Component SizeSetting
    onChangeSize = (value) =>{
        // 8 <= fontSize <= 36
        // Cach 1:Ko dung toan tu ba ngoi
        // if(this.state.fontSize + value >= 8 && this.state.fontSize + value <= 36){
        //     this.setState({
        //         fontSize : this.state.fontSize + value;
        //     });
        // }
        // Cach 2:Dung toan tu ba ngoi
        this.setState({
            fontSize : (this.state.fontSize + value >= 8 && this.state.fontSize + value <= 36)?this.state.fontSize + value :this.state.fontSize;
        });

    }
    // 3.Tương tác với Component Reset
    onSettingDefault = (value) =>{
        if(value){
            this.setState({
                color: 'red',
                fontSize : 12
            });
        }

    }
    render() {
        return (
            <div className="container mt-50">
                <div className="row">
                    {/* Component ColorPicker */}
                    {/* Truyền màu mặc định từ App vào ColorPicker */}
                    <ColorPicker color = { this.state.color } onReceiveColor = {this.onSetColor}/>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <SizeSetting 
                            fontSize = {this.state.fontSize} 
                            onChangeSize = {this.onChangeSize}/>
                        {/* Component Reset */}
                        <Reset onSettingDefault = {this.onSettingDefault}/>
                    </div>
                    {/* Component Result */}
                    <Result color = { this.state.color } fontSize = {this.state.fontSize} />
                </div>
            </div>
          
        );
    }
}

export default App;
