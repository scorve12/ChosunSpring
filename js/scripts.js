/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

let generalIncomeTaxButton = document.getElementById("generalIncomeTaxButton");
let simplifiedTaxButton = document.getElementById("simplifiedTaxButton");
let calculatorBox = document.getElementById("calculatorBox");
let resultBox = document.getElementById("resultBox");

generalIncomeTaxButton.addEventListener("click", generalIncomeTaxContent);
simplifiedTaxButton.addEventListener("click", simplifiedTaxContent);

document.addEventListener("DOMContentLoaded", () => {
    generalIncomeTaxContent();
   
  });
  
  function generalIncomeTaxContent() {
    renderCalculatorForm();
    renderResultBox();
    attachEventListeners();
    applyRadioButtonsStyle();
  }
  
  function renderCalculatorForm() {
    calculatorBox.innerHTML = `
      <div class="container text-center">
          <div class="row row-cols-2">
              <div class="choiceSplit">
                  <div class="col choice">
                      <input type="radio" name="rating" value="1" />
                      <span>1,400만원 이하</span>
                  </div>
                  <div class="col choice">
                      <input type="radio" name="rating" value="2" />
                      <span>1,400만원 초과 ~ 5,000만원 이하</span>
                  </div>
                  <div class="col choice">
                      <input type="radio" name="rating" value="3" />
                      <span>5,000만원 초과 ~ 8,800만원 이하</span>
                  </div>
                  <div class="col choice">
                      <input type="radio" name="rating" value="4" />
                      <span>8,800만원 초과 ~ 1억5,000만원 이하</span>
                  </div>
              </div>
              <div class="choiceSplit2">
                  <div class="col choice">
                      <input type="radio" name="rating" value="5" />
                      <span>1억5,000만원 초과 ~ 3억원 이하</span>
                  </div>
                  <div class="col choice">
                      <input type="radio" name="rating" value="6" />
                      <span>3억원 초과 ~ 5억원 이하</span>
                  </div>
                  <div class="col choice">
                      <input type="radio" name="rating" value="7" />
                      <span>5억원 초과 ~ 10억원 이하</span>
                  </div>
                  <div class="col choice">
                      <input type="radio" name="rating" value="8" />
                      <span>10억원 초과</span>
                  </div>
              </div>
          </div>
          <hr class="hrLocation"/>
          <div class="location">
              <div class="row">
                  <div class="col-4">
                      <input type="text" class="form-control" placeholder="소득을 입력 해주세요" aria-label="소득입력란 입니다" />
                  </div>
                  <div class="col-1 font">x</div>
                  <div class="col-2">
                      <input type="text" class="form-control" placeholder="세율" aria-label="세율 표시란" readonly />
                  </div>
                  <div class="col-1 font" style="font-size: 19pt">-</div>
                  <div class="col-2">
                      <input type="text" class="form-control" placeholder="누진공제" aria-label="누진공제 표시란" readonly />
                  </div>
              </div>
          </div>
      </div>`;
  }
  
  function applyRadioButtonsStyle() {
    // 라디오 버튼에 pointer-events 스타일을 적용하는 CSS 클래스 추가
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `input[name="rating"] { pointer-events: none; }`;
    document.head.appendChild(styleSheet);
}

  function renderResultBox() {
    resultBox.innerHTML = `
      <div class="col-3 font"><i class="fa-solid fa-dollar-sign"></i>종합소득세</div>
      <div class="col-6 ">
        <input type="text" class="form-control form-control-lg result-right" aria-label="종합소득세 값" readonly  />
      </div>`;
  }
  
  function attachEventListeners() {
    const incomeInput = document.querySelector('input[aria-label="소득입력란 입니다"]');
    const totalTaxInput = document.querySelector('input[aria-label="종합소득세 값"]');

    incomeInput.addEventListener("input", () => {
        autoSelectRatingBasedOnIncome(incomeInput.value, incomeInput, totalTaxInput);
    });
}

function disableRadioButtons() {
  const ratingButtons = document.querySelectorAll('input[name="rating"]');
  ratingButtons.forEach(button => {
      button.disabled = true; // 라디오 버튼을 비활성화
  });
}


function autoSelectRatingBasedOnIncome(income, incomeInput, totalTaxInput) {
    let incomeBracket = parseFloat(income.replace(/[^\d.-]/g, ""));
    let selectedIndex;

    if (incomeBracket <= 1400000) selectedIndex = 1;
    else if (incomeBracket > 14000000 && incomeBracket <= 50000000) selectedIndex = 2;
    else if (incomeBracket > 50000000 && incomeBracket <= 88000000) selectedIndex = 3;
    else if (incomeBracket > 88000000 && incomeBracket <= 150000000) selectedIndex = 4;
    else if (incomeBracket > 150000000 && incomeBracket <= 300000000) selectedIndex = 5;
    else if (incomeBracket > 300000000 && incomeBracket <= 500000000) selectedIndex = 6;
    else if (incomeBracket > 500000000 && incomeBracket <= 1000000000) selectedIndex = 7;
    else selectedIndex = 8;

    document.querySelector(`input[name="rating"][value="${selectedIndex}"]`).checked = true;
    updateTaxInfo(selectedIndex, incomeInput, totalTaxInput);
}

function updateTaxInfo(selectedIndex, incomeInput, totalTaxInput) {
    let taxRates = ["6%", "15%", "24%", "35%", "38%", "40%", "42%", "45%"];
    let deductions = ["0", "1260000", "5760000", "15440000", "19940000", "25940000", "35940000", "65940000"];

    document.querySelector('input[placeholder="세율"]').value = taxRates[selectedIndex - 1];
    document.querySelector('input[placeholder="누진공제"]').value = deductions[selectedIndex - 1] + "만원";

    calculateTotalTax(incomeInput, totalTaxInput);
}

function calculateTotalTax(incomeInput, totalTaxInput) {
    const taxRateInput = document.querySelector('input[placeholder="세율"]');
    const deductionInput = document.querySelector('input[placeholder="누진공제"]');

    if (!incomeInput.value || isNaN(incomeInput.value)) {
        totalTaxInput.value = '0원';
        return;
    }

    const income = parseFloat(incomeInput.value);
    const taxRate = parseFloat(taxRateInput.value.replace("%", "")) / 100;
    const deduction = parseFloat(deductionInput.value.replace(/[^\d]/g, "")) * 10000; // '만원'을 숫자로 변환
    const totalTax = Math.max(0, income * taxRate - deduction); // 음수가 되지 않도록 처리

    totalTaxInput.value = totalTax.toLocaleString() + "원"; // 계산된 종합소득세 값을 표시
  }