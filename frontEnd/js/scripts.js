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
    const ratingButtons = document.querySelectorAll('input[name="rating"]');
  
    ratingButtons.forEach(button => {
      button.addEventListener("change", () => updateTaxInfo(button, incomeInput, totalTaxInput));
    });
  
    incomeInput.addEventListener("input", () => calculateTotalTax(incomeInput, totalTaxInput));
  }
  
  function updateTaxInfo(button, incomeInput, totalTaxInput) {
    // 세율과 누진공제 정보 업데이트
    // 예시: 첫 번째 등급 선택 시
    let taxRates = ["6%", "15%", "24%", "35%", "38%", "40%", "42%", "45%"];
    let deductions = ["0원", "126만원", "576만원", "1,544만원", "1,994만원", "2,594만원", "3,594만원", "6,594만원"];
    
    const selectedIndex = parseInt(button.value) - 1;
    document.querySelector('input[placeholder="세율"]').value = taxRates[selectedIndex];
    document.querySelector('input[placeholder="누진공제"]').value = deductions[selectedIndex];
  
    calculateTotalTax(incomeInput, totalTaxInput);
  }
  
  function calculateTotalTax(incomeInput, totalTaxInput) {
    const taxRateInput = document.querySelector('input[placeholder="세율"]');
    const deductionInput = document.querySelector('input[placeholder="누진공제"]');
    const selectedRating = document.querySelector('input[name="rating"]:checked');
  
    if (!selectedRating) {
      totalTaxInput.placeholder = "등급을 먼저 선택해주세요";
      totalTaxInput.value = '';
      return;
    }
  
    if (!incomeInput.value || isNaN(incomeInput.value)) {
      totalTaxInput.placeholder = "소득을 입력 해주세요";
      totalTaxInput.value = '';
      return;
    }
  
    const income = parseFloat(incomeInput.value);
    const taxRate = parseFloat(taxRateInput.value.replace("%", "")) / 100;
    const deduction = parseFloat(deductionInput.value.replace(/[^\d]/g, "")) * 10000; // '만원'을 숫자로 변환
    const totalTax = Math.max(0, income * taxRate - deduction); // 음수가 되지 않도록 처리
  
    totalTaxInput.value = totalTax.toLocaleString() + "원"; // 계산된 종합소득세 값을 표시
  }