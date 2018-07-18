

import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            staus : false
        }
    }
    // Thực hiện đóng Form Thêm công việc
    onCloseForm  = () =>{
        this.props.onCloseForm();
    }
    // Khi thay đổi input,lấy data thay đổi và lưu vào state
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value =  target.value ==='true' ? true:false;
        }
        this.setState({
            [name] : value
        });
    }
    // Clear form về giá trị ban đầu
    onClear = () =>{
        this.setState({
            name : '',
            status : false
        });
    }

    // Khi thực hiện submit form =>sẽ gửi data sang component App để lưu data vào localStorage.
    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        // Thực hiện clear và close form.
        this.onClear();
        this.onCloseForm();
    }
  render() {
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">Form Thêm Công Việc</h3>
                <span 
                    className = "fa fa-times-circle text-right"
                    onClick = {this.onCloseForm}
                ></span>
            </div>
            <div className="panel-body">
                <form  onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name = "name"
                            value = {this.state.name}
                            onChange = {this.onChange}
                        />
                    </div>
                    <label>Trạng Thái :</label>
                    <select 
                        className="form-control"
                        name = "status"
                        value = {this.state.status}
                        onChange = {this.onChange}
                    >
                        <option value = {true}>Kích Hoạt</option>
                        <option value= {false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick = {this.onClear}
                        >Hủy Bỏ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
}

export default TaskForm;
