// Tim hieu ve form
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        txtUsername : '',
        txtPassword : '',
        txtDesc : '',
        sltGender : 0,
        rdLang: 'vi',
        chkbStatus : true
    };
  }
  onHandleChange = (event) =>{
        // this.setState({
        //     username  : event.target.value;
        // });
        var target = event.target;
        var name = target.name;
        // Kiểm tra check riêng của checkbox
        var value = target.type === 'checkbox'? target.checked:target.value;
        this.setState({
            [name]  : value
        });
  }
  // Xu ly submit
  onHandleSubmit = (event) =>{
    event.preventDefault();//chan submit
    console.log(this.state);
  }
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Form</h3>
                        </div>
                        <div className="panel-body">
                            {/*Làm việc với form*/}
                            <form onSubmit = {this.onHandleSubmit}>   
                                 {/*1.Input*/}
                                <div className="form-group">
                                    <label>UserName</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        onChange = {this.onHandleChange}
                                        value= {this.state.txtUsername}
                                        name = "txtUsername"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        onChange = {this.onHandleChange}
                                        value= {this.state.txtPassword}
                                        name = "txtPassword"
                                    />
                                </div>
                                {/*2.TextArea*/}
                                <textarea 
                                    className="form-control" 
                                    name="txtDesc" 
                                    onChange = {this.onHandleChange}
                                    value= {this.state.txtDesc}
                                    rows="3">
                                </textarea>
                                {/*
                                3.Select
                                Khi su dung form value và sự kiện onchange phải đi cùng nhau
                                Select ko cần set selected,chỉ cần gán value
                                */}
                                <label>Gioi Tinh</label>
                                <select 
                                    className="form-control" 
                                    name = "sltGender" 
                                    onChange = {this.onHandleChange}
                                    value= {this.state.sltGender}>
                                    <option value={0}>Nu</option> 
                                    <option value={1}>Nam</option>
                                </select>
                                {/*4.Radio*/}
                                 <label>Ngon ngu</label>
                                <div className="radio">
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="rdLang"
                                            value = "en"
                                            onChange = {this.onHandleChange}
                                            checked = {this.state.rdLang === "en"}
                                        />
                                            Tieng Anh
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="rdLang"
                                            value = "vi"
                                            onChange = {this.onHandleChange}
                                            checked = {this.state.rdLang === "vi"}
                                        />
                                            Tieng Viet
                                    </label>
                                </div>
                                {/*5.Checkbox =>th đặc biệt*/}
                                <div className="checkbox">
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            value="{true}" 
                                            name ="chkbStatus"
                                            onChange = {this.onHandleChange}
                                            checked = {this.state.chkbStatus === true}
                                        />
                                            Trang Thai
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-primary">Lưu lại</button>
                                <button type="reset" className="btn btn-primary">Xóa trắng</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

export default App;
