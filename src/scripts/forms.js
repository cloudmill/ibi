// form response
// {
//   $(() => {
//     const form = $('.form');

//     if (form.length !== 0) {

//       const response = $('.response');
//       const responseButton = $('.response__btn');
//       const formButton = $('.form__btn');
//       const formTitle = $('.form-title')

//       formButton.on('click', function (event) {
//         event.preventDefault();
//         form.addClass('form--hidden');
//         response.addClass('response--active');
//         formTitle.addClass('display-none');
//         // $('.provider__row').addClass('provider__row--active');
//       });

//       responseButton.on('click', function () {
//         form.removeClass('form--hidden');
//         response.removeClass('response--active');
//         formTitle.removeClass('display-none');
//         // $('.provider__row').removeClass('provider__row--active');
//       });
//     }
//   });
// };

// tel mask

{
  document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');
    // console.log(phoneInputs);

    var getInputNumbersValue = function (input) {
      // Удаление любых символов крме цифр
      return input.value.replace(/\D/g, '');
    }

    // Очистка скопированного и вставленного в поле номера
    var onPhonePaste = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
      var pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
          input.value = inputNumbersValue;
          return;
        }
      }
    }

    // Обработка вписанного вручную номера
    var onPhoneInput = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

      if (!inputNumbersValue) {
        return input.value = "";
      }

      if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
          input.value = inputNumbersValue;
        }
        return;
      }

      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
        var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
      // Удаление первого символа после удаления номера
      var inputValue = e.target.value.replace(/\D/g, '');
      if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
      }
    }
    for (var phoneInput of phoneInputs) {
      phoneInput.addEventListener('keydown', onPhoneKeyDown);
      phoneInput.addEventListener('input', onPhoneInput, false);
      phoneInput.addEventListener('paste', onPhonePaste, false);
    }
  })
}

// Parsley localisation

// {
//   $(() => {

//     Parsley.addMessages('ru', {
//       defaultMessage: "Некорректное значение",
//       type: {
//         email: "Введите адрес электронной почты",
//         url: "Введите URL адрес",
//         number: "Введите число",
//         integer: "Введите целое число",
//         digits: "Введите только цифры",
//         alphanum: "Введите буквенно-цифровое значение"
//       },
//       notblank: "Это поле должно быть заполнено",
//       required: "Обязательное поле",
//       pattern: "Это значение некорректно",
//       min: "Это значение должно быть не менее чем %s",
//       max: "Это значение должно быть не более чем %s",
//       range: "Это значение должно быть от %s до %s",
//       minlength: "Это значение должно содержать не менее %s символов",
//       maxlength: "Это значение должно содержать не более %s символов",
//       length: "Это значение должно содержать от %s до %s символов",
//       mincheck: "Выберите не менее %s значений",
//       maxcheck: "Выберите не более %s значений",
//       check: "Выберите от %s до %s значений",
//       equalto: "Это значение должно совпадать"
//     });

//     Parsley.setLocale('ru');

//   });
// };