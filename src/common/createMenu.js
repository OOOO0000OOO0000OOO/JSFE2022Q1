export default class Menu {
  /**
   * Create burger menu
   * @param { HTMLElement } header
   */
  constructor(header) {
    this.header = header;
    this.burger = header.querySelector('button');
    this.navigation = header.querySelector('nav');
  }

  activate() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay')

    this.navigation.before(overlay);
    this.navigation.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="logo">
        <h1 class="title">Cozy House</h1>
        <h2 class="subtitle">Shelter for pets in Boston</h2>
      </div>
    `
    );

    [
      this.burger,
      ...this.navigation.querySelectorAll('.nav-link'),
      overlay,
    ].forEach((item) => {
      item.onclick = () => {
        if (document.documentElement.clientWidth > 767) return;

        this.header.classList.toggle('active');
        document.body.classList.toggle('overlay-active')
      };
    });
  }
}