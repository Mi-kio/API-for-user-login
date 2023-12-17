console.log("Data gaya1");
document.getElementById('userProfileForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log("Data gaya");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
    const preferredCategory = document.getElementById('preferredCategory').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/createUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, gender, preferredCategory }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.success);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      // const username = document.getElementById('username').value;
      // username.value = '';
      console.log("done dana done")
      alert('An error occurred. Please try again.');
      // userProfileForm.reset();
     
      
    }finally {
      // Reset the form after the submit event is complete
      userProfileForm.reset();
    }
  });
  