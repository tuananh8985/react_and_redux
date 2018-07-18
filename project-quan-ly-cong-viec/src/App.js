// this.setState là tạo các đối tượng,ko được dùng dấu bằng =;
/* Sơ đồ Component
    +)App
    ++)TaskForm ==> Component tương ứng với botton Thêm Công Việc
    ++)Control  ==>Tương ứng với tìm Kiếm và Sắp xếp
        ++)Search
        ++)Sort 
    ++)TaskList ==>Danh sách bảng hiển thị
        ++)TaskItem
*/
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
            isDisplayFrom : false //check xem có hiển thị Form Thêm công việc hay không
        };
    }
    // Được gọi khi trang refresh lại trang hay là được gọi khi Component được gắn vào.Chi dc goi duy nhat 1 lần
    componentWillMount(){
        // Kiểm tra thông tin lưu trong localStorage,sau đó gán vào state.
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
        // Thực hiện lưu data vào localStorage
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
    // Click vào nút "Thêm Công Việc" trên App Component
    onToggleForm = () => {
        this.setState({
            isDisplayFrom : !this.state.isDisplayFrom
        });
    }
    // Tương tác giữa component App và TaskForm. 
    onCloseForm = () => {
        this.setState({
            isDisplayFrom : false
        });
    }
    // Cập nhật trạng thái-->Update status
    onUpdateStatus = (id) =>{
        var { tasks } = this.state;
        // Hàm findIndex trả về index của bản ghi khi chọn update status.
        var index = this.findIndex(id);
        if(index !== -1){
            console.log('index',index);
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
            // Sau khi thiết lập state,cần lưu vào localStorage
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
    findIndex = (id) =>{
        var { tasks } = this.state;
        var result = -1;
        // Duyệt qua tất cả danh sách,nếu có id trùng id đc TaskItem gửi lên =>trả về index 
        tasks.forEach((task,index) =>{
            if(task.id === id){
                result =  index;
            }
        });
        return  result;
    }
    // Thực hiện submit form trên component TaskForm
    onSubmit = (data) => {
        var {tasks} = this.state;
        data.id = this.generateID();
        tasks.push(data);
        this.setState({
            tasks : tasks
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  render() {

    var {tasks , isDisplayFrom } = this.state; // var tasks = this.state.tasks;
    var elmTaskForm = isDisplayFrom
                    ? <TaskForm onSubmit = {this.onSubmit} onCloseForm = {this.onCloseForm} />
                    : '';
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
                        <TaskList 
                            tasks = {tasks} 
                            onUpdateStatus = {this.onUpdateStatus}
                        />
                </div>
            </div>
        </div>
    );
  }
}

export default App;
