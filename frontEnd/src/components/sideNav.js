import Component from "../core/Component.js";

export default class Sidebar extends Component {
    template() {
        return `
        <div class="sb-sidenav-menu">
            <div class="nav">
                <div class="sb-sidenav-menu-heading">목록</div>
                <a class="nav-link" href="index.html">
                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                    보기
                </a>
                <div class="collapse" id="collapsePages" aria-labelledby="headingTwo"
                    data-bs-parent="#sidenavAccordion">
                    <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
        
                    </nav>
                </div>
                <div class="sb-sidenav-menu-heading">현황</div>
                <a class="nav-link" href="calculator.html">
                    <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                    계산기
                </a>
                <a class="nav-link" href="word.html">
                    <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                    단어공부
                </a>
                <a class="nav-link" href="rate.html">
                    <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                    환율
                </a>
                <a class="nav-link" href="tables.html">
                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                    자유계시판
                </a>
            </div>
        </div>
        `
    }
}