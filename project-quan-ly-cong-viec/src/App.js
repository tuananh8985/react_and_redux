// this.setState là tạo các đối tượng,ko được dùng dấu bằng =;
/* Sơ đồ Component
    +)App
    ++)TaskForm ==> Component tương ứng với botton Thêm Công Việc
    ++)TaskList ==>Danh sách bảng hiển thị
        ++)TaskItem
    ++)TaskControl  ==>Tương ứng với tìm Kiếm và Sắp xếp
        ++)Search
        ++)Sort 
*/
import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayFrom : false, //check xem có hiển thị Form Thêm công việc hay không
            taskEditing : null,
            // Tạo thêm object filter để setting cho chức năng search.
            filter : {
                name : '',
                status : -1
            },
            keyword : '', //Dùng để lưu các key của thanh tìm kiếm,
            sortBy : 'name',
            sortValue : 1
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
    // I.CÁC HÀM HELPER
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
    }
    s4(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID(){
        return this.s4() + this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()
        + this.s4()+this.s4()+this.s4();
    }
    // Kiểm tra trả về index vơi id tương ứng
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
    // II_CÁC HÀM CHỨC NĂNG TƯƠNG TÁC VỚI COMPONENT
    /*----TaskList----*/
    // TaskList:Chức năng filter theo tên và trạng thái
    onFilter = (filterName,filterStatus) =>{
        filterStatus = parseInt(filterStatus,10);//Ép kiểu string sang kiểu Int
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    /*----TaskForm----*/
    // TaskForm:Đóng TaskForm
    onCloseForm = () => {
        this.setState({
            isDisplayFrom : false
        });
    }

    // TaskForm:Hiện TaskForm
    onShowForm = () =>{
        this.setState({
            isDisplayFrom : true
        });
    }

    // TaskForm:Kiểm tra và hiển thị TaskForm_Edit hay TaskForm_Add
    onToggleForm = () => {
        if(this.state.isDisplayFrom && this.state.taskEditing !== null){ 
            this.setState({
                isDisplayFrom : true,
                taskEditing : null // Thiết lập để ko hiển thị form edit
            }); 
        }else{
            // Đầu tiên khi click sẽ ẩn hay hiện form TaskForm
            this.setState({
                isDisplayFrom : !this.state.isDisplayFrom,
                taskEditing : null // Thiết lập để ko hiển thị form edit
            });    
        }
        
    }

    // TaskForm:Chức năng submit khi thực hiện "Thêm" TaskForm
    onSubmit = (data) => {
        var {tasks} = this.state;
            // Nếu tạo mới data
        if(data.id === '' || data.id === undefined){
            data.id = this.generateID();
            tasks.push(data);
        }else{
            // Nếu edit data
            var index = this.findIndex(data.id);
            tasks[index]  = data;
        }
        this.setState({
            tasks : tasks,
            taskEditing : null //gán lại taskEditing là null
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    /*----TaskItem----*/
    // TaskItem:Chưc năng "Sửa" trên TaskItem =>truyền id từ  TaskItem =>TaskList => App.
    onUpdate = (id) =>{
        var { tasks } = this.state;
        var index = this.findIndex(id);
        // this.setState({
        //     taskEditing : tasks[index]
        // });
        // console.log(this.state.taskEditing); =>neu làm như trên click đầu tiên sẽ bị null
        // Cách khắc phục
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        });
        // Thực hiện hiện TaskForm_Sửa.
        this.onShowForm();
    }

    // TaskItem:Chưc năng "Xóa" trên TaskItem =>truyền id từ  TaskItem =>TaskList => App.
    OnDelete = (id) =>{
        var { tasks } = this.state;
        // Hàm findIndex trả về index của bản ghi khi chọn update status.
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index,1); //Hàm splice =>gõ bỏ 1 phần tử ở vị trí tương ứng.
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    // TaskItem:Chưc năng "Cập nhật" status trên TaskItem =>truyền id từ  TaskItem =>TaskList => App.
    onUpdateStatus = (id) =>{
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
    
    onSearch = (keyword) =>{
        this.setState({
            keyword : keyword
        });
    }

    onSort = (sortBy,sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        });
    }
  render() {
    //   Gọi biến
    var {tasks , isDisplayFrom ,taskEditing ,filter,keyword,sortBy,sortValue} = this.state; // var tasks = this.state.tasks;
    console.log(sortBy,'-',sortValue);
    if(filter){
        if(filter.name){
            
            // thực hiện tìm kiếm
            tasks = tasks.filter((task) =>{
                return task.name.toLowerCase().indexOf(filter.name) !== -1;
            });
        }
        tasks = tasks.filter((task) => {
            if(filter.status === -1){
                return task;
            }else{
                return task.status === (filter.status === 1 ? true : false);
            }
        });
    }
    //Kiểm tra biến keyword,và search trong danh sách xem có các giá trị nào
    if(keyword){
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword) !== -1;
        });
    }
    // Nếu có sắp xếp.
    if(sortBy === "name"){
        tasks.sort((a,b) =>{
            console.log('a.name',a.name,'b.name',b.name);
            if(a.name > b.name) return sortValue;
            else if(a.name < b.name) return -sortValue;
            else return 0;
        });
    }else{
        tasks.sort((a,b) =>{
            if(a.status > b.status) return -sortValue;
            else if(a.status < b.status) return sortValue;
            else return 0;
        });
    }
    // Kiểm tra nếu isDisplayFrom = true =>Sẽ hiện thị TaskForm,ngược lại thì không.
    var elmTaskForm = isDisplayFrom
                    ? <TaskForm 
                        onSubmit = {this.onSubmit} 
                        onCloseForm = {this.onCloseForm} 
                        task = {taskEditing}
                        />
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
                        <TaskControl 
                            onSearch ={this.onSearch}
                            onSort = {this.onSort}
                            sortBy = {sortBy}
                            sortValue = {sortValue}
                            />
                        <TaskList 
                            tasks = {tasks} 
                            onUpdateStatus = {this.onUpdateStatus}
                            OnDelete = {this.OnDelete}
                            onUpdate = {this.onUpdate}
                            onFilter = {this.onFilter}
                        />
                </div>
            </div>
        </div>
    );
  }
}

export default App;
