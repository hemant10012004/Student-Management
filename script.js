document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const studentForm = document.getElementById('student-form');
    const studentList = document.getElementById('student-list');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const searchInput = document.getElementById('search-input');
    const formSection = document.querySelector('.form-section');

    // Inputs
    const idInput = document.getElementById('student-id');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const contactInput = document.getElementById('contact');
    const classInput = document.getElementById('class-grade');
    const rollInput = document.getElementById('roll-no');

    // State
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Initialize
    renderStudents();

    // Event Listeners
    studentForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    searchInput.addEventListener('input', handleSearch);

    // Functions

    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) return;

        const studentData = {
            id: idInput.value ? parseInt(idInput.value) : Date.now(),
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            contact: contactInput.value.trim(),
            classGrade: classInput.value.trim(),
            rollNo: rollInput.value.trim()
        };

        if (idInput.value) {
            // Edit Mode
            const index = students.findIndex(s => s.id === parseInt(idInput.value));
            if (index !== -1) {
                students[index] = studentData;
            }
        } else {
            // Add Mode
            students.push(studentData);
        }

        saveAndRender();
        resetForm();
    }

    function renderStudents(studentsToRender = students) {
        studentList.innerHTML = '';

        if (studentsToRender.length === 0) {
            studentList.innerHTML = `
                <tr class="empty-state">
                    <td colspan="6">
                        <div class="empty-icon"><i class="fa-regular fa-folder-open"></i></div>
                        <p>No student records found.</p>
                    </td>
                </tr>
            `;
            return;
        }

        studentsToRender.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${student.classGrade}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent(${student.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${student.id})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }

    function saveAndRender() {
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    // Global scope for HTML onclick attributes
    window.editStudent = function(id) {
        const student = students.find(s => s.id === id);
        if (!student) return;

        // Populate Form
        idInput.value = student.id;
        nameInput.value = student.name;
        emailInput.value = student.email;
        contactInput.value = student.contact;
        classInput.value = student.classGrade;
        rollInput.value = student.rollNo;

        // Change UI state
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Student';
        cancelBtn.classList.remove('hidden');
        document.querySelector('.card-header h2').innerHTML = '<i class="fa-solid fa-user-pen"></i> Edit Student';
        
        // Scroll to form
        formSection.scrollIntoView({ behavior: 'smooth' });
    };

    window.deleteStudent = function(id) {
        if (confirm('Are you sure you want to delete this student record?')) {
            students = students.filter(s => s.id !== id);
            saveAndRender();
            // If we were editing this student, reset form
            if (idInput.value == id) {
                resetForm();
            }
        }
    };

    function resetForm() {
        studentForm.reset();
        idInput.value = '';
        submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Student';
        document.querySelector('.card-header h2').innerHTML = '<i class="fa-solid fa-user-plus"></i> Add New Student';
        cancelBtn.classList.add('hidden');
        clearErrors();
    }

    function handleSearch(e) {
        const term = e.target.value.toLowerCase();
        const filtered = students.filter(s => 
            s.name.toLowerCase().includes(term) || 
            s.email.toLowerCase().includes(term) ||
            s.id.toString().includes(term) ||
            s.classGrade.toLowerCase().includes(term)
        );
        renderStudents(filtered);
    }

    function validateForm() {
        clearErrors();
        let isValid = true;

        // Simple validation checks
        if (!nameInput.value.trim()) {
            showError('name', 'Name is required');
            isValid = false;
        }

        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            showError('email', 'Valid email is required');
            isValid = false;
        }

        if (!contactInput.value.trim()) {
            showError('contact', 'Contact number is required');
            isValid = false;
        }

        if (!classInput.value.trim()) {
            showError('class-grade', 'Class is required');
            isValid = false;
        }

        if (!rollInput.value.trim()) {
            showError('roll-no', 'Roll number is required');
            isValid = false;
        }

        return isValid;
    }

    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        // Find the error span helper
        // Since input is in a .form-group and has a sibling span.error-msg
        // But in my HTML (form-group -> label, input, span) structure:
        const errorSpan = input.nextElementSibling; 
        if (errorSpan && errorSpan.classList.contains('error-msg')) {
            errorSpan.textContent = message;
        }
        input.style.borderColor = 'var(--danger-color)';
    }

    function clearErrors() {
        document.querySelectorAll('.error-msg').forEach(span => span.textContent = '');
        document.querySelectorAll('input').forEach(input => input.style.borderColor = 'var(--border-color)');
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
