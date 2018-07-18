import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [

            ],
            isDisplayFrom : false
        }
    }
    // Được gọi khi trang refresh lại trang hay là được gọi khi Component được gắn vào.Chi dc goi duy nhat 1 lần
    componentWillMount(){
        // Kiểm tra localStorage trc khi lưu.
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks :tasks
            });
        }
    }
    onGenerateData = () =>{
        var tasks = [
            {
                id :this.generateID(),
                name : 'Hoc Lap Trinh',
                status : true
            },
            {
                id :this.generateID(),
                name : 'Di Boi',
                status : false
            },
            {
                id :this.generateID(),
                name : 'Di Ngu',
                status : true
            }
        ];
        this.setState({
            tasks :tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
        console.log('tasks',tasks);

    }
    s4(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID(){
        return this.s4() + this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()
        + this.s4()+this.s4()+this.s4();
    }
    onToggleForm = () =>{
        this.setState({
            isDisplayFrom = !this.state.isDisplayFrom
        });
    }

    onCloseForm = () => {
        this.setState({
            isDisplayFrom = false
        });
    }
  render() {

    var {tasks , isDisplayFrom?} = this.state; // var tasks = this.state.tasks;
    var elmTaskForm = isDisplayFrom?<TaskForm onCloseForm = {this.onCloseForm}/>:'';
    return (
        <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayFrom ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
            {/*<TaskForm/>*/}   
            { elmTaskForm } 
            </div>
            <div className= {isDisplayFrom ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick = {this.onToggleForm}
                >
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>

                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick = {this.onGenerateData}
                >
                    Generate Data
                </button>
                    {/* Search And Sort*/}
                    <Control/>
                    <TaskList tasks = {tasks}/>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
