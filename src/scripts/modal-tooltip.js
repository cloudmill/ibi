$(() => {
  const btns = $('[data-modal-tooltip-id]')

  if (btns.length) {
    const CLASS_OPEN = 'vacancy--modal-open'
    const body = $('.body')
      
    const state = {
      id: null,
    }

    $(window).on('click', event => {
      const target = $(event.target)

      const btn = target.closest(btns)
      if (btn.length) {
        state.id = btn.data('modal-tooltip-id')

        const modal = $(`#${state.id}`)
        modal.addClass(CLASS_OPEN)
        body.addClass('hidden')

      } else if (state.id) {
        const modal = $(`#${state.id}`)
        const form = modal.find('.modal-forms__form')

        const targetInForm = target.closest(form)

        if (!targetInForm.length) {
          modal.removeClass(CLASS_OPEN)
          body.removeClass('hidden')
          state.id = null
        }
      }
    })
  }
})
