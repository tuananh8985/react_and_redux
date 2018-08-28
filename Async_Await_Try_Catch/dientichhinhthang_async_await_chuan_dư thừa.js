// Sử dụng try-catch trong từng function =>Ko cần thiết
async function Tong(a,b){
    try {
        if(typeof b === "string" || typeof a === "string" || Number.isNaN(a) === 'undefined'){
            throw 'Ko phải định dạng số-Tính tổng';
        }
        return a + b;
      }
      catch (error) {
        //   Ném ra các lỗi sai syntax hoặc lỗi kết nối server...
        throw error;
      }
}

async function Tich(a,b){
    
    try {
        if(typeof b === "string" || typeof a === "string" || Number.isNaN(a) === 'undefined'){
            throw 'Ko phải định dạng số_Tính Tích';
        }
        return a * b;
      }
      catch (error) {
        throw error;
      }
}
async function Thuong(a,b){
    try {
        if(typeof b === "string" || typeof a === "string" || Number.isNaN(a) === 'undefined'){
            throw 'Ko phải định dạng số_Tính Thương';
        }
        if(b === 0){
            throw 'Số chia phải khác 0';
        }
        return a / b;
      }
      catch (error) {
        throw error;
      }
}
async function dientich(a,b,h,two){
    try {
        let tong = await Tong(a,b);
        let tich = await Tich(tong,h);
        let dientich = await Thuong(tich,two);
        return dientich;
    } catch (error) {
        throw error;
    }
}
async function run(){
    try {
        var res = await dientich(1,2,3,2);
        console.log('res',res);
    } catch (error) {
        console.log('run_error',error)
    }
};
run();
