const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const multer=require('multer');
const formidable = require('formidable');
app.use(cors());
app.use(express.json());
const path=require('path')                                       
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bike',
});

const storageBike = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:\\Users\\Abhay\\Desktop\\MotoBon\\src\\Bike\\bike_photos'); // Specify the folder to save bike photos
    },
    filename: function (req, file, cb) {
        const regNo = req.body.reg_no; // Use the bike's registration number
        const fileExtension = path.extname(file.originalname); // Get file extension
        const fileName = `${regNo}${fileExtension}`; // Combine registration number and file extension
        cb(null, fileName);
    }
});

// Initialize multer for bike photo uploads
const uploadBikePhoto = multer({ storage: storageBike });
app.use('/bike_photo_path', express.static('C:/Users/Abhay/Desktop/MotoBon/src/Bike/bike_photos/'));
app.post('/bikeDetails', uploadBikePhoto.single('bike_photo'), (req, res) => {
    const { reg_no, eng_no, chas_no, bike_name,bike_condition, price } = req.body;
    const bike_photo_path = req.file ? req.file.path.replace(/\\/g, '/') : null; // Get the file path from the uploaded file

    // SQL query to insert bike details along with the photo path
    const sql = "INSERT INTO bikedetails (bike_name, reg_no, eng_no, chas_no,bike_condition, price, bike_photo_path) VALUES (?, ?, ?, ?, ?, ?,?)";
    const values = [bike_name, reg_no, eng_no, chas_no,bike_condition, price, bike_photo_path];

    // Execute the query
    db.query(sql, values, (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.log("Duplicate entry error:", err);
                return res.status(400).json({ error: 'Duplicate entry' });
            } else {
                const bikes = results.map(bike => {
                    return {
                        ...bike,
                        bike_photo_path: bike.bike_photo_path.replace(/\\/g, '/')
                    };
                });
            
            }
        }
        console.log("Insertion successful!");
        return res.status(200).json({ message: 'Insertion successful' });
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:\\Users\\Abhay\\Desktop\\MotoBon\\src\\Bike\\dl_photos'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        const dlNumber = req.body.dl_no; // Driving license number from form data
        console.log(req.body.dl_no)
        console.log(req.body.name)
        console.log(dlNumber)
        const fileExtension = path.extname(file.originalname); // Get file extension
        console.log(fileExtension)
        const fileName = `${dlNumber}${fileExtension}`; // Combine the DL number and file extension
        console.log(fileName)
        cb(null, fileName);
    }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

// Endpoint to handle user login with file upload
app.post('/user_signin', upload.single('file'), (req, res) => {
    console.log('Received data:', req.body);

    // Prepare SQL query
    const sql = "INSERT INTO user_login (name,email, password, address, ph_no, city, state, zip, dl_no, dl_photo_path) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email, 
        req.body.password, 
        req.body.address, 
        req.body.ph_no, 
        req.body.city, 
        req.body.state, 
        req.body.zip, 
        req.body.dl_no,
        req.file ? req.file.path : null  // Save the file path if the file was uploaded
    ];

    // Execute query and handle response
    db.query(sql, values, (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.log('Duplicate entry error:', err);
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('User added successfully!');
        return res.status(200).json({ message: 'User added successfully!' });
    });
});



app.get('/bikedetails', (req, res) => {
    const { reg_no } = req.query;
    let sql = "SELECT * FROM bikedetails";

    if (reg_no) {
        sql += ` WHERE reg_no = ${mysql.escape(reg_no)}`;
    }

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(data);
    });
});
app.put('/bikeDetails/:reg_no', (req, res) => {
    const { reg_no } = req.params;
    const { new_reg_no, bike_name, eng_no, chas_no,bike_condition, price } = req.body;

    db.query('SELECT * FROM bikedetails WHERE reg_no = ?', [reg_no], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No registration number found' });
        }

        let sql = `
            UPDATE bikedetails
            SET bike_name = ?, eng_no = ?, chas_no = ?,bike_condition = ?, price = ?
        `;

        let values = [bike_name, eng_no, chas_no,bike_condition, price];
        if (new_reg_no) {
            sql += ', reg_no = ?';
            values.push(new_reg_no);
        }

        sql += ' WHERE reg_no = ?';
        values.push(reg_no);

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("Error updating bike details:", err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log("Update successful!");
            return res.status(200).json({ message: 'Bike details updated successfully' });
        });
    });
});
app.post('/admin_login', (req, res) => {
    const sql = "SELECT * FROM admin_login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        if (data.length > 0) {
            console.log('Login successful:', data);
            return res.json({ success: true, message: 'Login successful' });
        } else {
            console.log('Login failed: No record found');
            return res.json({ success: false, message: 'No record found' });
        }
    });
});
app.post('/user_login', (req, res) => {
    const sql = "SELECT * FROM user_login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        if (data.length > 0) {
            console.log('Login successful:', data);
            return res.json({ success: true, message: 'Login successful' });
        } else {
            console.log('Login failed: No record found');
            return res.json({ success: false, message: 'No record found' });
        }
    });
});
app.get('/bikeDetails/:reg_no', (req, res) => {
    const { reg_no } = req.params;

    // Prepare the SQL query
    const sql = "SELECT * FROM bikedetails WHERE reg_no = ?";
    
    // Execute the query with the provided reg_no
    db.query(sql, [reg_no], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (data.length > 0) {
            // If data is found, return the details
            return res.json(data[0]);
        } else {
            // If no data is found, return a 404 response
            return res.status(404).json({ error: 'No registration number found' });
        }
    });
});

