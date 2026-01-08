# Student-Management
Student Management System Walkthrough
I have successfully built the Student Management System with a premium design and full CRUD functionality.

Features Implemented
1. Management Interface
Dashboard: A clean, responsive dashboard with a split view (Form on left/top, List on right/bottom).
Premium Design: Used a modern color palette, gradients, and the 'Outfit' font for a professional look.
2. Core Functionality
Add Student:
Validates inputs (Name, Email, Contact, Class, Roll No).
Shows error messages inline if fields are missing or invalid.
Adds the student to the list instantly.
View List:
Renders students in a responsive table.
Shows an "Empty State" icon when no students are added.
Edit Student:
Clicking the Edit icon populates the form with that student's data.
The "Add Student" button changes to "Update Student".
Updates the record in real-time.
Delete Student:
Clicking the Delete icon asks for confirmation before removing the record.
Search:
A search bar allows filtering the student list by name, email, or class.
Persistence:
Data is saved to localStorage, so it survives page reloads.
How to Verify
Open the Application:

Open 
index.html
 in your web browser (Chrome, Edge, Firefox).
Test Adding a Student:

Enter a name, email, contact, class, and roll number.
Click Add Student.
Verify the student appears in the table.
Test Validation:

Try clicking Add Student without filling any fields.
Verify that red error messages appear under the fields.
Test Editing:

Click the Edit (Pen) button on a student row.
Change the name or class.
Click Update Student.
Verify the change is reflected in the table.
Verify the form resets to "Add New Student".
Test Deleting:

Click the Delete (Trash) button.
Confirm the dialog.
Verify the student is removed.
Test Search:

Add multiple students.
Type a name in the search bar.
Verify the list filters to show only matches.
