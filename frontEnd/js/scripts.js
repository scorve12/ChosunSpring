/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 
window.addEventListener('DOMContentLoaded', event => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      //     document.body.classList.toggle('sb-sidenav-toggled');
      // }
      sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
  }

});

document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.querySelector('.calculoatrButton');
    const resetButton = document.querySelector('.resetButton');

    //프린터 버튼 이벤트 리스너
    
    document.getElementById('resultPrint').addEventListener('click', function() {
    window.print(); // 인쇄 대화 상자를 바로 호출합니다.
    });

    // 계산 버튼 이벤트 리스너
    calculateButton.addEventListener('click', function() {
      const comprehensiveIncome =
        document.getElementById("comprehensiveIncome").value || 0;
      const necessaryExpenses =
        document.getElementById("necessaryExpenses").value || 0;
      const deduction = document.getElementById("deduction").value || 0;
      const taxCredit = document.getElementById("taxCredit").value || 0;

      

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

      // 세율 계산 함수
      function calculateTaxRate(income) {
        if (income <= 14000000) return income * 0.06;
        else if (income <= 50000000) return 840000 + (income - 14000000) * 0.15;
        else if (income <= 88000000)
          return 6240000 + (income - 50000000) * 0.24;
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
        else if (income <= 150000000)
          return 1590000 + (income - 88000000) * 0.34;
        else return 3760000 + (income - 150000000) * 0.38;
      }

      // 결과 영역 보여주기 (계산버튼 누를시 숨겨진 상태에서 보여주기 )
      document.getElementById("calculaotrResult").style.display = "block";
    });

            // 초기화 버튼 이벤트 리스너
            resetButton.addEventListener('click', function() {
            document.getElementById('comprehensiveIncome').value = '';
            document.getElementById('necessaryExpenses').value = '';
            document.getElementById('deduction').value = '';
            document.getElementById('taxCredit').value = '';

            document.getElementById('rComprehensiveIncome').innerText = '0';
            document.getElementById('rNecessaryExpenses').innerText = '0';
            document.getElementById('rDeduction').innerText = '0';
            document.getElementById('rTaxCredit').innerText = '0';
            document.getElementById('taxRate').innerText = '0';
            document.getElementById('localIncomeTax').innerText = '0';
            document.getElementById('comprehensiveTax').innerText = '0';
            });

            // 숫자에 3자리마다 콤마를 추가하는 포맷 함수
            function formatNumber(num) {
            return num.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
            });
            }
            });

            function info_print() {
                window.print();
            }
            