app.get('/bikeDetails', (req, res) => {
    db.query('SELECT * FROM bikeDetails', (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});




app.post('/contact_us', upload.none(), (req, res) => {
    const { name, email, message } = req.body;

    // Insert form data into MySQL table
    const sql = 'INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        console.log(name, email, message)
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'An error occurred while processing your request.' });
        } else {
            res.status(200).json({ message: 'Form submitted successfully.' });
        }
    });
});
app.get('/contact_us', (req, res) => {
    const sql = 'SELECT name, email, message FROM contact_us';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching complaints:', err);
            res.status(500).json({ message: 'An error occurred while fetching complaints' });
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/bookings', (req, res) => {
    const { bikeRegNo, pickupDate, pickupTime, dropoffDate, dropoffTime } = req.body;

    // Update booking details in the database
    const updateBookingQuery = `
        UPDATE bikedetails 
        SET 
            pickupDate = ?, 
            pickupTime = ?, 
            dropoffDate = ?, 
            dropoffTime = ?, 
            availability = FALSE 
        WHERE reg_no = ?`;
    const bookingValues = [pickupDate, pickupTime, dropoffDate, dropoffTime, bikeRegNo];

    db.query(updateBookingQuery, bookingValues, (err, result) => {
        if (err) {
            console.error('Error updating booking:', err);
            return res.status(500).json({ message: 'Failed to confirm booking.' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Booking confirmed!' });
    });
});

// server.js (or routes file)

app.put('/available/:bikeRegNo', (req, res) => {
    const { availability } = req.body;
    const bikeRegNo = req.params.bikeRegNo;
    console.log(req.body)
    // Update bike availability in the database
    const updateAvailabilityQuery = `
        UPDATE bikedetails 
        SET 
            availability = ?,
            pickupDate = IF(? = 1, NULL, pickupDate),
            pickupTime = IF(? = 1, NULL, pickupTime),
            dropoffDate = IF(? = 1, NULL, dropoffDate),
            dropoffTime = IF(? = 1, NULL, dropoffTime)
        WHERE reg_no = ?`;
    const availabilityValue = availability ? 1 : 0;

    db.query(
        updateAvailabilityQuery,
        [availabilityValue, availabilityValue, availabilityValue, availabilityValue,availabilityValue, bikeRegNo],
        (err, result) => {
            if (err) {
                console.error('Error updating bike availability:', err);
                return res.status(500).json({ message: 'Failed to update bike availability.' });
            }

            // Respond with success message
            res.status(200).json({ message: 'Bike availability updated successfully.' });
        }
    );
});
app.delete('/remove/:bikeRegNo', (req, res) => {
    const bikeRegNo = req.params.bikeRegNo;
    const sql = "DELETE FROM booking_details WHERE reg_no = ?";
    db.query(sql, [bikeRegNo], function(err) {
        if (err) {
            res.status(500).send({ error: err.message });
            return;
        }
        res.send({ message: 'Booking details deleted successfully' });
    });
});
// app.get('/bookingdetails/:regNo', (req, res) => {
//     const regNo = req.params.regNo;

//     db.query('SELECT email FROM bikedetails WHERE bike_reg_no = ?', [regNo], (err, result) => {
//         if (err) {
//             console.error('Error fetching booking details:', err);
//             res.status(500).send('Internal server error');
//             return;
//         }
//         if (result.length > 0) {
//             res.json(result[0]);
//         } else {
//             res.status(404).send('Booking not found');
//         }
//     });
// });

// // Endpoint to fetch user details by email
// app.get('/userdetails/:email', (req, res) => {
//     const email = req.params.email;

//     db.query('SELECT email, ph_no FROM user_login WHERE email = ?', [email], (err, result) => {
//         if (err) {
//             console.error('Error fetching user details:', err);
//             res.status(500).send('Internal server error');
//             return;
//         }
//         if (result.length > 0) {
//             console.log("server succesfully fetched ")
//             res.json(result[0]);
//         } else {
//             res.status(404).send('User not found');
//         }
//     });
// });
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/bookingdetails/:reg_no', (req, res) => {
    const { reg_no } = req.params;
    const query = `
        SELECT bike_name, reg_no, pickuptime, pickupdate, dropofftime, dropoffdate, totalamount, name, email, ph_no, address
        FROM booking_details
        WHERE reg_no = ?
    `;
    db.query(query, [reg_no], (err, results) => {
        if (err) {
            console.error('Error fetching booking details:', err);
            res.status(500).send('Error fetching booking details');
        } else {
            if (results.length > 0) {
                console.log("user details succesfully fetched")
                res.json(results[0]); // Assuming reg_no is unique and expecting only one result
            } else {
                res.status(404).send('Booking details not found');
            }
        }
    });
});
app.delete('/deleteBike/:reg_no', (req, res) => {
    const regNo = req.params.reg_no;

    db.query('DELETE FROM bikedetails WHERE reg_no = ?', [regNo], (err, result) => {
        if (err) {
            console.error('Error deleting bike:', err);
            res.status(500).send('Internal server error');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Bike not found');
        } else {
            res.send({ message: 'Bike deleted successfully' });
        }
    });
});
app.post('/get_user_details', (req, res) => {
    const { email } = req.body;
    const query = 'SELECT name,city FROM user_login WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else if (results.length > 0) {
            res.json({ success: true, name: results[0].name, city: results[0].city });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    });
});
app.get('/ph_no', (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: 'Email parameter is required' });
    }

    const sql = 'SELECT ph_no, address FROM user_login WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).json({ error: 'Error fetching user details' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userDetails = {
            ph_no: results[0].ph_no,
            address: results[0].address
        };
        res.json(userDetails);
    });
});
app.post('/process-booking', (req, res) => {
    const { userEmail,userName, regNo, bikeName, pickuptime, pickupdate, dropofftime, dropoffdate, totalAmount, ph_no, address } = req.body;
   
    // Example query to insert booking details into booking_details table
    const sql = 'INSERT INTO booking_details (email, reg_no, bike_name, pickuptime, pickupdate, dropofftime, dropoffdate, totalamount, ph_no, address,name) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [userEmail, regNo, bikeName, pickuptime, pickupdate, dropofftime, dropoffdate, totalAmount, ph_no, address,userName], (err, results) => {
        if (err) {
            console.error('Error inserting booking details:', err);
            return res.status(500).json({ error: 'Error inserting booking details' });
        }

        res.json({ message: 'Booking successfully processed' });
    });
});
app.post('/history',(req,res)=>{
    const { userEmail,userName, regNo, bikeName, pickuptime, pickupdate, dropofftime, dropoffdate, totalAmount, ph_no, address } = req.body;
   
    // Example query to insert booking details into booking_details table
    const sql = 'INSERT INTO history (email, reg_no, bike_name, pickuptime, pickupdate, dropofftime, dropoffdate, totalamount, ph_no, address,name,booked_date) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [userEmail, regNo, bikeName, pickuptime, pickupdate, dropofftime, dropoffdate, totalAmount, ph_no, address,userName,new Date()], (err, results) => {
        if (err) {
            console.error('Error inserting booking details:', err);
            return res.status(500).json({ error: 'Error inserting booking details' });
        }

        res.json({ message: 'Booking successfully processed' });
    });
})
app.get('/bookinghistory', (req, res) => {
    const sql = `
        SELECT 
            h.name, h.email, h.ph_no, h.address, h.reg_no, b.bike_name, 
            h.pickuptime, h.pickupdate, h.dropofftime, h.dropoffdate, 
            h.totalamount, h.booked_date
        FROM 
            history h
        JOIN 
            bikedetails b ON h.reg_no = b.reg_no
    `;
    db.query(sql, function(err, results) {
        if (err) {
            res.status(500).send({ error: err.message });
            return;
        }
        res.send(results);
    });
});
app.post('/get_booking_history', (req, res) => {
    const { email } = req.body;

    const query = 'SELECT * FROM history WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            res.json({ success: false, message: 'Error fetching booking history', error: err });
        } else {
            res.json({ success: true, history: results });
        }
    });
});
// app.post('/check_user_approval', (req, res) => {
//     const { email } = req.body;

