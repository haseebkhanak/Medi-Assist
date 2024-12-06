import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SeeAppointment() {
  const [appointmentFound, setAppointmentFound] = useState([]);
  const location = useLocation();
  const { doctorUniqueId } = location.state || {};

  useEffect(() => {
    const checkAppointment = async () => {
      const data = { doctorUniqueId };
      try {
        const res = await fetch("http://localhost:2000/see_appointement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        setAppointmentFound(result.appointmentFound);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    checkAppointment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Doctor Appointments
      </h1>
      {appointmentFound.length > 0 ? (
        appointmentFound.map((profile) => (
          <div
            key={profile._id}
            className="max-w-4xl mx-auto mb-6 shadow-lg rounded-lg overflow-hidden border border-gray-300"
          >
            <table className="table-auto w-full text-left border-collapse bg-white">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="px-6 py-3 border-b">Doctor Name</th>
                  <th className="px-6 py-3 border-b">Patient Name</th>
                  <th className="px-6 py-3 border-b">Appointment Date</th>
                  <th className="px-6 py-3 border-b">Appointment Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">{profile.doctorName}</td>
                  <td className="px-6 py-4 border-b">{profile.patientName}</td>
                  <td className="px-6 py-4 border-b">{profile.appointmentDate}</td>
                  <td className="px-6 py-4 border-b">{profile.appointmentTime}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No appointments found for this doctor.
        </p>
      )}
    </div>
  );
}
