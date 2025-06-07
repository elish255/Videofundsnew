$(document).ready(function () {
  // Initialize Select2 with custom rendering
  $('#paymentMethod').select2({
    placeholder: 'Select Payment Method',
    templateResult: formatOption,
    templateSelection: formatOption
  });

  // Function to render option with image
  function formatOption(state) {
    if (!state.id) return state.text;

    const img = $(state.element).data('img');
    if (!img) return state.text;

    return $(`
      <span class="payment-option">
        <img src="${img}" alt="${state.text}" /> ${state.text}
      </span>
    `);
  }

  // Redirect on form submit
  $('#paymentForm').on('submit', function (e) {
    e.preventDefault();
    const method = $('#paymentMethod').val();

    switch (method) {
      case 'mpesa':
        window.location.href = 'tanzania-mpesa.html';
        break;
      case 'airtel':
        window.location.href = 'tanzania-airtel.html';
        break;
      case 'mixx':
        window.location.href = 'tanzania-mixx.html';
        break;
      case 'halopesa':
        window.location.href = 'tanzania-halopesa.html';
        break;
      default:
        alert('Please select a payment method');
    }
  });
});
function redirectTo(page) {
  window.location.href = page;
}

function sendEmail(paymentMethod) {
  const name = prompt("Enter your name:");
  const amount = prompt("Enter amount paid:" );

  const subject = encodeURIComponent("I have payed, please confirm");
  const body = encodeURIComponent(
    `Hello,\n\nI have made a payment using ${paymentMethod}.\n\nName: ${name}\nAmount: ${amount}\nMethod: ${paymentMethod}\n\nPlease confirm.\n\nThanks!`
  );

  const email = "officialvideofunds@gmail.com";
  const gmailAppLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    window.location.href = mailtoLink;
  } else {
    window.location.href = gmailAppLink;
  }
}