//     // Query to fetch user by email and check approval status
//     const query = `SELECT approved FROM user_login WHERE email = ?`;

//     db.query(query, [email], (error, results) => {
//         if (error) {
//             console.error('Error checking user approval:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (results.length === 0) {
           
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const approved = results[0].approved === 1; // Assuming isApproved is a BOOLEAN in MySQL
//         console.log("data send")
//         res.json({ approved: approved });
//         console.log(approved)
//     });
// });
// app.get('/get_users_for_approval', (req, res) => {
//     const sql = 'SELECT * FROM user_login WHERE approved = 0'; // Select users where approve field is 0 (false)
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.error('Error fetching users:', err);
//             res.status(500).json({ error: 'Error fetching users' });
//         } else {
//             res.json(result);
//         }
//     });
// });

// Update user approval status
app.put('/approve_user', (req, res) => {
    const { email } = req.body;
    const sql = 'UPDATE user_login SET approve = 1 WHERE email = ?'; // Set approve to 1 (true) for the specified email
    db.query(sql, email, (err, result) => {
        if (err) {
            console.error('Error approving user:', err);
            res.status(500).json({ error: 'Error approving user' });
        } else {
            res.json({ message: 'User approved successfully' });
        }
    });
});
app.use('/dl_photo', express.static(path.join(__dirname, '..', 'Bike', 'dl_photos')));
app.get('/dl_photo/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', '..', 'Bike', 'dl_photos', filename); // Adjust based on your file storage path

    // Send the file as an attachment
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).json({ error: 'Error sending file' });
        }
    });
});
// app.put('/approve_user_by_email/:email', (req, res) => {
//     const { email } = req.params;
//     const sql = 'UPDATE user_login SET approved = true WHERE email = ?';
//     db.query(sql, email, (err, result) => {
//         if (err) {
//             console.error('Error approving user:', err);
//             res.status(500).json({ error: 'Error approving user' });
//             return;
//         }
//         res.json({ message: 'User approved successfully' });
//     });
// });





