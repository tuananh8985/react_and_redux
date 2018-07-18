import React, { Component } from 'react';


class TaskItem extends Component {
    onUpdateStatus = () => {
        //console.log(this.props.task.id);
        // lấy ra id tương ứng với mỗi row dữ liệu.truyền ngược từ component TaskItem =>TaskList =>App
        this.props.onUpdateStatus(this.props.task.id)
    }
    OnDelete = () =>{
        this.props.OnDelete(this.props.task.id)
    }

    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id)
    }
    render() {
        var {task,index} = this.props;
        return (
            <tr>
                <td>{index +1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span 
                        className={task.status === true?'label label-danger':'label label-success'}
                        onClick = {this.onUpdateStatus}
                    >
                                {task.status === true?'Kich Hoat':'An'}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick = {this.onUpdate}
                    >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick = {this.OnDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
  }
}

export default TaskItem;
