let txtView = "";
let txtSubView = "0"
let arrStack = [];
let isOverayCalc = false;

function btnNum(arg) {
  isOverayCalc = false;
  txtView = txtView + arg;
  document.getElementById('pView').innerHTML = txtView;
}

function btnDel() {

  if (txtView.length === 0) {
    document.getElementById('pView').innerHTML = '0';
  } else {
    txtView = txtView.slice(0, -1);
    document.getElementById('pView').innerHTML = txtView.length === 0 ? '0' : txtView;
  }
}
 
function btnClear() {
  isOverayCalc = false;
  txtView = "";
  arrStack = [];
  document.getElementById('pView').innerHTML = '0';
  document.getElementById('pSub').innerHTML = '0';
}

function btnCalc(arg) { 
  if(isOverayCalc){return}

  arrStack.push(txtView);
  arrStack.push(arg);

  let subViewTxt = "";
  arrStack.forEach(arg => {
    subViewTxt = subViewTxt + arg;
  });

  isOverayCalc = true;
  txtView = "";
  document.getElementById('pView').innerHTML = '0';
  document.getElementById('pSub').innerHTML = subViewTxt;
}

async function btnResult() {
  console.log("btnResult : 시작")

  let subViewTxt = "", result = 0, calcFlag = "";
  arrStack.push(txtView);

  new Promise(async (resolve, reject) => {
    let ctr = 0;

    for (let i = 0; i < arrStack.length; i++) {
      let arg = arrStack[i];
      subViewTxt = subViewTxt + arg;
      ++ctr;

      // 서버 통신
      if (arg === '+' || arg === '-' || arg === '/' || arg === '*') {
        calcFlag = arg; // + 

      } else {
        if (calcFlag === '+') {
          result = await axios.post('/plus', { num1: result, num2: arg });
          result = result.data;
        } else if (calcFlag === '-') {
          result = await axios.post('/minus', { num1: result, num2: arg });
          result = result.data;
        } else if (calcFlag === '*') {
          result = await axios.post('/multi', { num1: result, num2: arg });
          result = result.data;
        } else if (calcFlag === '/') {
          result = await axios.post('/dvs', { num1: result, num2: arg });
          result = result.data;
        } else {
          result = arg; // 11
        }
      }
    }

    console.log("btnResult result " + ctr + " : " + JSON.stringify(result))
    resolve()

  }).then(() => {
    console.log("btnResult : 종료")

    isOverayCalc = false;
    txtView = "";
    arrStack = [];
    document.getElementById('pView').innerHTML = result;
    document.getElementById('pSub').innerHTML = subViewTxt + '=';
  })

}