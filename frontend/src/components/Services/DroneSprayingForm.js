import React, { useState } from "react";
import axios from "axios";
import { MenuItem, Select, TextField, Button, Grid } from "@mui/material";
import image from '../../Data/images/spraying-img.png';

const DroneSprayingForm = () => {
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [serviceCategory, setServiceCategory] = useState('');
    const [acersToSpray, setAcersToSpray] = useState('');
    const [chemicalUsed, setChemicalUsed] = useState('');
    const [serviceRequestedDate, setServiceRequestedDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [Country, setCountry] = useState('');
    const [StreetAddress, setStreetAddress] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [Zip, setZip] = useState('');
    const userDetailsString = localStorage.getItem('userDetails');
      const userDetails = JSON.parse(userDetailsString);
      const userId = userDetails.UserID;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/spraying_form", {
                userId,
                userName,
                phoneNumber,
                serviceCategory,
                acersToSpray,
                chemicalUsed,
                serviceRequestedDate,
                StreetAddress,
                Country,
                City,
                State,
                Zip
            });

            if (response.status === 201) {
                console.log("POST request successful");
                const message = response.data.message;
                setSuccessMessage(message);
            } else {
                console.error("POST request failed");
            }
        } catch (error) {
            console.error("Error during POST request:", error);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center  flex justify-center items-center mt-10">
        {successMessage ? (
          <div className="bg-green-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Success!</h2>
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white-500 mr-2 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-white">{successMessage}</p>
              
            </div>
            <p className="text-white flex items-center justify-center mb-4"> Your request will be fullfilled in 2 to 3 days</p>
            <div className="bg-white bg-opacity-75 p-8 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                For any queries contact below person from our team:
              </h2>
              <p>Name: Bharath</p>
              <p>Phone: 8939872899</p>
            </div>
          </div>
            ) : (
                <div className="border p-6 rounded-lg w-full border-solid border-2 border-indigo-600 mt-10">
                    <h2 className="text-xl font-semibold mb-4 text-center">Drone Spraying Service</h2>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <div className="flex items-center">
                                <img
                                    src={image}
                                    alt="image"
                                    style={{ width: "100%", height: "auto", marginLeft: "10px", borderRadius: '10px'}}
                                />
                            </div>
                            <div className="ml-5">
                            <article>
                                <h4 className="text-balance text-center"><strong>Welcome to Agrivimaan Drone Spraying Service</strong></h4>
                                <p>&nbsp;&nbsp;At Agrivimaan, we offer advanced drone spraying services tailored to enhance agricultural efficiency and productivity. Our cutting-edge technology and experienced team ensure precise and effective spraying solutions for your crops.</p>
                                <p>&nbsp;&nbsp;Whether you need chemical spraying or drone rental services, Agrivimaan is your trusted partner in agricultural innovation. Our commitment to excellence and sustainability drives us to deliver outstanding results while minimizing environmental impact.</p>
                                <p>&nbsp;&nbsp;Experience the future of farming with Agrivimaan today!</p>
                            </article>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="w-3/4 ml-10">
                                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="User Name"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Service Category"
                                                value={serviceCategory}
                                                onChange={(e) => setServiceCategory(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            >
                                                <MenuItem value="" disabled>
                                                    Select Service Category
                                                </MenuItem>
                                                <MenuItem value="chemicalSpray">Chemical Spray</MenuItem>
                                                <MenuItem value="droneRent">Drone Rent</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Acers to Spray"
                                                value={acersToSpray}
                                                onChange={(e) => setAcersToSpray(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Chemical Used"
                                                value={chemicalUsed}
                                                onChange={(e) => setChemicalUsed(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                label=""
                                                value={serviceRequestedDate}
                                                onChange={(e) => setServiceRequestedDate(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Street Address"
                                                multiline
                                                rows={3}
                                                value={StreetAddress}
                                                onChange={(e) => setStreetAddress(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        <div className="flex gap-5 ml-5 mt-5">
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Country"
                                                value={Country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                            
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="City"
                                                value={City}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        </div>
                                        <div className="flex gap-5 ml-5 mt-5">
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="State"
                                                value={State}
                                                onChange={(e) => setState(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="ZIP"
                                                value={Zip}
                                                onChange={(e) => setZip(e.target.value)}
                                                className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                        </Grid>
                                        </div>
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className="py-2 px-4 bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600"
                                            >
                                                Submit
                                            </Button>
                                            {successMessage && <div className="text-green-600">{successMessage}</div>}
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default DroneSprayingForm;



// import React, { useState } from "react";
// import axios from "axios";
// import { MenuItem, Select, TextField, Button, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Success from './Success'

// const DroneSprayingForm = () => {
//     const [userName, setUserName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [serviceCategory, setServiceCategory] = useState('');
//     const [acersToSpray, setAcersToSpray] = useState('');
//     const [chemicalUsed, setChemicalUsed] = useState('');
//     const [serviceRequestedDate, setServiceRequestedDate] = useState('');
//     const [address, setAddress] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showSuccess, setShowSuccess] = useState(false);
//     const navigate = useNavigate();
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:8000/spraying_form", {
//                 userName,
//                 phoneNumber,
//                 serviceCategory,
//                 acersToSpray,
//                 chemicalUsed,
//                 serviceRequestedDate,
//                 address,
//             });

//             if (response.status === 201) {
//                 console.log("POST request successful");
                
//                 const massage = response.data.message;
//                 setSuccessMessage(massage);
//                 setShowSuccess(true);
                

//             } else {
//                 console.error("POST request failed");
//             }
//         } catch (error) {
//             console.error("Error during POST request:", error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-cover bg-center flex justify-center items-center p-4 mt-10">
//             {successMessage ? (
//                     <div>
//                         <h2 className="text-xl font-semibold mb-4 text-center">Success!</h2>
//                         <p>{successMessage}</p>
//                     </div>
//                 ) : (
//             <div className="border p-6 rounded-lg w-full md:max-w-2xl">
//                 <h2 className="text-xl font-semibold mb-4 text-center">Drone Service Form</h2>
//                 <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="User Name"
//                                 value={userName}
//                                 onChange={(e) => setUserName(e.target.value)}
//                                 className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Phone Number"
//                                 value={phoneNumber}
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                                 className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Select
//                                 fullWidth
//                                 value={serviceCategory}
//                                 label="Service Category"
//                                 onChange={(e) => setServiceCategory(e.target.value)}
//                                 className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                             >
//                                 <MenuItem value="" disabled>
//                                     Service Category
//                                 </MenuItem>
//                                 <MenuItem value="chemicalSpray">Chemical Spray</MenuItem>
//                                 <MenuItem value="droneRent">Drone Rent</MenuItem>
//                             </Select>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Acers to Spray"
//                                 value={acersToSpray}
//                                 onChange={(e) => setAcersToSpray(e.target.value)}
//                                 className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Chemical Used"
//                                 value={chemicalUsed}
//                                 onChange={(e) => setChemicalUsed(e.target.value)}
//                                 className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 type="date"
//                                 label=""
//                                 value={serviceRequestedDate}
//                                 onChange={(e) => setServiceRequestedDate(e.target.value)}
//                                 className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Address"
//                                 multiline
//                                 rows={4}
//                                 value={address}
//                                 onChange={(e) => setAddress(e.target.value)}
//                                 className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 color="primary"
//                                 type="submit"
//                                 className="py-2 px-4 bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600"
//                             >
//                                 Submit
//                             </Button>
                        
//                         </Grid>
//                     </Grid>
//                 </form>
                
//             </div>
//      )}
//         </div>
        
//     );
// };

// export default DroneSprayingForm;
