let txtView = "";
let txtSubView = "0"
let arrStack = [];

function btnNum(arg) {
  txtView = txtView + arg;
  document.getElementById('pView').innerHTML = txtView;
}

function btnDel() {
 
  if(txtView.length === 0){
    document.getElementById('pView').innerHTML = '0';
  }else{
    txtView = txtView.slice(0,-1); 
    document.getElementById('pView').innerHTML = txtView.length === 0 ? '0' : txtView;
  }
}

function btnClear() {
  document.getElementById('pView').innerHTML = '0';
}

function btnCalc(arg) {
  arrStack.push(txtView);
  arrStack.push(arg);

  let subViewTxt = "";
  arrStack.forEach(arg => {
    subViewTxt = subViewTxt + arg;
  });

  txtView = "";
  document.getElementById('pView').innerHTML = '0';
  document.getElementById('pSub').innerHTML = subViewTxt;
}