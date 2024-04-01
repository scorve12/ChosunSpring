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

document.addEventListener("DOMContentLoaded", function () {
  // 페이지 로드 시 종합소득세 섹션 렌더링
  renderTotalTaxSection();

  // 컨텐츠를 동적으로 변경하기 위한 기본 함수
  function renderContent(targetId, content) {
    const target = document.getElementById(targetId);
    if (target) {
      target.innerHTML = content;
    }
  }

  // 종합소득세 섹션 렌더링
  function renderTotalTaxSection() {
    const inputContent = ` <div class="rows">
    <div class="text-content">
      <div class="tit-tx">소득</div>
    </div>

    <div class="cont-tx1">
      <div>
        <input
          id = "comprehensiveIncome"
          type="text"
          class="getMoney"
          placeholder="소득을 입력 해주세요."
        />원
      </div>
      <div class="explainTxt">
        사업소득, 임대소득 등 종합소득 합계
      </div>
    </div>
  </div>

  <div class="rows">
    <div class="text-content1">
      <div class="tit-tx">필요경비</div>
    </div>
    <div class="cont-tx1">
      <div>
        <input
          id ="necessaryExpenses"
          type="text"
          class="getMoney"
          placeholder="필요경비를 입력 해주세요."
        />원
      </div>
      <div class="explainTxt">
        주요경비 : 상품 구입비용, 임차료, 인건비
      </div>
      <div class="explainTxt">
        기타경비 : 복리후생비, 차량유지비, 보험료, 소모품비,
        지급수수료 등
      </div>
    </div>
  </div>

  <div class="rows">
    <div class="text-content1">
      <div class="tit-tx">소득 공제</div>
    </div>
    <div class="cont-tx1">
      <div>
        <input
          id = "deduction"
          type="text"
          class="getMoney"
          placeholder="공제를 입력 해주세요."
        />원
      </div>
      <div class="explainTxt">
        근로소득공제, 종합소득공제 합계
      </div>

      <button
        id="explainTax"
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        소득공제 더보기
      </button>
    </div>
    <!--소득공제 Modal -->
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              당백전 계산기
            </h1>
          </div>
          <div class="modal-body">
            <h2>소득 공제 안내</h2>
            <ul>
              <li>
                <strong>근로소득공제:</strong> 총 급여액에서 일정
                금액을 기본적으로 공제하는 것이 바로
                근로소득공제입니다.
              </li>
              <li>
                <strong>종합소득공제:</strong> 특정 항목의 지출
                내역 일부를 총 급여액에서 제외해주는 것입니다.
              </li>
              <li>
                <strong>세액 공제:</strong> 이미 산출된 세액에서
                특정 항목을 차감해주는 것입니다. (예: 연금계좌,
                보험료, 의료비, 교육비, 기부금, 월세, 자녀
                세액공제)
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="rows">
    <div class="text-content1">
      <div class="tit-tx">세액 공제</div>
    </div>
    <div class="cont-tx1">
      <div>
        <input
          id ="taxCredit"
          type="text"
          class="getMoney"
          placeholder="세액공제를 입력 해주세요."
        />원
      </div>
      <button
        id="explainTax"
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        세액공제 더보기
      </button>
    </div>

    <!--세액공제 Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              당백전 계산기
            </h1>
          </div>
          <div class="modal-body">
            <h2>소득 공제 안내</h2>
            <ul>
              <li>
                <strong>세액 공제:</strong> 이미 산출된 세액에서
                특정 항목을 차감해주는 것입니다. (예: 연금계좌,
                보험료, 의료비, 교육비, 기부금, 월세, 자녀
                세액공제)
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    const resultContent = ` <div >*계산결과 </div>
    <hr />
    <div class="rows">
    <div class="rows-c-item-container">

      <div class="rows-total-tax">
        <div class="resultTit">&nbsp;&nbsp;&nbsp;종합소득</div>
        <div class="rows">
        <div id ="rComprehensiveIncome" class="resultTax"></div>
        <div  class="resultLocation">원</div>
        </div>
        
      </div> 
      </div>
    </div>
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">

        <div class="rows-total-tax">
          <div class="resultTit"><i class="fa-solid fa-circle-minus"></i>&nbsp;필요경비</div>
          <div class="rows">
          <div id="rNecessaryExpenses" class="resultTaxMinus"></div>
          <div  class="resultLocation"> 원</div>
          </div> 
        </div> 
        </div>
    </div>
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">

        <div class="rows-total-tax">
          <div class="resultTit"><i class="fa-solid fa-circle-minus"></i>&nbsp;소득공제</div>
          <div class="rows">
          <div id="rDeduction" class="resultTaxMinus"></div>
          <div  class="resultLocation">원</div>
          </div> 
        </div> 
        </div>
    </div>
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">

        <div class="rows-total-tax">
          <div class="resultTit"><i class="fa-solid fa-circle-xmark"></i>&nbsp;과세표쥰 세율</div>
          <div class="rows">
          <div id="taxRate" class="resultTax"></div>
          <div  class="resultLocation">원</div>
          </div> 
        </div> 
        </div>
    </div>
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">

        <div class="rows-total-tax">
          <div class="resultTit"><i class="fa-solid fa-circle-minus"></i>&nbsp;세액공제</div>
          <div class="rows">
          <div  id="rTaxCredit" class="resultTaxMinus"></div>
          <div class="resultLocation">원</div>
          </div> 
        </div> 
        </div>
    </div>
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">

        <div class="rows-total-tax">
          <div class="resultTit"><i class="fa-solid fa-circle-plus"></i>&nbsp;지방소득세</div>
          <div class="rows">
          <div id="localIncomeTax" class="resultTaxPlus"></div>
          <div class="resultLocation">원</div>
          </div> 
        </div> 
        </div>
    </div>
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">

        <div class="rows-total-tax">
          <div class="resultTit-t">&nbsp;종합소득세</div>
          <div class="rows">
          <div id="comprehensiveTax" class="resultTax-t"></div>
          <div  class="resultLocation-t">원</div>
          </div> 
          
        </div> `;
    renderContent("inputBox", inputContent);
    renderContent("resultBox", resultContent);
  }

  // 간이과세 섹션 렌더링
  function renderSimpleTaxSection() {
    const inputContent = `
    <div class="rows">
    <div class="text-content">
      <div class="tit-tx">매출대가</div>
    </div>

    <div class="cont-tx1">
      <div>
        <input
          id = "income"
          type="text"
          class="getMoney"
          placeholder="매출대가를 입력해주세요."
        />원
      </div>
      <div class="explainTxt">
        년,월 기준이 되는 매출액합
      </div>
    </div>
  </div>

  <div class="rows">
    <div class="text-content2">
      <div class="tit-tx">업종선택</div>
    </div>
    <div class="cont-tx2">
      <div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="choice1" checked>
          <label class="form-check-label" for="flexRadioDefault1">
            소매업, 재생용 재료수집 및 판매업, 음식점업
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="choice2">
          <label class="form-check-label" for="flexRadioDefault1">
            제조업,농업,임업 및 어업, 소화물 전문 운송업
          </label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="choice3">
          <label class="form-check-label" for="flexRadioDefault1">
            제조업,농업,임업 및 어업, 소화물 전문 운송업
          </label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="choice4">
          <label class="form-check-label" for="flexRadioDefault1">
            숙박업
          </label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="choice5">
          <label class="form-check-label" for="flexRadioDefault1">
            건설업,운수업,창고업,정보통신업, 그 밖의 서비스업
          </label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="choice6">
          <label class="form-check-label" for="flexRadioDefault1">
           금융 및 보험 서비스업, 전문 과학 및 기술서비스업,<br> 사업시설관리 사업지원 및 임대서비스업, 부동산 관련서비스업, 부동산임대업
          </label>
        </div>

      </div>
    </div>
  </div>

  <div class="rows">
    <div class="text-content1">
      <div class="tit-tx">매입대가</div>
    </div>
    <div class="cont-tx1">
      <div>
        <input
          id = "purchasePrice"
          type="text"
          class="getMoney"
          placeholder="매입대가를 입력해주세요."
        />원
      </div>
      <div class="explainTxt">
        년,월 기준이 되는 매입액합
      </div>
    </div>
  </div>`;
    const resultContent = ` 
    <div >*계산결과 </div>
     <hr />
    <div class="rows">
    <div class="rows-c-item-container">

      <div class="rows-total-tax">
        <div class="resultTit">&nbsp;&nbsp;&nbsp;매출대가</div>
        <div class="rows">
        <div id ="rIncome" class="resultTax"></div>
        <div  class="resultLocation">원</div>
        </div>
        
      </div> 
      </div>
    </div>
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">
        <div class="rows-total-tax">
          <div class="resultTit"><i class="fa-solid fa-circle-xmark"></i>&nbsp;업종별 부가가치율</div>
          <div class="rows">
          <div id="jobCategory" class="resultTaxMinus"></div>
          <div  class="resultLocation"> %</div>
          </div> 
        </div> 
        </div>
    </div>
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">

        <div class="rows-total-tax">
          <div class="resultTit"><i class="fa-solid fa-circle-minus"></i>&nbsp;매입대가</div>
          <div class="rows">
          <div id="rPurchasePrice" class="resultTaxMinus"></div>
          <div  class="resultLocation">원</div>
          </div> 
        </div> 
        </div>
    </div>
  
  
    <hr />
    <div class = "rows">
      <div class="rows-c-item-container">

        <div class="rows-total-tax">
          <div class="resultTit-t">&nbsp;간이과세</div>
          <div class="rows">
          <div id="simpleTax" class="resultTax-t"></div>
          <div  class="resultLocation-t">원</div>
          </div> 
          
        </div> 
        </div>
  </div>`;
    renderContent("inputBox", inputContent);
    renderContent("resultBox", resultContent);
  }

  // 각 섹션에 대한 클릭 이벤트 리스너 등록
  document
    .getElementById("s-totalTax")
    .addEventListener("click", renderTotalTaxSection);
  document
    .getElementById("s-simpleTax")
    .addEventListener("click", renderSimpleTaxSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.querySelector(".calculoatrButton");
  const resetButton = document.querySelector(".resetButton");

  // 계산 버튼 이벤트 리스너
  calculateButton.addEventListener("click", function () {
    const comprehensiveIncome =
      document.getElementById("comprehensiveIncome").value || 0;
    const necessaryExpenses =
      document.getElementById("necessaryExpenses").value || 0;
    const deduction = document.getElementById("deduction").value || 0;
    const taxCredit = document.getElementById("taxCredit").value || 0;

    // 입력 값 유효성 검사
    if (
      !comprehensiveIncome ||
      !necessaryExpenses ||
      !deduction ||
      !taxCredit
    ) {
      alert("모든 필드를 채우주세요.");
      return; // 조건이 만족되지 않으면 여기에서 함수 실행을 중지합니다.
    }

    // 입력 값에 컴마와 숫자만 남기고 모든 문자 제거 (숫자 변환 전 처리)
    const comprehensiveIncomeNum = parseFloat(
      comprehensiveIncome.replace(/,/g, "")
    );
    const necessaryExpensesNum = parseFloat(
      necessaryExpenses.replace(/,/g, "")
    );
    const deductionNum = parseFloat(deduction.replace(/,/g, ""));
    const taxCreditNum = parseFloat(taxCredit.replace(/,/g, ""));

    // 결과 출력 필드
    const rComprehensiveIncome = document.getElementById(
      "rComprehensiveIncome"
    );
    const rNecessaryExpenses = document.getElementById("rNecessaryExpenses");
    const rDeduction = document.getElementById("rDeduction");
    const rTaxCredit = document.getElementById("rTaxCredit");
    const taxRate = document.getElementById("taxRate");
    const localIncomeTax = document.getElementById("localIncomeTax");
    const comprehensiveTax = document.getElementById("comprehensiveTax");

    // 입력 값 출력
    rComprehensiveIncome.innerText = formatNumber(comprehensiveIncomeNum);
    rNecessaryExpenses.innerText = formatNumber(necessaryExpensesNum);
    rDeduction.innerText = formatNumber(deductionNum);
    rTaxCredit.innerText = formatNumber(taxCreditNum);

    // 과세표준 계산
    const taxableIncome = comprehensiveIncomeNum - deductionNum;

    // 세율 계산
    let taxAmount = calculateTaxRate(taxableIncome);
    taxRate.innerText = formatNumber(taxAmount);

    // 지방소득세 계산
    let localTax = calculateLocalTax(taxableIncome);
    localIncomeTax.innerText = formatNumber(localTax);

    // 종합소득세 계산
    let totalTax =
      ((comprehensiveIncomeNum - necessaryExpensesNum - deductionNum) *
        taxAmount) /
        100 -
      taxCreditNum +
      localTax;
    comprehensiveTax.innerText = formatNumber(totalTax); // 최종 종합소득세 값 출력

    // 숫자 포맷팅 함수
    function formatNumber(num) {
      return num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }

    // 초기화 버튼 이벤트 리스너
    resetButton.addEventListener("click", function () {
      document.getElementById("comprehensiveIncome").value = "";
      document.getElementById("necessaryExpenses").value = "";
      document.getElementById("deduction").value = "";
      document.getElementById("taxCredit").value = "";

      document.getElementById("rComprehensiveIncome").innerText = "0";
      document.getElementById("rNecessaryExpenses").innerText = "0";
      document.getElementById("rDeduction").innerText = "0";
      document.getElementById("rTaxCredit").innerText = "0";
      document.getElementById("taxRate").innerText = "0";
      document.getElementById("localIncomeTax").innerText = "0";
      document.getElementById("comprehensiveTax").innerText = "0";
    });

    // 세율 계산 함수
    function calculateTaxRate(income) {
      if (income <= 14000000) return income * 0.06;
      else if (income <= 50000000) return 840000 + (income - 14000000) * 0.15;
      else if (income <= 88000000) return 6240000 + (income - 50000000) * 0.24;
      else if (income <= 150000000)
        return 15360000 + (income - 88000000) * 0.34;
      else if (income <= 300000000)
        return 37060000 + (income - 150000000) * 0.38;
      else if (income <= 500000000)
        return 94060000 + (income - 300000000) * 0.4;
      else if (income <= 1000000000)
        return 174060000 + (income - 500000000) * 0.42;
      else return 384060000 + (income - 1000000000) * 0.45;
    }

    // 지방소득세 계산 함수
    function calculateLocalTax(income) {
      if (income <= 12000000) return income * 0.006;
      else if (income <= 46000000) return 72000 + (income - 12000000) * 0.15;
      else if (income <= 88000000) return 582000 + (income - 46000000) * 0;
      else if (income <= 88000000) return 582000 + (income - 46000000) * 0.24;
      else if (income <= 150000000) return 1590000 + (income - 88000000) * 0.34;
      else return 3760000 + (income - 150000000) * 0.38;
    }

    // 결과 영역 보여주기 (계산버튼 누를시 숨겨진 상태에서 보여주기 )
    document.getElementById("calculaotrResult").style.display = "block";
  });

  // 숫자에 3자리마다 콤마를 추가하는 포맷 함수
  function formatNumber(num) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
});

function info_print() {
  window.print();
}

const calculateButton = document.querySelector(".calculoatrButton");
const resetButton = document.querySelector(".resetButton");

// 계산 버튼 이벤트 리스너
calculateButton.addEventListener("click", function () {
  const income = parseFloat(document.getElementById("income").value) || 0;
  const purchasePrice =
    parseFloat(document.getElementById("purchasePrice").value) || 0;
  let jobCategoryPercentage = 0;

  // 라디오 버튼 선택 확인
  const isRadioSelected = document.querySelector('input[type="radio"]:checked');

  // 입력 값과 라디오 버튼 선택 유효성 검사
  if (!income || !purchasePrice || !isRadioSelected) {
    alert("모든 필드를 채우고 업종을 선택해주세요.");
    return; // 조건이 만족되지 않으면 여기에서 함수 실행을 중지합니다.
  }

  if (document.getElementById("choice1").checked) jobCategoryPercentage = 15;
  else if (document.getElementById("choice2").checked)
    jobCategoryPercentage = 20;
  else if (document.getElementById("choice3").checked)
    jobCategoryPercentage = 25;
  else if (document.getElementById("choice4").checked)
    jobCategoryPercentage = 30;
  else if (document.getElementById("choice5").checked)
    jobCategoryPercentage = 40;

  document.getElementById("jobCategory").innerText = jobCategoryPercentage;

  const result =
    income * (jobCategoryPercentage / 100) * 0.01 - purchasePrice * 0.005;
  document.getElementById("simpleTax").innerText = result.toFixed(2);

  document.getElementById("calculaotrResult").style.display = "block";
});

// 초기화 버튼 이벤트 리스너
resetButton.addEventListener("click", function () {
  document.getElementById("income").value = "";
  document.getElementById("purchasePrice").value = "";
  document.getElementById("rIncome").innerText = "0";
  document.getElementById("jobCategory").innerText = "0";
  document.getElementById("rPurchasePrice").innerText = "0";
  document.getElementById("simpleTax").innerText = "0";

  // 라디오 버튼 상태 초기화
  const radios = document.querySelectorAll("input[type=radio]");
  radios.forEach((radio) => {
    radio.checked = false;
  });
});

//간이과세 계산기

document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.querySelector(".calculoatrButton");
  const resetButton = document.querySelector(".resetButton");

  calculateButton.addEventListener("click", function () {
    const income = parseFloat(document.getElementById("income").value) || 0;
    const purchasePrice =
      parseFloat(document.getElementById("purchasePrice").value) || 0;
    let jobCategoryPercentage = 0;

    document.getElementById("rIncome").innerText = income;
    document.getElementById("rPurchasePrice").innerText = purchasePrice;

    if (document.getElementById("choice1").checked) jobCategoryPercentage = 15;
    else if (document.getElementById("choice2").checked)
      jobCategoryPercentage = 20;
    else if (document.getElementById("choice3").checked)
      jobCategoryPercentage = 25;
    else if (document.getElementById("choice4").checked)
      jobCategoryPercentage = 30;
    else if (document.getElementById("choice5").checked)
      jobCategoryPercentage = 40;

    document.getElementById("jobCategory").innerText = jobCategoryPercentage;

    const result =
      income * (jobCategoryPercentage / 100) * 0.1 - purchasePrice * 0.5;
    document.getElementById("simpleTax").innerText = result.toFixed(2);
  });

  resetButton.addEventListener("click", function () {
    document.getElementById("purchasePrice").value = "";
    document.getElementById("jobCategory").innerText = "0";
    document.getElementById("rPurchasePrice").innerText = "0";
    document.getElementById("simpleTax").innerText = "0";
    // Reset radio buttons and income
    const radios = document.querySelectorAll("input[type=radio]");
    radios.forEach((radio) => {
      radio.checked = false;
    });
    document.getElementById("income").value = "";
  });
});

//프린터 버튼 이벤트 리스너
document.getElementById("resultPrint").addEventListener("click", function () {
  window.print(); // 인쇄 대화 상자를 바로 호출합니다.
});
