let txtView = "";

function btnNum(arg) {
  txtView = txtView + arg;
  document.getElementById('pView').innerHTML = txtView;
}

function btnDel() {
  txtView = txtView.slice(0,-1); 
  if(txtView.length === 0){
    document.getElementById('pView').innerHTML = '0';
  }else{
    document.getElementById('pView').innerHTML = txtView;
  }
}

function btnClear() {
  document.getElementById('pView').innerHTML = '0';
}

function btnCalc(arg) {
	
}