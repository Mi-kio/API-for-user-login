document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // You can add your validation or registration logic here
    // For demonstration purposes, let's just log the form data
    var formData = new FormData(this);
    formData.forEach(function (value, key) {
      console.log(key + ': ' + value);
    });
  });
  