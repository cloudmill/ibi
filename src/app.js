import 'Styles/_app.scss';

const BREAKPOINT = 1280;

// header
{
  $(() => {
    const header = $('.header');

    if (header.length !== 0) {
      // modal
      {
        const state = {
          id: null,
          close: function () {
            $(`[data-modal-id="${this.id}"]`).removeAttr('data-modal-active');
            $(`[data-modal-button="${this.id}"]`).removeAttr('data-modal-active');
          },
          open: function () {
            $(`[data-modal-id="${this.id}"]`).attr('data-modal-active', '');
            $(`[data-modal-button="${this.id}"]`).attr('data-modal-active', '');
          },
          update: function (id) {
            this.id = id;
          },
          change: function (id) {
            this.close();
            this.update(id === this.id ? null : id);
            this.open();
          }
        };

        const btn = $('[data-modal-button]');
        btn.on('click', function () {
          const id = $(this).data('modal-button');
          state.change(id);
        });

        $(window).on('click', event => {
          // const isClickArea = $(event.target).closest(header).length !== 0; ?

          const isClickArea = ( // ?
            // эл-ты header
            $(event.target).closest('.header__container').length !== 0
            && !$(event.target).hasClass('header__container')
            // модальное окно
            || $(event.target).closest('[data-modal-active]').length !== 0
          );

          if (!isClickArea) {
            state.change(null);
          }
        });

        // media
        const breakpoint = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
        breakpoint.addListener((event) => {
          state.change(null);
        });
      }
    }
  });
}

// tabs
{
  $(() => {
    // attrs:
    // data-tabs-id: id компонента
    // data-tabs-button: id таба
    // data-tabs-tab: id таба
    // data-tabs-active: id активного таба

    const tabs_el = $('[data-tabs-id]');
    
    // проверка на существование компонентов
    if (tabs_el.length !== 0) {
      const tabs_id = [];
      
      // сбор id компонентов
      tabs_el.each(function () {
        const cur_id = $(this).data('tabs-id');

        if (tabs_id.indexOf(cur_id) === -1) {
          tabs_id.push(cur_id);
        }
      });

      // обработка компонентов (по id)
      tabs_id.forEach(comp_id => {
        const tab_el = $(`[data-tabs-id="${comp_id}"][data-tabs-tab]`);
        const button_el = $(`[data-tabs-id="${comp_id}"][data-tabs-button]`);

        // проверка на существование табов
        if (tab_el.length !== 0) {
          const state = {
            id: null, // active таб
            update: function (id) {
              this.id = id;
            },
            close: function () {
              // tab_el.filter(`[data-tabs-tab="${this.id}"]`).removeAttr('data-tabs-active');
              tab_el.filter(`[data-tabs-tab="${this.id}"]`).slideUp(500);
              button_el.filter(`[data-tabs-button="${this.id}"]`).removeAttr('data-tabs-active');
            },
            open: function () {
              // tab_el.filter(`[data-tabs-tab="${this.id}"]`).attr('data-tabs-active', '');
              tab_el.filter(`[data-tabs-tab="${this.id}"]`).slideDown(500);
              button_el.filter(`[data-tabs-button="${this.id}"]`).attr('data-tabs-active', '');
            },
            change: function (id) {
              if (id && id !== this.id) {
                this.close();
                this.update(id);
                this.open();
              }
            },
            init: function () {
              const tab_active_id = button_el.filter('[data-tabs-active]').data('tabs-button');
              this.update(tab_active_id);
            }
          };

          state.init();

          button_el.on('click', function () {
            const tab_clicked_id = $(this).data('tabs-button');
            state.change(tab_clicked_id);
          });
        }
      });
    }
  });
}