app.get('/get_users_for_approval', (req, res) => {
    db.query('SELECT * FROM user_login WHERE status = "pending"', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Approve user by email
app.put('/approve_user_by_email/:email', (req, res) => {
    const email = req.params.email;
    db.query('UPDATE user_login SET status = "approved",approved = true WHERE email = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ success: true, message: 'User approved successfully' });
    });
});

// Reject user by email
app.put('/reject_user_by_email/:email', (req, res) => {
    const email = req.params.email;
    const reason = req.body.reason;
    console.log(reason)
    db.query('UPDATE user_login SET status = "rejected", rejection_reason = ? WHERE email = ?', [reason,email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ success: true, message: 'User rejected successfully' });
    });
});

// Check if user is approved
app.post('/check_user_approval', (req, res) => {
    const email = req.body.email;
    db.query('SELECT approved, status, rejection_reason FROM user_login WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error checking user approval:', err);
            return res.status(500).json({ error: err });
        }
        if (results.length > 0) {
            const user = results[0];
            console.log("Rejection reason:", user.rejection_reason); // Log the rejection reason
            res.json({ 
                approved: user.approved === 1, 
                status: user.status, 
                rejection_reason: user.rejection_reason 
            });
        } else {
            res.json({ approved: false, status: 'not found', rejection_reason: null });
        }
    });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storageDL = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos'); // Specify the folder to save driving license photos
    },
    filename: function (req, file, cb) {
        const dlNo = req.params.userDlNo; // Ensure dl_no is coming from req.body
        console.log('DL No:', dlNo); // Debugging log
        console.log('email:',req.body.email);
        console.log('email:',req.params.email);
        console.log('multer userDlNo',req.params.userDlNo);
        const fileExtension = path.extname(file.originalname); // Get file extension
        const fileName = `${dlNo}${fileExtension}`; // Combine driving license number and file extension
        console.log('File Name:', fileName); // Debugging log
        cb(null, fileName);
    }
});

// Create multer upload instance
const uploadDL = multer({ storage: storageDL });

// Update user details including driving license path
app.put('/reenter_user_details/:email/:userDlNo', uploadDL.single('file'), (req, res) => {
    const email = req.params.email;
    const { name, ph_no, address, userDlNo } = req.body; // Ensure dl_no is from req.body
    const dlPhotoPath = req.file ? req.file.path : '';
    console.log('DL No from Body:', userDlNo); // Debugging log
    
    console.log('DL Photo Path:', dlPhotoPath); // Debugging log
    db.query('UPDATE user_login SET name = ?, ph_no = ?, address = ?, dl_no = ?, dl_photo_path = ?, status = ?,rejection_reason = NULL WHERE email = ?', 
    [name, ph_no, address, userDlNo, dlPhotoPath, 'pending', email], 
    (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Details updated and submitted for re-approval' });
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});

