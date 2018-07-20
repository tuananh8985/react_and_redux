

import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            status : false
        }
    }
    // Chỉ đc gọi khi chưa hiển thị ra và component mới đc gắn vào.
    // Khi form dc gắn vào thì licycle này sẽ được gọi,chỉ đc gọi duy nhất 1 lần khi component đc gắn vào
    componentWillMount(){
        if(this.props.task){
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
        }
        console.log('componentWillMount');
    }
    /*  Chính thống : 
    Hàm này được chạy khi mà props của component đã được sinh ra có sự thay đổi.
    Phải gọi setState() nếu muốn render lại. 
    */
    // Khi form edit đã bật lên rồi ta vẫn nhận đc props
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            });
        }else if(!nextProps.task){
            // Trường hợp chuyển từ sửa thành thêm
            this.setState({
                id : '',
                name : '',
                status : false
            });    
        }
    }
    // Props : TaskForm => App :Truyền Props từ TaskForm sang App để đóng form
    onCloseForm  = () =>{
        this.props.onCloseForm();
    }
    // Lưu lại trạng thái vào biến state =>khi thay đổi input hay select
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
    // Reset form về giá trị ban đầu
    onClear = () =>{
        this.setState({
            name : '',
            status : false
        });
    }

    // Truyền biến props là onSubmit sang cho component App
    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        // Thực hiện clear và close form.
        this.onClear();
        this.onCloseForm();
    }



  render() {
    // Dựa vào id để kiểm tra lúc nào là màn thêm công việc hay cập nhật công việc
    var { id } = this.state;
    
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                { id === '' || id === undefined ?'Thêm Công Việc':'Cập nhật công việc'}
                <span 
                    className = "fa fa-times-circle text-right"
                    onClick = {this.onCloseForm}
                ></span>
                </h3>
                
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
