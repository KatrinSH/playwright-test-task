# Test Scenarios for the "Your average form"

## 📌 1. Successful form submission
**Preconditions:** The user is on the form page  
**Steps:**  
1. Enter a valid username  
2. Enter a valid password  
3. Select a gender  
4. Check all hobbies  
5. Select a time from the dropdown  
6. Click the "Submit" button  
**Expected Result:** The form is submitted successfully, and the confirmation screen is displayed  

---
## 📌 2. Successful form submission
**Preconditions:** The user is on the form page  
**Steps:**  
1. Enter a valid username  
2. Enter a valid password  
3. Select a gender  
4. Check one hobbie
5. Select a time from the dropdown  
6. Click the "Submit" button  
**Expected Result:** The form is submitted successfully, and the confirmation screen is displayed  

---

## 📌 3. Error message when submitting an empty form
**Preconditions:** The user is on the form page  
**Steps:**  
1. Click the "Submit" button without filling out the form  
**Expected Result:** An error message is displayed, and the form is not submitted  

---

## 📌 4. Error message when submitting an empty password field
**Preconditions:** The user is on the form page  
**Steps:**  
1. Enter a username  
2. Skip a password field
3. Fill in all other fields correctly 
4. Click the "Submit" button  
**Expected Result:** The form is not submitted, and an error message is displayed  

---

## 📌 5. Error message when submitting an empty gender field
**Preconditions:** The user is on the form page  
**Steps:**  
1. Enter a username  
2. Enter a password
3. Skip a gender field
4. Fill in all other fields correctly 
5. Click the "Submit" button  
**Expected Result:** The form is not submitted, and an error message is displayed  

---

## 📌 6. Error message when submitting an empty time field
**Preconditions:** The user is on the form page  
**Steps:**  
1. Fill in all fields correctly except time
5. Click the "Submit" button  
**Expected Result:** The form is not submitted, and an error message is displayed  

---
