// import React from "react";
// const storedUserData = JSON.parse(localStorage.getItem('userData'));
// function leave() {
//     const [formData, setFormData] = useState({
//         fid: storedUserData.empId,
//         designation: storedUserData.Designation,
//         token: storedUserData.token,
//         Name: storedUserData.Name,
//         location: '', // Note the capital 'O' here
//         Date: '', // Note the capital 'D' here
//         Genre: 'studentleave'
//     });

//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState('');

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const onFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };

//     const handleSubmit = () => {
//         const formDataToSend = new FormData();
//         formDataToSend.append('fid', formData.fid); // Use lowercase 'fid'
//         formDataToSend.append('designation', formData.designation);
//         formDataToSend.append('Organisation', formData.Organisation); // Use uppercase 'Organisation'
//         formDataToSend.append('location', formData.location);
//         formDataToSend.append('Date', formData.Date);
//         formDataToSend.append('Genre', formData.Genre); // Use uppercase 'Date'
//         formDataToSend.append('file', file);

//         fetch('http://localhost:5000/api/inserting', {
//             method: 'POST',
//             body: formDataToSend,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 setMessage(data.message);
//             })
//             .catch((error) => {
//                 setMessage('An error occurred while submitting the form.');
//                 console.error(error);
//             });
//     };

//     return (
//         <>
//             <label htmlFor="">token id</label>
//             {storedUserData.token}
//             <label htmlFor="">faculty id</label>
//             {storedUserData.empId}
//             <label htmlFor="">Name</label>
//             {storedUserData.Name}
//             <label htmlFor="">Desgination</label>
//             {storedUserData.Designation}
//             <h1>Student Leave </h1>
//             <label htmlFor="">location</label>
//             <input type="text" name="location" id="location" />
//             <label htmlFor="">Title</label>
//             <input type="text" name="title" id="title" />
//             <label htmlFor="">Status</label>
//             <input type="text" name="status" id="status" />

//             <label htmlFor="">Any Previous Student leave</label>
//             <input type="text" name="prev" id="prev" />
//             <input type="file" name="file" accept=".pdf" onChange={onFileChange} />
//             <button onClick={handleSubmit}>Submit</button>
//             <p>{message}</p>
//         </>
//     );
// }

// export default leave;
