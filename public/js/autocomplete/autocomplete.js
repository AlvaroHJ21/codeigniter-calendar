export class Autocomplete {
  constructor(props) {
    const { target, data, onSelect, onDiselect, selected = null } = props;

    this.target = document.querySelector(target);
    this.data = data;
    this.results = [];
    this.value = '';
    this.selected = selected;

    this.onSelect = onSelect;
    this.onDiselect = onDiselect;
  }

  render() {
    if (!this.target) return;

    this.target.innerHTML = '';

    //renderizar un input
    const div = document.createElement('div');
    div.innerHTML = `
    
      ${
        this.selected
          ? `
          <div class="d-flex" >
            <input 
              type="text" 
              class="form-control" 
              style="min-width:120px" 
              value="${this.selected.name}" 
              disabled
              data-bs-toggle="tooltip" data-bs-title="${this.selected.name}"
            >
            <button class="btn btn-danger btn-sm"><i class="fa fa-minus"></i></button>
          </div>`
          : `<input type="text" class="form-control" placeholder="Buscar..." style="min-width:120px">`
      }

      <div class="dropdown-menu p-2" style="display:none">
        <div class="dropdown-menu-body d-flex flex-column">
        </div>
      </div>
    `;
    this.target.appendChild(div);

    const input = div.querySelector('input');
    const dropdown = div.querySelector('.dropdown-menu');
    const dropdownBody = div.querySelector('.dropdown-menu-body');

    input.addEventListener('keyup', (e) => {
      const value = e.target.value;

      if (value.length < 2) {
        this.results = [];
        this.renderResults(dropdownBody);
        dropdown.style.display = 'none';
        return;
      }

      this.results = this.data.filter((item) => {
        return (
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.code.toLowerCase().includes(value.toLowerCase())
        );
      });

      this.renderResults(dropdownBody);
      dropdown.style.display = 'block';
    });

    const btnDiselect = div.querySelector('button');
    if (btnDiselect) {
      btnDiselect.addEventListener('click', () => {
        this.value = '';
        this.selected = null;
        this.target.querySelector('input').value = this.value;
        this.target.querySelector('.dropdown-menu').style.display = 'none';

        this.onDiselect();
        this.render();
      });
    }
  }

  renderResults(target) {
    target.innerHTML = '';

    this.results.forEach((result) => {
      const btn = document.createElement('button');

      btn.className = 'dropdown-menu-item btn btn-light';
      btn.style.textAlign = 'left';

      btn.innerHTML = `${result.code}-${result.name}`;

      btn.addEventListener('click', () => {
        this.value = result.name;
        this.selected = result;
        this.target.querySelector('input').value = this.value;
        this.target.querySelector('.dropdown-menu').style.display = 'none';

        this.onSelect(result);
        this.render();
      });

      target.appendChild(btn);
    });
  }
}
