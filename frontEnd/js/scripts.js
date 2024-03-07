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

// 페이지 로드 시 종합소득세 계산기를 기본으로 표시
document.addEventListener("DOMContentLoaded", () => {
  generalIncomeTaxContent(); // 페이지가 처음 로드될 때 종합소득세 계산기를 보여줌
});

function generalIncomeTaxContent() {
  renderComprehensiveIncomeTax();
  renderResultBox();
  attachEventListeners();
  applyRadioButtonsStyle();
  
}

function  renderComprehensiveIncomeTax() {
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

    <div class="calculatorboxbackground4">
    <div class="resultBox">
    <div class="col-3 font"><i class="fa-solid fa-dollar-sign"></i>종합소득세</div>
    <div class="col-6 ">
      <input type="text" class="form-control form-control-lg result-right" aria-label="종합소득세 값" readonly  />
    </div>
    <button title="Button fade blue/green" class="button btnFade btnBlueGreen">저장</button>
    </div>
    
  </div>
  

      `;
}

function attachEventListeners() {
  const incomeInput = document.querySelector(
    'input[aria-label="소득입력란 입니다"]'
  );
  const totalTaxInput = document.querySelector(
    'input[aria-label="종합소득세 값"]'
  );

  incomeInput.addEventListener("input", () => {
    autoSelectRatingBasedOnIncome(
      incomeInput.value,
      incomeInput,
      totalTaxInput
    );
  });
}

function disableRadioButtons() {
  const ratingButtons = document.querySelectorAll('input[name="rating"]');
  ratingButtons.forEach((button) => {
    button.disabled = true; // 라디오 버튼을 비활성화
  });
}



function autoSelectRatingBasedOnIncome(income, incomeInput, totalTaxInput) {
  let incomeBracket = parseFloat(income.replace(/[^\d.-]/g, ""));
  let selectedIndex;

  // 소득 구간 비교 조건 수정
  if (incomeBracket <= 14000000) selectedIndex = 1;
  else if (incomeBracket > 14000000 && incomeBracket <= 50000000)
    selectedIndex = 2;
  else if (incomeBracket > 50000000 && incomeBracket <= 88000000)
    selectedIndex = 3;
  else if (incomeBracket > 88000000 && incomeBracket <= 150000000)
    selectedIndex = 4;
  else if (incomeBracket > 150000000 && incomeBracket <= 300000000)
    selectedIndex = 5;
  else if (incomeBracket > 300000000 && incomeBracket <= 500000000)
    selectedIndex = 6;
  else if (incomeBracket > 500000000 && incomeBracket <= 1000000000)
    selectedIndex = 7;
  else selectedIndex = 8;

  document.querySelector(
    `input[name="rating"][value="${selectedIndex}"]`
  ).checked = true;
  updateTaxInfo(selectedIndex, incomeInput, totalTaxInput);
}

function updateTaxInfo(selectedIndex, incomeInput, totalTaxInput) {
  let taxRates = ["6%", "15%", "24%", "35%", "38%", "40%", "42%", "45%"];
  let deductions = ["0", "126", "576", "1544", "1994", "2594", "3594", "6594"]; // 직접 '만원' 단위로 제공

  document.querySelector('input[placeholder="세율"]').value =
    taxRates[selectedIndex - 1];
  // 누진공제 값을 '만원' 단위에서 원 단위로 변환하지 않고 직접 사용
  document.querySelector('input[placeholder="누진공제"]').value =
    deductions[selectedIndex - 1] + "만원";

  calculateTotalTax(incomeInput, totalTaxInput);
}

function calculateTotalTax(incomeInput, totalTaxInput) {
  const taxRateInput = document.querySelector('input[placeholder="세율"]');
  const deductionInput = document.querySelector(
    'input[placeholder="누진공제"]'
  );

  if (!incomeInput.value || isNaN(incomeInput.value)) {
    totalTaxInput.value = "0원";
    return;
  }

  const income = parseFloat(incomeInput.value);
  const taxRate = parseFloat(taxRateInput.value.replace("%", "")) / 100;
  // 누진공제 값에서 '만원'을 원으로 변환
  const deduction =
    parseFloat(deductionInput.value.replace(/[^\d]/g, "")) * 10000;

  const totalTax = Math.max(0, income * taxRate - deduction); // 음수 방지 처리

  totalTaxInput.value = `${totalTax.toLocaleString()}원`; // 계산된 종합소득세 출력
}

// Simplified Tax 계산기 관련 함수
function simplifiedTaxContent() {

  renderSimplifiedTax();
  renderResultBox2();
  attachSimplifiedTaxEventListeners();
 
}


function renderSimplifiedTax() {
    calculatorBox.innerHTML = `
  <div class = jobchoice>
  <div class="col choice">
    <input type="radio" name="job" value="1" />
    <span>소매업, 재생용 재료수집 및 판매업, 음식점업</span>
</div>

<div class="col choice">
  <input type="radio" name="job" value="2" />
  <span>제조업, 농업·임업 및 어업, 소화물 전문 운송업</span>
</div>

<div class="col choice">
<input type="radio" name="job" value="3" />
<span>숙박업</span>
</div>

<div class="col choice">
<input type="radio" name="job" value="4" />
<span>건설업, 운수 및 창고업, 정보통신업</span>
</div>

<div class="col choice">
<input type="radio" name="job" value="5" />
<span>금융·보험 관련 서비스업, 전문·과학 및 기술서비스업, 사업시설관리·사업지원 및 임대서비스업, 부동산관련 서비스업, 부동산임대업</span>
</div>

<div class="col choice">
<input type="radio" name="job" value="4" />
<span>그 이외</span>
</div>
</div>
  `;
}

function renderResultBox2() {
  resultBox.innerHTML = `
  <div class="calculatorboxbackground5">
  <div class="calculatorBox">
    
    <div class="row location2">
      <div class="col-3">
        <input type="text" class="form-control" placeholder="매출대가 입력" aria-label="매출대가" />
    </div>
    <div class="col-1 font">x</div>
    <div class="col-2">
      <input type="text" class="form-control" placeholder="부가가치율" aria-label="업종별 부가가치율" readonly/>
  </div>
  <div class="col-1 font" style="font-size: 19pt">-</div>
  <div class="col-3">
    <input type="text" class="form-control" placeholder="매입대가 입력" aria-label="매입대가" />
</div> 
    </div>

  </div>

</div>
<div class="calculatorboxbackground4">
  <div class="resultBox">
    <div class="col-3 font"><i class="fa-solid fa-dollar-sign"></i>간이과세</div>
  <div class="col-6 ">
    <input type="text" class="form-control form-control-lg result-right" aria-label="간이과세 값" readonly  />
  </div><button title="Button fade blue/green" class="button btnFade btnBlueGreen">저장</button></div>
  
</div>
`;
}



function attachSimplifiedTaxEventListeners() {
  const jobButtons = document.querySelectorAll('input[name="job"]');
  const salesAmountInput = document.querySelector('input[aria-label="매출대가"]');
  const purchaseAmountInput = document.querySelector('input[aria-label="매입대가"]');
  const valueAddedRateInput = document.querySelector('input[aria-label="업종별 부가가치율"]');
  const simplifiedTaxResultInput = document.querySelector('input[aria-label="간이과세 값"]');

  jobButtons.forEach(button => {
      button.addEventListener('change', () => updateValueAddedRate(button.value, valueAddedRateInput));
  });

  const calculateSimplifiedTax = () => {
      if (!salesAmountInput.value || !purchaseAmountInput.value) {
          salesAmountInput.placeholder = "값을 입력해주세요";
          purchaseAmountInput.placeholder = "값을 입력해주세요";
          simplifiedTaxResultInput.value = '';
          return;
      }

      const salesAmount = parseFloat(salesAmountInput.value);
      const purchaseAmount = parseFloat(purchaseAmountInput.value);
      const valueAddedRate = parseFloat(valueAddedRateInput.value.replace('%', '')) / 100;
      const purchaseDeduction = purchaseAmount * 0.005; // 매입대가 * 0.5%
      const simplifiedTax = (salesAmount * valueAddedRate) - purchaseDeduction;

      simplifiedTaxResultInput.value = simplifiedTax.toLocaleString() + '원';
  };

  salesAmountInput.addEventListener('input', calculateSimplifiedTax);
  purchaseAmountInput.addEventListener('input', calculateSimplifiedTax);
}

function updateValueAddedRate(value, input) {
  const rates = {
      '1': '1.5',
      '2': '2.0',
      '3': '2.5',
      '4': '3.0',
      '5': '4.0',
      '6': '3.0'
  };
  input.value = rates[value] ? `${rates[value]}%` : '0%';
}

