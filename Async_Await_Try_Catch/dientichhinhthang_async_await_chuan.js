/* 
 +)Sử dụng Async-Await tính diện tích hình thang
 +)Chỉ cần bắt try-catch function tổng
*/
async function Tong(a,b){
    if(typeof b === "string" || typeof a === "string" || Number.isNaN(a) === 'undefined'){
        throw 'Ko phải định dạng số-Tính tổng';
    }
    return a + b;
}

async function Tich(a,b){
    if(typeof b === "string" || typeof a === "string" || Number.isNaN(a) === 'undefined'){
        throw 'Ko phải định dạng số_Tính Tích';
    }
    return a * b;
}
async function Thuong(a,b){
    if(typeof b === "string" || typeof a === "string" || Number.isNaN(a) === 'undefined'){
        throw 'Ko phải định dạng số_Tính Thương';
    }
    if(b === 0){
        throw 'Số chia phải khác 0';
    }
    return a / b;
}
async function dientich(a,b,h,two){
    let tong = await Tong(a,b);
    let tich = await Tich(tong,h);
    let dientich = await Thuong(tich,two);
    return dientich;
}
async function run(){
    try {
        var res = await dientich(1,2,3,2);
        console.log('res',res);
    } catch (error) {
        //Nếu lỗi syntax hoặc kết nối db =>check thêm message
        if(error.message){
            console.log('run_error1',error.message)
        }else{
        // Nếu ném ngoại lệ throw trong function con =>check error
            console.log('run_error2',error)

        }
    }
};
run();
