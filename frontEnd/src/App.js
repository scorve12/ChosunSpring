import Component from "./core/Component.js";
import Navbar from "./components/nav.js";
import Footer from "./components/footer.js";
import Sidebar from "./components/sideNav.js"


export default class App extends Component {
    constructor($target) {
        super($target); // Component의 constructor 호출
        this.$target = $target; // $target 프로퍼티 설정
        this.setup(); // setup 호출
        this.render(); // render 메소드 호출하여 template을 그리고 mounted를 호출
    }
  setup () {
  };

  template () {
    return `
        <nav data-component="navigation" class="sb-topnav navbar navbar-expand navbar-dark bg-dark"></nav>
        <div id="layoutSidenav">

            <div id="layoutSidenav_nav">
                <nav data-component="sidebar" class="sb-sidenav accordion sb-sidenav-dark"></nav>
            </div>

            <div id="layoutSidenav_content">
                <main></main>   
                <footer data-component="footer" class="py-4 bg-light mt-auto"></footer>
            </div>

        </div>
    `;
  };
  render() {
    this.$target.innerHTML = this.template(); // template을 $target에 렌더링
    this.mounted(); // mounted 호출
  }

  mounted () {
    const $navigation = this.$target.querySelector('[data-component="navigation"]');
    const $footer = this.$target.querySelector('[data-component="footer"]');
    const $sidebar = this.$target.querySelector('[data-component="sidebar"]');
    new Navbar($navigation)
    new Footer($footer)
    new Sidebar($sidebar)
  };
}