/*
    Lưu ý về redux:
    Redux có 4 thành phần chính:Store,Views,Actions,Reducers.
    + Store:Nơi quản lý state,có thể truy cập để lấy state ra,update state hiện có,và listener để nhận biết xem có thay đổi gì không,và cập nhật qua views.
    + Actions:Nó là 1 pure object định nghĩa 2 thuộc tính lần lượt là type(kiểu của action) và payload (giá trị tham số mà action creator truyền lên).
    + Reducers : Khác với action có chức năng là mô tả những thứ đã xảy ra,nó ko chỉ rõ state nào của response thay đổi,mà việc này là do reducers đảm nhiểm,
    nó là nơi xác định state sẽ thay đổi như thế nào 
    Reducers sẽ nhận vào 2tham số,(1là state cũ,2là action)=>Nó sẽ trảvề state mới,kolàm thayđổi statecũ,vì state là dạng immutable nên ko thay đổi trực tiếp.
    + View
    Trong mỗi component,chúng ta thực hiện hàm connect() để lấy đc state từ store chung,hoặc có thể truyền các actions vào để update state thông qua reducers
    --Hàm mapStateToProps : Có thể map state thành props
    --Hàm connect sẽ nhận vào 2 tham số:
        Tham số đầu để lấy state từ store ra và sử dụng
        Tham số thứ 2 là list các action


*/
import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

    // toggle redux
    onToggleForm = () => {
        var { itemEditing } = this.props;
        if(itemEditing && itemEditing.id !== ''){
            this.props.onOpenForm();
        }else{
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id : '',
            name : '',
            status : false
        });
    }

    render() {

        var { isDisplayForm } = this.props;

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        <TaskForm />
                    </div>
                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>
                        <TaskControl />
                        <TaskList />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        },
        onClearTask : (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
